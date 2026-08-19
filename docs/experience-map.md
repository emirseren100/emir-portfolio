# Deneyim Haritası

Bu belge, ana sayfanın yukarıdan aşağıya önerilen sahne planıdır. Her bölüm bir içerik görevi, E/M state’i, input davranışı ve fallback tanımlar. Proje adları, yıllar, roller ve bağlantılar gerçek içerik geldiğinde veri kaynağından doldurulmalıdır; aşağıdaki adımlar sahte proje verisi varsaymaz.

## Genel akış

```text
Hazırlık → Hero / assembled → Thesis / calibrating →
Selected work / framing → Project sequence / open ↔ transition →
Process / reassembled-ready → Contact / reassembled → Footer
```

## 0. Hazırlık / asset handshake

**Amaç:** Ziyaretçiyi boş bir canvas’a bırakmadan deneyimin hazırlandığını göstermek.

**Görünen içerik:** Gerçek HTML başlık, E/M’nin düşük kontrastlı statik SVG’si, kısa `Skip animation` kontrolü. Yüzde sayacı veya sahte sistem mesajı yok.

**Başlangıç state’i:** `assembled`’ın sade, hareketsiz önizlemesi.

**Scroll davranışı:** Hazırlık bitmeden sayfa scroll’u kilitlenmez; kullanıcı içerik okumaya devam edebilir. Asset hazır olduğunda animasyon, mevcut scroll konumuna göre başlatılır.

**Pointer davranışı:** Yok; cursor değiştirilmez.

**Giriş geçişi:** SVG önizlemesi gerçek medya/artefakt katmanına crossfade olur.

**Çıkış geçişi:** Hero state’ine doğrudan bağlanır; uzun splash ekranı yok.

**Teknoloji:** HTML/CSS + inline SVG; gerçek asset preloading, gerekirse React Suspense boundary.

**Mobil uyarlama:** Aynı static SVG; WebGL varsa hiç başlatılmadan poster sürümü.

## 1. Hero / “E/M is the index”

**Amaç:** Kişisel portföyün ne yaptığına dair tek cümlelik yön ve E/M’nin işlevini anlatmak.

**Görünen içerik:**

- büyük konumlandırma cümlesi: “I make interfaces that behave like systems.”;
- kısa açıklama: “Creative development, interaction design and visual systems.”;
- küçük folyo: `01 / 06 — INDEX`;
- E/M monogramı;
- `Explore work` ve `Contact` bağlantıları.

Bu metinler öneri niteliğinde yaratıcı copy’dir; kişisel ton ve gerçek uzmanlıkla sonradan değiştirilebilir.

**Başlangıç state’i:** `assembled`. E/M ortada veya gridin hafif dışında; aktif kobalt parça, yön bulmayı gösterir.

**Scroll davranışı:** Yaklaşık 180–220vh scroll alanında hero sabit kalır. `0–0.25` başlık ve folyo; `0.25–0.7` E/M ayrılması; `0.7–1` sonraki bölümün ilk kelimeleri ve tek bir medya maskesi görünür.

**Pointer davranışı:** E/M, pointer’a 2–4 px / 2° kadar yaklaşır; başlık etkilenmez. `Explore work` üzerinde kobalt dolgu ve ok görünür.

**Giriş geçişi:** Hazırlık SVG’si, E/M’nin gerçek modüllerine dönüşür.

**Çıkış geçişi:** Dış modüller grid çizgilerine kayarak thesis bölümünün iki kolon sınırını oluşturur.

**Teknoloji:** HTML/CSS + SVG; tek bir pinned wrapper için native scroll veya GSAP ScrollTrigger. React state: `assembled → calibrating`.

**Mobil uyarlama:** Pin 80–120vh’e iner. E/M 2D ve daha küçük; büyük başlık iki/üç satıra bölünür. `Explore work` doğrudan work anchor’ına gider.

## 2. Thesis / “The object is a method”

**Amaç:** Artefaktın dekor olmadığını ve çalışma yaklaşımını açıklamak.

**Görünen içerik:** Sol üstte `02 / 06 — METHOD`; iki kısa gerçek yaklaşım paragrafı; sağda E/M’nin grid içine açılmış parçaları. İsteğe bağlı tek bir süreç görseli.

**Başlangıç state’i:** `calibrating`; E/M’nin yatay kolları üç ayrı grid hattına oturur.

**Scroll davranışı:** Başlık önce gelir, sonra metin blokları sırayla görünür. E/M bir çerçeveye dönüşür; parçalar yeni bir süs kompozisyonuna dağılmaz.

**Pointer davranışı:** Modül üstüne gelindiğinde ilgili yöntem başlığı focus alır; modül içindeki negatif kanal genişliği çok az değişir. Hover, metni gizlemez.

**Giriş geçişi:** Hero’daki omurga dikey bir ayraç olur.

