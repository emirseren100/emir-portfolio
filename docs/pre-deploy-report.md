# Ön Dağıtım Raporu

Tarih: 22 Ağustos 2026

Bu rapor, portföyün mevcut görsel ve etkileşimli deneyimini değiştirmeden yapılan üretim mühendisliği, metadata, SEO ve performans geçidini özetler.

## 1. Metadata

- Başlık: `Emir Şeren — Creative Developer`
- Açıklama: `Portfolio of Emir Şeren — product interfaces, frontend systems and interactive experiments.`
- `applicationName`, author, creator, Open Graph ve Twitter summary card metadata eklendi.
- Canonical, Open Graph URL/image ve sitemap URL `NEXT_PUBLIC_SITE_URL` üzerinden üretiliyor.
- Üretim/preview ortamında gerçek deployment URL’si bu değişkenle verilmelidir. Yerel geliştirmede metadata üretimini kırmamak için `http://localhost:3000` fallback’i bulunur; production değeri değildir.

## 2. Open Graph ve ikonlar

- `/opengraph-image`, mevcut EMIR sistemiyle 1200×630 dinamik PNG üretir: nötr yüzey, EMIR kelime işareti, kobalt `I`, isim ve Creative Developer tanımı.
- `/icon.svg`, sade E/I işareti olarak favicon işlevi görür.
- `/apple-icon.png`, aynı işaretin Apple touch icon karşılığıdır.
- Varsayılan Next starter favicon/assets kaldırıldı; gerçek proje medyaları korunuyor.

## 3. Robots ve sitemap

- `/robots.txt` production’da normal indexlemeye izin verir ve site URL biliniyorsa sitemap’i bildirir. Vercel Preview ortamında `VERCEL_ENV=preview` ile disallow uygulanır.
- `/sitemap.xml` yalnızca gerçek indexlenebilir homepage URL’sini içerir.
- `/motion-lab`, sitemap dışında tutulur.
- Preview build’de sitemap boş döner; site URL’si verilmemiş build’de de sitemap boş döner. Vercel preview/production için `NEXT_PUBLIC_SITE_URL` deployment ayarıdır.

## 4. Motion Lab üretim politikası

`/motion-lab` kaynak kodu korunur ve regression/deney route’u olarak çalışmaya devam eder. Sayfa metadata’sı `noindex, nofollow, noarchive` üretir ve sitemap’e dahil edilmez. Route silinmedi; portföyün ana bilgi mimarisine de eklenmedi.

## 5. 404

`app/not-found.tsx` ve eşlik eden CSS ile hafif, semantik ve responsive `404 / SIGNAL LOST` ekranı eklendi. `BACK TO INDEX ↑` ana sayfaya gerçek bir linktir; ağır JavaScript veya yeni motion sistemi içermez.

## 6. Proje medyası

Kaynak PNG’ler okunabilirliği korumak için olduğu gibi bırakıldı. Toplam 11 dosya yaklaşık 1.08 MB’tır; tek dosya 130 KB’ın altındadır ve ölçüler aspect-ratio rezervasyonu için korunur.

| Grup | Ölçü | Dosya aralığı |
| --- | --- | --- |
| DevFlow | 1280×720 | 28 KB |
| ScoutLab | 1425×891 | 62–124 KB |
| Pulseboard | 1425×891 | 108–122 KB |
| Penalty Game | 1440×900 | 83–129 KB |

Aktif homepage `<Image>` kaynaklarında DevFlow eager/priority; ScoutLab, Pulseboard ve Penalty Game lazy yüklenir. Browser smoke testinde ilk yüklemede yalnızca DevFlow görseli tamamlanmış, sonraki proje görselleri `loading="lazy"` olarak gözlenmiştir. Next image optimizer responsive teslimat ve kalite dönüşümünü runtime’da yapar. Görsel kaliteyi riske atacak ek sıkıştırma yapılmadı.

## 7. Bundle bulguları

Production build sonrası `.next/static/chunks` içinde 18 chunk ve toplam yaklaşık 886,674 byte uncompressed JS/CSS çıktısı ölçüldü. En büyük JS chunk’lar yaklaşık 224 KiB, 157 KiB, 114 KiB ve 110 KiB; GSAP/ScrollTrigger mevcut ortak chunk içinde yer alıyor.

Playground Canvas kodu `InteractiveField.tsx` olarak ayrıldı ve IntersectionObserver ile Playground’a yaklaşınca dinamik import ediliyor. İlk production document script listesinde Canvas chunk’ı yok; Playground alanı görünür olduğunda ayrık chunk yükleniyor. Canvas görünür alan dışında IntersectionObserver ile durdurulmaya devam ediyor.