**Çıkış geçişi:** Dış modüller bir sonraki bölümün proje medya alanı oranına dönüşür.

**Teknoloji:** CSS grid, SVG transforms, IntersectionObserver; metin normal DOM.

**Mobil uyarlama:** Modüller iki sıraya düşer; scroll-linked parçalara ayrılma kaldırılır, `is-active` state’i section görünürken tek sefer uygulanır.

## 3. Selected work / iş indeksi

**Amaç:** Ziyaretçiye bütün işleri bir bakışta göstermek ve proje sequence’ine giriş vermek.

**Görünen içerik:** `03 / 06 — SELECTED WORK`; gerçek proje adı, yıl, rol, hizmet ve bağlantı alanlarından oluşan üç veya dört satırlık liste. Her satırda:

- proje adı;
- gerçek yıl veya tarih aralığı;
- gerçek rol/hizmet;
- `Open project` bağlantısı;
- E/M’nin aktif modül numarası.

İş verisi eksikse satır boş bırakılır veya proje yayınlanmaz; sahte isim/metrik kullanılmaz.

**Başlangıç state’i:** `framing` öncesi; E/M dış kolları liste satırlarının sol/sağ sınırlarını işaretler.

**Scroll davranışı:** Liste normal scroll ile okunur. Satır viewport’a girdiğinde tek bir kobalt çizgi genişler. Seçili satır, uzun pin olmadan metadata’yı günceller.

**Pointer davranışı:** Satır hover/focus durumunda görsel preview maskesi açılır; cursor trail yok. Bir satıra tıklandığında project sequence’in ilgili state’ine geçilir.

**Giriş geçişi:** Thesis’in sağ maskesi ilk proje satırının önizlemesine dönüşür.

**Çıkış geçişi:** İlk proje seçiliyse uzun sequence’e; değilse seçilen proje state’ine anchor geçişi.

**Teknoloji:** React data map, semantic list/table-like markup, CSS clip-path veya SVG mask; preview için lazy-loaded `<img>`.

**Mobil uyarlama:** Üç/dört satır kart benzeri akordeon değil, açık liste olarak kalır. Preview görseli satır altında küçük poster olarak gösterilir; hover yerine tap/focus.

## 4. Project sequence / tek sahnede projeler

**Amaç:** Her projeyi bağımsız bir landing page gibi kopyalamadan, aynı E/M sahnesi üzerinden derinleştirmek.

**Görünen içerik:**

- `04 / 06 — PROJECT 01` folyosu;
- gerçek proje başlığı;
- gerçek rol / ekip / yıl alanları;
- proje özeti;
- ana görsel veya video poster;
- `Open project` ve `Next project` kontrolleri;
- E/M maskesi ve progress bar.

**Başlangıç state’i:** `framing`; E/M dış modülleri medya çerçevesi, omurga metadata rayı olur.

**Scroll davranışı:** Bu, tek pinned sequence’tir. Scroll progress dört alt duruma ayrılır:

1. mevcut projenin crop ve başlığı;
2. metadata sabit, görselde kontrollü reveal;
3. `Next project` ipucunun ve yeni E/M state’inin görünmesi;
4. mevcut medya kapanır, sonraki proje aynı maskeden açılır.

Kullanıcı hızlı kaydırırsa ara kareler atlanabilir; final state’ler erişilebilir kalır. Scroll sequence 2–3 viewport’tan uzun olmamalı.

**Pointer davranışı:** Medya üzerinde hafif parallax/crop tepki; E/M modülü üzerinde düşük genlikli yön değişimi. `Next project` hover’ı kobalt dolgu, küçük ok ve metin kayması kullanır.

**Giriş geçişi:** İş indeksindeki seçili satır, aynı proje başlığına crossfade ile bağlanır.

**Çıkış geçişi:** Son projenin dış modülleri process bölümünün üç aşamalı grid’ine açılır.

**Teknoloji:** React state machine + tek pinned container; GSAP ScrollTrigger yalnızca sequence için. Medya için `<picture>`/`<video>` ve poster. WebGL yalnızca gerçek depth/occlusion ihtiyacı kanıtlanırsa.

**Mobil uyarlama:** Uzun pin yerine üç state’li stepper: `Preview`, `Details`, `Next`. Her state açık butonla da seçilebilir. E/M flat SVG; video yerine poster + play.

## 5. Process / çalışma biçimi

**Amaç:** Portföyün yalnızca sonuç görselleri değil, nasıl düşünüldüğünü de göstermesi.

**Görünen içerik:** `05 / 06 — PROCESS`; gerçek sürece göre değiştirilebilecek üç aşama: `Frame`, `Build`, `Tune`. Her aşamanın bir gerçek cümlelik açıklaması ve varsa gerçek çalışma örneği.

**Başlangıç state’i:** `open`; E/M parçaları artık medya maskesi değil, üç kolonlu süreç ölçer.

**Scroll davranışı:** Normal scroll; her aşama görünür olduğunda ilgili çizgi kobalt olur. Pinned kullanılmaz, böylece proje sequence’inden sonra görsel sessizlik sağlanır.

**Pointer davranışı:** Aşama başlığında hover/focus, ilgili modülü 1–2 px yükseltir; metin yer değiştirmez.

**Giriş geçişi:** Project sequence omurgası üç yatay rule’a ayrılır.

**Çıkış geçişi:** Üç rule, Contact bölümündeki E/M birleşme kılavuzuna dönüşür.

**Teknoloji:** HTML/CSS grid, IntersectionObserver; görseller varsa lazy-load.

**Mobil uyarlama:** Üç dikey blok, no pin. Aşama başlıkları normal heading olarak kalır.

## 6. Contact / loop closure

**Amaç:** Portföy deneyimini işlevsel bir iletişim çağrısıyla kapatmak ve E/M’nin döngüsünü tamamlamak.

**Görünen içerik:** `06 / 06 — CONTACT`; kısa kişisel davet cümlesi; gerçek e-posta veya iletişim bağlantısı; varsa LinkedIn/GitHub gibi gerçek kanallar. E/M yeniden okunabilir bir monogram olur.

**Başlangıç state’i:** `reassembled-ready`; modüller section grid’inin farklı noktalarından merkeze gelir.

**Scroll davranışı:** Contact görünürken E/M birleşir; hareket tamamlandığında sayfa sabit görsel sessizliğe girer. “Back to top” ve doğrudan iletişim linki görünür.

**Pointer davranışı:** E/M üzerine gelince tek kobalt aktif modül; e-posta CTA’sı kobalt yüzeye dönüşür. Cursor yalnızca CTA üzerinde custom affordance gösterir.

**Giriş geçişi:** Process rule’ları monogramın kanallarını oluşturur.

**Çıkış geçişi:** Footer’da E/M küçülür, normal logo/marka linkine dönüşür. `Back to top` hero’nun static assembled state’ine döner; animasyon reduced-motion’da atlanır.

**Teknoloji:** HTML/CSS + SVG; mailto veya gerçek iletişim endpoint’i. Harici form gerekiyorsa ayrı erişilebilir form tasarlanır.

**Mobil uyarlama:** E/M küçük, merkezde ve sabit oranlı; iletişim linki minimum 44 px hedef alanında.

## 7. Footer

**Amaç:** Navigasyon, yasal bilgiler ve gerçek dış bağlantıları açıkça sunmak.

**Görünen içerik:** `Work`, `About`, `Contact`, gerçek sosyal/profesyonel kanallar, gizlilik/terms gerekiyorsa bağlantıları, telif yılı. Görsel olarak minimal; yeni bir animasyon sistemi açılmaz.

**Başlangıç state’i:** E/M static logo.

**Scroll davranışı:** Normal scroll; `Back to top` açık bir kontrol.

**Pointer davranışı:** Link underline veya kobalt text shift; yalnızca anlamlı affordance.

**Giriş/çıkış:** Contact’tan opacity ile bağlanır; sayfa sonunda ekstra WebGL sahnesi yok.

**Teknoloji:** Semantic footer + CSS.

**Mobil uyarlama:** Tek kolon, açık link listesi.

## State ve veri sözleşmesi

Uygulama state’i aşağıdaki kavramları taşımalı; görsel animasyon bu state’lerin sonucu olmalı:

```text
pageSection: hero | thesis | work-index | project | process | contact | footer
artifactState: assembled | calibrating | framing | open | transition | reassembled
activeProject: gerçek veri kimliği veya null
progress: 0..1
inputMode: pointer | touch | keyboard | reduced-motion
mediaReady: boolean
```

Her proje veri kaydı en az şu alanları bekler:

```text
id, title, year, role, services, summary, href, cover, coverAlt
```

`title`, `year`, `role`, `summary` veya `href` yoksa ilgili UI alanı gizlenir; “Project 01”, sahte yıl, uydurma müşteri adı veya uydurma ölçüm gösterilmez.

## Kabul kriterleri

- Ziyaretçi ilk viewport’ta kişisel konumu ve `Explore work` yolunu anlar.
- E/M en az üç bölümde farklı bir işleve dönüşür: yön bulma, proje çerçevesi, iletişim döngüsü.
- Scroll ileri götürür; pointer yalnızca sahnenin okunurluğunu ve mekân hissini artırır.
- Proje adı, açıklama, rol, yıl ve bağlantı WebGL kapalıyken de okunur.
- Mobilde görevler korunur; yalnızca pin, WebGL ve hover davranışı sadeleşir.
- Reduced-motion modunda tüm içerik ve navigasyon state atlamadan erişilebilir.
- Hiçbir büyük efekt doğrudan kopyalanmış bir renk, asset, cümle, layout veya section sırası kullanmaz.