## 8. Lighthouse lab ölçümü

Ölçüm `next build` + `next start` üzerinde, Lighthouse 12.5.0 ile `http://localhost:3001/` adresine karşı yapıldı. Bunlar lab sonuçlarıdır; gerçek kullanıcı saha verisi değildir.

### Desktop

| Alan | Skor |
| --- | ---: |
| Performance | 100 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

- FCP: 0.26 s
- LCP: 0.64 s
- TBT: 2 ms
- CLS: 0
- Speed Index: 0.49 s

### Mobile

| Alan | Skor |
| --- | ---: |
| Performance | 87 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

- FCP: 1.47 s
- LCP: 3.26 s
- TBT: 241 ms
- CLS: 0.0001
- Speed Index: 2.77 s

Mobile’de kalan ana maliyet, ilk viewport’taki yoğun client-side homepage/motion bundle’ı ve hero/DevFlow başlangıç deneyimidir. Görsel tasarım ve motion dili bu geçitte değiştirilmedi.

Lighthouse bazı trace insight’larında `frame_sequence` alanını okuyamadığına dair parser uyarıları verdi. Bu uyarılar uygulama console/network hatası olarak gözlenmedi; Chrome trace parser/tooling sınırlaması olarak kaydedildi. Rapor dosyaları `artifacts/pre-deploy/` altında tutuldu.

## 9. Erişilebilirlik ve semantik kontrol

- Production homepage’de tek bir `h1` ve mantıklı bölüm başlıkları bulunuyor.
- `nav`, `main` ve anlamlı section id’leri mevcut: `selected-work`, `scoutlab`, `analytics`, `playground`, `about`, `contact`.
- Proje görsellerinde anlamlı alt metinler bulunuyor.
- Canvas, açıklayıcı `aria-label` ve etkileşim gerektirmeyen statik çevreleyen metinle enhancement olarak çalışıyor.
- Reduced-motion fallback’leri ve keyboard `focus-visible` kuralları korunuyor.
- Dış bağlantılar açık amaçlı metne sahip; yeni sekmede açılan GitHub/LinkedIn bağlantıları `noopener noreferrer` kullanıyor.
- Lighthouse Accessibility skoru 96; bu geçitte yeni bir semantik regression bulunmadı.

## 10. Console ve network

Production browser smoke testinde homepage açılışı, tam ileri scroll, geri scroll, anchor navigasyonu ve `BACK TO INDEX` sonrası console error/warning gözlenmedi.

Kontrol edilen endpoint’ler:

- `/robots.txt` → 200
- `/sitemap.xml` → 200
- `/opengraph-image` → 200 PNG
- `/icon.svg` → 200 SVG
- `/apple-icon.png` → 200 PNG
- `/motion-lab` → 200, noindex metadata
- geçersiz URL → 404 custom screen

Bu smoke pass içinde hydration, missing icon, failed asset veya ScrollTrigger runtime hatası gözlenmedi.

## 11. Environment hygiene

`NEXT_PUBLIC_SITE_URL` verildiğinde public runtime içinde localhost, kullanıcı dosya yolu veya geliştirme API endpoint’i kullanılmıyor. `lib/site.ts` içindeki localhost değeri yalnızca değişken unutulmuş yerel metadata fallback’idir; preview/production’da gerçek deployment URL’si mutlaka environment variable ile verilmelidir. Onaylı public contact bilgileri dışında gizli bilgi eklenmedi.

## 12. Repository hygiene

- `.gitignore` içinde `node_modules`, `.next`, env dosyaları, loglar, `.vercel` ve `/artifacts/` bulunuyor.
- `artifacts/` QA geçmişi olarak korunuyor fakat production Git takibine alınmamalı; CI veya release kanıtı olarak ayrı saklanabilir.
- Gerçek `public/projects/` medyaları ve kaynak kod/docs commit edilmelidir.
- Starter SVG asset’leri kullanılmadıkları doğrulanarak kaldırıldı.
- `node_modules`, `.next`, local env ve QA çıktıları commit edilmemelidir.

## 13. Package-lock uyarısı

İlk build’de Next, repository dışında bulunan `C:\Users\Emir\package-lock.json` dosyasını gördü. Bu dosya boş bir parent lockfile’dır (`packages: {}`); portfolio repository’sinin parçası değildir. Dış dosya otomatik silinmedi.

Repository-local `next.config.ts` içinde `turbopack.root` ve `outputFileTracingRoot` workspace köküne sabitlendi. Son production build ve server başlangıcında uyarı tekrar oluşmadı. İstenirse kullanıcı daha sonra parent lockfile’ı manuel olarak inceleyip silebilir; bu çalışma alanı dışı dosyada otomatik değişiklik yapılması güvenli değildir.

## 14. Preview öncesi kalan işler

1. Vercel Preview/Production environment’ına gerçek deployment URL’sini `NEXT_PUBLIC_SITE_URL` olarak eklemek; Preview’da `VERCEL_ENV=preview` noindex/disallow davranışını korumak.
2. Bu URL ile bir kez daha deployed smoke test yapmak; özellikle canonical, Open Graph, robots ve sitemap URL’lerini kontrol etmek.
3. Lighthouse raporlarını deployment URL’si ve mümkünse uyumlu güncel trace parser ile tekrar almak.
4. İsteğe bağlı olarak HTTPS/header politikalarını deployment platformunda gözden geçirmek; mevcut local Best Practices skoru 100’dür.

Kod tarafında bu geçidi engelleyen lint/build hatası bulunmuyor.

## Independent Audit Resolution

- Root document language `lang="tr"` → `lang="en"` olarak düzeltildi. CSS uppercase kuralları değiştirilmedi; `SPRINT`, `TYPESCRIPT`, `VITE`, `ANALYTICS`, `INTRO` ve `SKIP TO SELECTED WORK` artık İngilizce locale ile doğru biçimde çözülüyor.
- Contact’taki geçiş metni `The work can become a signal.` görsel ve motion davranışı korunarak `h2` yerine `p` yapıldı. Contact section heading’i `OPEN CHANNEL.` olarak kaldı.
- Heading outline production DOM’da 1 `h1`, 8 `h2` ve 7 `h3` içeriyor. `#contact h2` yalnızca `OPEN CHANNEL.`.
- Render/DevFlow cold-start davranışı değiştirilmedi; free-host uyku/uyanma gecikmesi preview için kabul edilmiş harici hosting riski olarak kaldı.

### Lighthouse yeniden ölçüm

Ölçüm, yeni production build ve `next start` üzerinde Lighthouse 12.5.0 ile yapıldı. Windows Chrome temp cleanup aşamasındaki bilinen `EPERM` sonlandırma hatasına rağmen HTML/JSON raporları üretildi.

| Profil | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop | 100 | 96 | 100 | 100 | 0.25 s | 0.62 s | 0 ms | 0 | 0.45 s |
| Mobile | 89 | 96 | 100 | 100 | 1.06 s | 3.16 s | 232 ms | 0.0001 | 1.33 s |

### Lighthouse Accessibility kalan audit’leri

Yeni hata düzeltilmedi; yalnızca raporlandı:

1. `color-contrast` — desktop ve mobile. `REAL GAMEPLAY MEDIA` metni (`article.playground-module__... .penaltyFacts > span`) `#848582` üzerinde `#e7e8e3` ile 3.01:1 kontrast üretiyor; yaklaşık 8.96px bold metin için beklenen oran 4.5:1.
2. `label-content-name-mismatch` — mobile. DevFlow medya linki görünür `OPEN LIVE PROJECT ↗` metnine sahipken `aria-label="Open DevFlow live project"` kullanıyor; Lighthouse görünür etiket ile accessible name’in eşleşmediğini bildiriyor.

Bu iki audit, bağımsız audit görevinin kapsamı gereği bu aşamada değiştirilmedi.

## Accessibility Closeout

- `REAL GAMEPLAY MEDIA` kontrastı `3.01:1` → `15.45:1` olarak düzeltildi. Yalnızca ilgili Playground etiketi mevcut `var(--playground-ink)` token’ına alındı; arka plan, layout ve motion değiştirilmedi.
- DevFlow anchor’ındaki redundant `aria-label="Open DevFlow live project"` kaldırıldı. Accessible name artık görünür `OPEN LIVE PROJECT ↗` metninden türetiliyor; `href`, `target`, `rel`, CTA görünümü ve motion davranışı korundu.
- Lighthouse 12.5.0, yeni production build ve `next start` üzerinde:
  - Desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.26 s, LCP 0.63 s, TBT 0 ms, CLS 0, Speed Index 0.47 s.
  - Mobile: Performance 85, Accessibility 100, Best Practices 100, SEO 100; FCP 1.48 s, LCP 3.26 s, TBT 311 ms, CLS 0.0001, Speed Index 2.85 s.
- Desktop veya mobile profilinde kalan Accessibility audit’i yok.
- `npm run lint` ve `npm run build` başarılı.
- Mobile Lighthouse CLI raporu ürettikten sonra Windows Chrome temp cleanup aşamasında bilinen `EPERM` ile sonlandı; skor ve JSON/HTML raporlarının üretimi etkilenmedi.
