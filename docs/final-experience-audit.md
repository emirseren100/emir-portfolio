# Final Experience Audit

**Tarih:** 21 Ağustos 2026  
**Kapsam:** `/` production homepage, `/motion-lab` bu turun kapsamı dışında  
**Yöntem:** Gerçek tarayıcıda ileri/geri scroll, yavaş ve hızlı wheel, pointer hareketi, doğrudan anchor navigasyonu, keyboard focus, reduced-motion emülasyonu ve 1440 / 1280 / 1024 / 768 / 390 / 360 px kontrolleri.  
**Değişiklik:** Production kodu değiştirilmedi. Yalnızca bu audit dokümanı ve bulguları gösteren ekran görüntüleri üretildi.

## 1. Executive assessment

Portföy artık ayrı demo’ların toplamı gibi değil, tek bir EMIR sistemi gibi okunuyor. Hero’daki kimlik; DevFlow’da frame, ScoutLab’da eksen, Pulseboard’da lens, Playground’da fiziksel alan ve Contact’ta çözülen wordmark olarak görev değiştiriyor. Bu, işin en güçlü ve en özgün tarafı.

Bununla birlikte deploy öncesi dört önemli düzeltme gerekiyor:

1. DevFlow takeover sırasında gerçek medya ve üzerindeki UI metni fazla kararıyor.
2. Reduced-motion modunda ScoutLab bölümü diğer bölümler gibi normal akış fallback’ine geçmiyor.
3. 390 / 360 px mobil hero’da EMIR assembled kalmadığı için kimlik okunurluğunu kaybediyor.
4. Contact’ta doğrulanmış bir e-posta veya public profil aksiyonu bulunmuyor.

Gerçek tarayıcıda temiz turda console error veya warning gözlenmedi. 1440 px’te sayfa yüksekliği yaklaşık `20.414 px`; bunun `3.150 px` hero, `2.880 px` ScoutLab ve `2.880 px` Analytics sequence’lerinden oluşan büyük bir kısmı pinned deneyimlere ayrılıyor. 768 px ve altındaki normal akışta yatay overflow ölçülmedi.

Genel karar: deneyim güçlü bir creative-development portföyü olarak doğrulanmış durumda, ancak yukarıdaki P1 bulguları çözülmeden “deploy-ready” sayılmamalı.

## 2. What already works

- Hero, kişisel kimliği ilk viewport’ta kuruyor. EMIR wordmark’ı baskın; başlık ve konum bilgisi onunla yarışmıyor.
- Hero → DevFlow dönüşümü aynı nesnenin işlev değiştirmesi olarak okunuyor. Ayrışma rastgele parçacık dağılımına dönüşmüyor.
- ScoutLab, DevFlow’un fullscreen takeover dilini tekrar etmiyor. İki gerçek medya katmanı ve yatay workspace fikri belirgin biçimde farklı.
- Pulseboard Data Lens, pointer girdisine anlamlı bir görev veriyor: overview yüzeyinden ilişkili revenue görünümünü inceliyor. Lens pointer’dan ayrılınca kapanıyor ve içerik onsuz da DOM’da mevcut.
- Playground alanı sakin default state’ten pointer/touch ile fiziksel tepkiye geçiyor. Canvas loop’u IntersectionObserver ile görünürlük dışındayken durduruluyor.
- Playground → About geçişi doğru miktarda yavaşlıyor. About, yeni bir gösteri açmak yerine tipografiyi ve insan katmanını öne çıkarıyor.
- About copy’si grounded; `I build interfaces that stay clear while they change.` cümlesi bölümün rolünü iyi taşıyor.
- Contact’ın signal → EMIR → stable state kapanışı açılışla akraba ama hero’nun aynısı değil.
- Gerçek proje medyaları kullanılıyor. DevFlow, ScoutLab, Pulseboard ve Penalty ekranlarında uydurma UI görmedim.
- Global anchor’lar çalışıyor: WORK, ABOUT, PLAYGROUND, CONTACT ve BACK TO INDEX.
- Keyboard turunda skip link ve navigasyon bağlantıları focus alıyor; focus-visible outline mevcut.

## 3. P0 findings

### Yok

Kullanıcıyı deneyimin tamamından veya ana içeriğin büyük bir bölümünden alıkoyan P0 blocker bulunmadı.

## 4. P1 findings

### P1-01 — DevFlow takeover gerçek medyayı fazla karartıyor

**Bulgu:** Takeover’ın koyu surface’i, media scrim’i ve siyah EMIR parçaları üst üste geldiğinde DevFlow ekranı okunabilir olsa bile görsel hiyerarşide ikinci plana düşüyor. Gerçek uygulamanın metni ve bilgi mimarisi neredeyse siyah bir yüzey içinde kayboluyor. Aynı karede `SCROLL TO ENTER WORK` ve büyük metadata parçaları da kalıyor.

**Etkisi:** Portföyün en önemli ilk projesi “viewport’u devralan gerçek ürün” yerine karanlık bir compositing katmanı gibi algılanıyor. Bu bir asset-quality probleminden çok media treatment / contrast problemidir.

**Öneri:** Scrim opaklığını ve siyah geometry örtüşmesini azalt; takeover’ın orta state’inde ürün metninin minimum okunurluk eşiğini koru. `SCROLL TO ENTER WORK` gibi giriş hint’ini takeover başladıktan sonra başka bir state label’ı ile değiştir.

**Kanıt:** [devflow-takeover-low-contrast.png](../artifacts/final-audit/devflow-takeover-low-contrast.png)

### P1-02 — Reduced-motion ScoutLab normal akış fallback’ine geçmiyor

**Bulgu:** Reduced-motion DOM işaretleri `top`, `analytics`, `about` ve `contact` bölümlerinde mevcut; ScoutLab section’ında `data-reduced-motion="true"` yok. Bu nedenle ScoutLab’ın reduced-motion CSS fallback’i etkinleşmiyor. ScrollTrigger kurulmasa da ScoutLab’ın desktop absolute composition’ı korunuyor; medya ve panel yapısı normal okunabilir bir proje akışı gibi çözülmüyor.

**Etkisi:** Motion azaltma tercih eden kullanıcı, diğer bölümlerin static fallback’inden farklı olarak ScoutLab’da kompozisyonu kısmen üst üste binmiş ve uzun bir alan içinde görüyor. Bu doğrudan erişilebilirlik ve içerik kullanılabilirliği sorunudur.

**Öneri:** ScoutLab section’ına reduced-motion state’i bağla ve reduced fallback’ini Analytics ile aynı doğrulama standardına getir: başlık → primary media → secondary media → metadata → exit normal flow’da görünmeli.

**Kanıt:** [reduced-motion-scoutlab-fallback.png](../artifacts/final-audit/reduced-motion-scoutlab-fallback.png)

### P1-03 — Mobil hero’da EMIR okunurluğunu kaybediyor

**Bulgu:** 390 px ve 360 px’te production hero `framing` state’ini gösteriyor. E/M/I/R assembled wordmark olarak okunmak yerine küçük ayrışmış parçalar halinde görünüyor. Başlık okunuyor fakat portfolio identity’nin ana taşıyıcısı olan EMIR okunmuyor.

**Etkisi:** Mobil deneyim desktop choreography’yi mekanik olarak küçültmemiş olsa da kimlik fallback’i gereğinden fazla parçalanıyor. İlk viewport’ta kullanıcı kimliği değil, teknik bir fragment kompozisyonu görüyor.

**Öneri:** Mobil static state’te assembled veya daha az ayrışmış flat EMIR kullan. Desktop frame geometry’sine ait parçaları mobilde yalnızca bir veya iki yapısal rule olarak bırak.

**Kanıt:** [mobile-navigation-targets.png](../artifacts/final-audit/mobile-navigation-targets.png)

### P1-04 — Contact deploy öncesi doğrulanmış bir iletişim aksiyonu içermiyor

**Bulgu:** Contact bölümünde e-posta, GitHub veya LinkedIn için doğrulanmış public değer bulunmuyor. UI yalnızca `AWAITING VERIFIED CHANNELS` satırını gösteriyor; gerçek aksiyon yok.

**Etkisi:** Sayfa görsel olarak kapanıyor fakat kullanıcı iletişim kuramıyor. Bu, son conversion yüzeyinin işlevsel olarak eksik kalmasıdır.

**Öneri:** Kullanıcı onayıyla en az bir doğrulanmış public kanal eklenene kadar deployment kararını beklet. Sahte link eklenmemeli; mevcut dürüst pending state korunabilir fakat final release için yeterli değildir.

**Kanıt:** [contact-no-verified-channel.png](../artifacts/final-audit/contact-no-verified-channel.png)

## 5. P2 findings

### P2-01 — Fixed navigation altında içerik ghosting yapıyor

Global nav opaklığını `0.94` olarak korusa da büyük About / handoff typography’si nav’ın altında düşük kontrastlı biçimde görünmeye devam ediyor. Bu birkaç section’da tekrar ediyor ve bilinçli bir register layer’dan çok content bleed gibi görünebiliyor.

**Öneri:** Nav yüzeyini gerektiğinde tamamen opaklaştır veya section sınırlarında arka planı bilinçli şekilde değiştir. Ghosting korunacaksa bunun bir sistem davranışı olduğu daha net bir visual rule ile tanımlanmalı.

**Kanıt:** [fixed-nav-content-bleed.png](../artifacts/final-audit/fixed-nav-content-bleed.png)

### P2-02 — Mobil nav linklerinin gerçek hit alanı küçük

390 px’te nav linklerinin ölçülen içerik kutusu yaklaşık `15 px` yükseklikte; linkler yalnızca tipografik satır kadar alan kaplıyor. Görsel olarak menü sığıyor fakat touch target standardı açısından rahat değil.

**Öneri:** Nav anchor’larına mobilde minimum 44 px dikey hit alanı ver. Görsel ritmi korumak için padding ile alanı büyüt, fontu büyütmek zorunda değilsin.

**Kanıt:** [mobile-navigation-targets.png](../artifacts/final-audit/mobile-navigation-targets.png)

### P2-03 — Heading hiyerarşisi iki H1 ve geç gelen H1 içeriyor

Sayfada hero `h1`’ine ek olarak Contact `OPEN CHANNEL.` için ikinci bir `h1` var. Contact H1’i DOM’da çok daha sonra, çok sayıda H2/H3’ten sonra geliyor. Bu görsel tasarımı bozmasa da screen reader kullanıcılarında sayfa outline’ını gereksiz biçimde belirsizleştiriyor.

**Öneri:** Hero’yu tek H1 olarak koru; Contact başlığını section hiyerarşisine uygun H2 yap. Görsel boyut CSS ile aynı kalabilir.

### P2-04 — Project CTA dili ve hedefleri eşit seviyede değil

DevFlow’da üç ayrı live-project aksiyonu var. ScoutLab’daki `VIEW PROJECT DETAIL` kendi `#scoutlab-detail` anchor’ına dönüyor; bu gerçek bir project entry point değil. Pulseboard’da doğrulanmış bir URL olmadığı için CTA yok; bu dürüst fakat proje geçişlerinin action modelini eşitsizleştiriyor.

**Öneri:** Her proje için veri kaynağında URL yoksa CTA’yı bilinçli biçimde gizle; self-anchor’ı `VIEW PROJECT DETAIL` yerine gerçek bir section action veya açıklayıcı bir statik label yap.

### P2-05 — Canvas ve hover-only mikro-etkileşimlerin keyboard karşılığı eksik

Canvas `role="img"` ve `aria-label` ile tanımlı; bu iyi bir açıklama sağlıyor ancak keyboard kullanıcı için field’i etkileşimli olarak bükebilecek bir alternatif yok. About principle satırları `li`, Contact identity satırları ise `span`; pointer hover davranışı var fakat mevcut markup’ta focus alınamıyor.

**Öneri:** Canvas için en azından statik HTML açıklaması veya keyboard ile tetiklenen tek bir “impulse” alternatifi ekle. Hover davranışı önemli kalacaksa principle ve Contact hedeflerinin focus/active modelini gerçek focusable element’lere taşı.

### P2-06 — Pointer handler’larında yüksek frekanslı layout read riski var

ProductionHome, ScoutLab, Analytics ve Playground pointer handler’ları pointer hareketi sırasında `getBoundingClientRect()` çağırıyor. Scroll sırasında layout ölçümü yapılmıyor ve React state pointer başına güncellenmiyor; bu nedenle şu an gözle görülür jank ölçülmedi. Yine de düşük güçlü cihazlarda pointer + pinned scene birlikteyken gereksiz layout read riski bulunuyor.

**Öneri:** Sabit bounds değerlerini giriş/resize olayında cache et; yalnızca gerçekten gerekli olduğunda güncelle. `quickTo` yaklaşımını koru.

### P2-07 — Desktop ilk yüklemesinde offscreen proje medyası eager geliyor

1440 px temiz yüklemede browser resource listesinde DevFlow yanında ScoutLab overview/detail ve Analytics overview/revenue gibi toplam altı optimize medya isteği görüldü. ScoutLab ve Analytics media’larının bir kısmı viewport dışında olmasına rağmen `loading="eager"` kullanıyor. Aynı desktop akışında üç uzun pinned sequence bulunuyor; ölçülen toplam sayfa yüksekliği yaklaşık `20.414 px`.

**Öneri:** İlk viewport için yalnızca DevFlow ve gerçekten ilk sahnede gereken görselleri eager bırak. Diğer project media’larını section visibility veya lazy loading ile getir. ScrollTrigger sayısını azaltmak değil, ownership ve refresh davranışını ölçerek doğrulamak öncelik olmalı.

### P2-08 — 768 px’te mode switch görsel olarak sertleşiyor

768 px’te hero desktop composition’ını korurken ScoutLab ve Pulseboard `899 px` breakpoint’i nedeniyle mobile normal flow’a geçiyor. Bu teknik olarak overflow üretmiyor ve medya okunabilir; fakat ScoutLab title büyük ve viewport üstünde crop’lanmış, iki medya katmanı da arka arkaya erken görünüyor. Tablet, desktop spatial scene ile mobile stack arasında ara bir kompozisyon gibi hissediyor.

**Öneri:** 768–899 aralığı için daha kontrollü bir tablet composition tanımla veya başlık/medya girişini bu aralıkta küçült. Pinned choreography’yi geri getirmek zorunlu değil.

**Kanıt:** [tablet-scoutlab-mode.png](../artifacts/final-audit/tablet-scoutlab-mode.png)

### P2-09 — Küçük muted label’lar kontrast açısından sınırda

Contact ve bazı section metadata’larında `rgba(16,16,16,0.55–0.56)` değeri yaklaşık 10 px metinle kullanılıyor. Beyaz yüzey üzerinde bu değer normal gövde metni kadar güçlü değil ve küçük text için WCAG AA sınırının altında kalma riski var.

**Öneri:** Primary olmayan label’ların bileşimini contrast checker ile doğrula; gerekirse opacity yerine daha koyu sabit bir muted token kullan.

### P2-10 — Bazı görünür state label’ları production yerine debug hissi veriyor

`DEVFLOW / TAKEOVER`, `SCROLL TO ENTER WORK`’ün takeover boyunca kalması, `STATE: COMPOSED`, `LOCAL CAPTURE` ve `REAL GAMEPLAY CAPTURE / NO PUBLIC URL CONFIRMED` gibi ifadeler dürüst olsa da final portfolio surface’inde iç sistem notu gibi okunuyor.

**Öneri:** Debug/state bilgisini erişilebilir açıklama veya dokümantasyona taşı; görünür label’ları daha kısa ve kullanıcı bağlamlı tut. `LOCAL CAPTURE` gibi varlık durumu yalnızca gerçekten karar vermeyi kolaylaştırıyorsa gösterilmeli.

## 6. P3 findings

### P3-01 — About handoff cümlesi Contact’ta ikinci kez aynen tekrarlanıyor

`The work can become a signal.` geçiş için güçlü; About handoff ve Contact header’da aynen tekrarlanması loop fikrini destekliyor fakat son bölümde küçük bir copy repetition hissi oluşturuyor. Bu bir sorun değil, yalnızca final polish seçeneği.

### P3-02 — Bazı boşluklar bilinçli editoryal nefes ile “az içerik” arasında kalıyor

ScoutLab 01 → 02 handoff ve About principles çevresinde uzun sakin alanlar var. Genel deneyimde stillness işe yarıyor; ancak hızlı scroll yapan kullanıcı için bu alanlar “yeni state başlamadı” hissi verebilir. Pacing tuning ile çözülebilecek düşük öncelikli bir konu.

### P3-03 — Tekrarlanan index syntax’ı zaman zaman fazla yoğunlaşıyor

`01 → 02`, `02 → 03`, `03 → PLAYGROUND`, `PROJECT / 03`, `INDEX / ...` sistemi birleştiriyor; bazı geçiş karelerinde aynı anda üç farklı index görünmesi görsel gürültüye yaklaşıyor. Sistem korunmalı, yalnızca öncelik sırası sadeleştirilebilir.

## 7. Copy issues

- About’ın onaylı statement’ı korunmalı: `I build interfaces that stay clear while they change.`
- About supporting paragraph grounded ve açık; yeniden yazılması gerekmiyor.
- `SCROLL TO ENTER WORK` DevFlow içinden çıkıldıktan sonra yanlış bağlam veriyor.
- `DEVFLOW / TAKEOVER` ve `STATE: COMPOSED` teknik state okumaları olarak işlevli, ancak final kullanıcı dilinde prototip/debug hissi oluşturuyor.
- `REAL GAMEPLAY CAPTURE / NO PUBLIC URL CONFIRMED` dürüst fakat kullanıcıya dönük ana anlatıda gereğinden fazla provenance bilgisi taşıyor.
- `VIEW PROJECT DETAIL` self-anchor olduğu için eylem vaadi ile gerçek davranış tam örtüşmüyor.
- `The work can become a signal.` tekrarı bilinçli continuity olarak kabul edilebilir.
- Sahte müşteri, yıl, işveren, availability veya contact bilgisi görmedim. Bu, mevcut eksik linklere rağmen içerik güvenilirliği açısından olumlu.

## 8. Asset-quality issues

### Tasarım problemi

- DevFlow `892 × 502` gerçek görseli yaklaşık `933 × 524` alanda gösteriliyor; hafif upscale var, ancak asıl problem çözünürlük değil, takeover scrim ve siyah geometry ile kontrastın düşmesi.
- ScoutLab overview yaklaşık `748 × 468`, detail yaklaşık `576 × 360` doğal çözünürlükte. Detail yaklaşık `564 × 404` alanda cover crop ile gösteriliyor. Test edilen karelerde ürün UI’ı yanlışlıkla kesilmiyor; fakat yüksek DPR ekranlarda detail media yumuşayabilir.
- Pulseboard overview/revenue yaklaşık `1008 × 630` sınıfında; desktop lens yüzeyinde yeterli okunurluk var.
- Penalty Game görselleri gerçek ve okunabilir; başlangıç yükünde lazy gelmeleri olumlu.

### Asset quality problemi olarak sınıflandırılmayanlar

DevFlow’daki karanlık ve düşük okunurluk asset’in kendisinden değil, media treatment’tan kaynaklanıyor. ScoutLab detail’in düşük native çözünürlüğü ise gerçek bir asset-quality riski fakat şu an kritik crop/readability defect değil.

## 9. Responsive issues

| Breakpoint | Gözlem |
| --- | --- |
| 1440 | En güçlü kompozisyon. Pinned scenes okunabilir, ancak DevFlow takeover fazla koyu ve page total uzun. |
| 1280 | No overflow. Desktop hierarchy korunuyor; uzun sequence’lerin boş aralıkları daha belirgin. |
| 1024 | No overflow. DevFlow/ScoutLab/Analytics desktop composition’ı hâlâ çalışıyor; medya ve label yoğunluğu artıyor. |
| 768 | No overflow. ScoutLab/Analytics mobile flow’a geçiyor; ScoutLab title crop ve medya stack’i ara bir tablet state’i gibi hissediliyor. |
| 390 | No overflow. Hero EMIR legibility kaybediyor; nav text hit area küçük. Content normal flow’da kullanılabilir. |
| 360 | No overflow. 390’daki EMIR ve nav sorunları daha sıkı kadrajla devam ediyor; title wraps hâlâ kontrol edilebilir. |

Mobile genel olarak desktop’i küçültülmüş bir pinned sahneye çevirmiyor; bu doğru yön. En büyük mobile kusur, simplified identity state’in assembled EMIR’i korumaması.

## 10. Accessibility issues

### Olumlu bulgular

- Hero ve Contact için anlamlı başlıklar, section `aria-labelledby` ilişkileri ve gerçek medya alt metinleri mevcut.
- Analytics surface `role="group"`, `tabIndex=0` ve açıklayıcı `aria-label` taşıyor.
- Canvas `role="img"` ve açıklayıcı `aria-label` ile tanımlı.
- Skip link, keyboard focus ve focus-visible outline çalışıyor.
- DevFlow dış linkleri `target="_blank"` ve `rel="noreferrer"` ile işaretli.
- Reduced-motion emülasyonunda Home, Analytics, About ve Contact normal akışa geçiyor.

### Bulgular

- **P1:** ScoutLab reduced-motion fallback state’ine geçmiyor (P1-02).
- **P2:** Sayfada iki H1 var; Contact H1’i heading akışının sonlarında geliyor (P2-03).
- **P2:** Canvas için açıklama mevcut, fakat keyboard ile anlamlı etkileşim alternatifi yok (P2-05).
- **P2:** Principle satırları ve Contact metadata pointer hover’a tepki veriyor fakat mevcut markup’ta focusable değil (P2-05).
- **P2:** Mobil nav linkleri yaklaşık 15 px yüksekliğinde gerçek anchor kutularına sahip (P2-02).
- **P2:** Küçük muted label kontrastı yeniden ölçülmeli (P2-09).
- Contact linklerinin yokluğu erişilebilirlikten çok ürün tamamlama problemidir; ancak iletişim görevi şu anda keyboard kullanıcı için de mevcut değildir (P1-04).

## 11. Performance risks

### Ölçülen

- 1440 px’te toplam document height yaklaşık `20.414 px`.
- Desktop’ta üç büyük ScrollTrigger/pinned sequence bulunuyor: hero `3.150 px`, ScoutLab `2.880 px`, Analytics `2.880 px`.
- Temiz 1440 px yüklemede DevFlow yanında ScoutLab ve Analytics project media’larından toplam altı optimize image request görüldü.
- Sayfada bir Canvas bulunuyor; Playground loop’u görünürlük observer’ı ile offscreen duruyor.
- Temiz browser turunda console error, warning veya page error görülmedi. Forward wheel sonunda yaklaşık `19.514 px` scroll, reverse wheel sonunda `0` scroll ölçüldü; jump veya stuck state gözlenmedi.

### Teorik / code-level

- Pointer handler’ları her pointermove’da bounds ölçüyor; bu düşük yoğunlukta sorun çıkarmadı fakat GPU/CPU baskısı altında layout read maliyeti yaratabilir.
- GSAP context cleanup ve ScrollTrigger cleanup mevcut; yine de üç bağımsız sequence refresh maliyeti düşük güçlü laptop/tabletlerde ölçülmeli.
- Eager ScoutLab/Analytics medya yükü initial viewport için gereğinden erken decode başlatıyor.
- SVG wordmark, üç pinned sahne, Canvas ve birden fazla real raster katmanı birlikte paint/decode bütçesini büyütüyor.

### Bu turda ölçülmeyenler

Formal FPS, long-task, memory heap ve GPU frame-time profili alınmadı. Bu nedenle “jank var” iddiası yapılmamalı; yukarıdaki maddeler risk olarak ele alınmalı.

## 12. Awwwards-style scores

| Alan | Skor | Neden |
| --- | ---: | --- |
| Design | 8/10 | EMIR sistemi, grid ve asimetrik typography güçlü; DevFlow contrast’ı ve nav ghosting’i final polish’i düşürüyor. |
| Usability | 7/10 | Anchor/keyboard/fallback temeli iyi; ancak çok uzun scroll, küçük mobile hit areas ve Contact action eksikliği var. |
| Creativity | 9/10 | Projeler birbirinden farklı motion identities kullanıyor ve aynı sistem içinde kalıyor. |
| Content | 7/10 | Gerçek medya ve grounded copy olumlu; contact kanalı eksik, bazı state label’ları internal/debug hissi veriyor ve CTA modeli eşit değil. |

**Overall readiness: 7.5/10 — P1 düzeltmeleri tamamlanmadan deploy önerilmez.**

## 13. Recommended Phase 6B fix order

1. ScoutLab reduced-motion fallback’ini düzelt ve reduced-motion ile tüm sayfayı baştan sona test et.
2. DevFlow takeover’da media readability eşiğini geri getir; giriş hint’inin state label’ını güncelle.
3. Mobile hero’yu assembled/flat EMIR ile yeniden kur; 390 ve 360 px’de legibility’yi doğrula.
4. Kullanıcıdan doğrulanmış Contact channel al; `data/contact.ts` içindeki ilk gerçek aksiyonu ekle.
5. Heading hiyerarşisini tek H1’e indir; principle/Contact hover tepkilerinin keyboard modelini belirle.
6. 768–899 tablet composition’ını ve mobile nav hit area’larını düzelt.
7. Eager media ve pointer bounds read’lerini ölçüm sonuçlarına göre optimize et.
8. Son polish turunda debug label’ları, duplicate handoff copy’sini ve index yoğunluğunu sadeleştir.
9. 1440/1280/1024/768/390/360 + reduced-motion ile yeniden tam browser QA ve deploy build’i çalıştır.

## 14. Things that should NOT be changed

- EMIR identity/state-machine fikri yeniden tasarlanmamalı.
- DevFlow, ScoutLab, Pulseboard ve Playground’ın birbirinden farklı interaction languages’ı aynılaştırılmamalı.
- Hero’nun Swiss/editorial yüzeyi, büyük negatif alanı ve cobalt signal sistemi korunmalı.
- Gerçek proje medyaları fake UI ile değiştirilmemeli.
- About statement değiştirilmemeli.
- Contact’ta doğrulanmamış e-posta, GitHub veya LinkedIn uydurulmamalı.
- WebGL, global custom cursor, cursor trail veya yeni smooth-scroll kütüphanesi eklenmemeli.
- Playground Canvas’ı global rendering architecture’a dönüştürülmemeli.

## Phase 6B Resolution

### P1 findings

- **P1-01 — fixed:** DevFlow takeover medya treatment’ı hafifletildi. Gerçek proje görselinin brightness/contrast seviyesi artırıldı, scrim azaltıldı, metadata rail’in siyah compositing’i inceltildi. Takeover sonrası giriş hint’i `DevFlow media active` olarak bağlama göre değişiyor.
- **P1-02 — fixed:** ScoutLab section’ı artık `data-reduced-motion` state’ini taşıyor. Reduced-motion CSS selector’ı aynı section üzerinde çalışacak şekilde düzeltildi; pinned/absolute composition kapanıyor ve başlık → primary media → secondary media → project context → implementation context → `02 → 03` normal akışta okunuyor.
- **P1-03 — fixed:** 390px ve 360px hero’da EMIR wordmark assembled state’e alındı. Mobilde yalnızca assembled state için parça override’ı kullanılıyor; desktop choreography küçültülerek taşınmıyor.
- **P1-04 — fixed:** Kullanıcı onaylı public Email, GitHub ve LinkedIn kanalları `data/contact.ts` üzerinden eklendi. Contact artık üç semantic action row gösteriyor; external profiller `noopener noreferrer` ile yeni sekmede açılıyor.

### P2 findings

- **P2-01 — fixed:** Fixed navigation arka planı tam opak surface token’a alındı; About ve handoff typography’sinin nav altında kazara ghosting yapması engellendi.
- **P2-02 — fixed:** Mobil nav anchor’larına görsel font büyütmeden 44px minimum hit alanı verildi. 390px ve 360px’te overflow oluşmadı.
- **P2-03 — fixed:** Contact `OPEN CHANNEL.` artık section hiyerarşisine uygun `h2`; Hero sayfanın tek `h1` elementi olarak kaldı.
- **P2-04 — fixed:** ScoutLab’daki gerçek destination olmayan `VIEW PROJECT DETAIL` self-anchor’ı kaldırıldı. Doğrulanmış public URL olmayan proje için sahte CTA üretilmiyor.
- **P2-05 — fixed:** About principle satırları ve Contact identity metni keyboard için sahte control’a dönüştürülmedi; pointer tepkisi dekoratif olarak kaldı. Canvas için mevcut açıklamaya ek olarak keyboard kullanıcılarına static HTML eşdeğerinin yeterli olduğunu belirten erişilebilir not eklendi.
- **P2-06 — fixed:** ProductionHome, ScoutLab, Analytics ve Playground pointer koordinatları artık pointermove başına bounds ölçmüyor. Bounds resize observer, resize ve pointerenter sırasında yenileniyor; GSAP quick setters korunuyor.
- **P2-07 — fixed:** ScoutLab ve Analytics medyaları initial viewport dışında eager yüklenmiyor; DevFlow ilk deneyim için eager kalıyor. Media boyutları ve aspect-ratio’lar korunuyor.
- **P2-08 — fixed:** 768–899px aralığında ScoutLab için ayrı tablet ayarları eklendi: title scale/crop, media giriş boşluğu, primary-secondary ayrımı ve context rail spacing kontrol edildi. Desktop pinned choreography geri getirilmedi.
- **P2-09 — fixed:** Contact’ın küçük muted label token’ları daha koyu sabit değerlerle güçlendirildi; ana metin hiyerarşisi değiştirilmedi.
- **P2-10 — fixed:** Görünür internal/debug label’lar production diline çekildi: `WORK / DEVFLOW`, `FIELD / AT REST`, `REAL MEDIA`, `REAL GAMEPLAY MEDIA`. Kullanıcı açısından anlamlı index ve system language korunuyor.

### QA notes and deferred polish

- 1440, 1280, 1024, 899, 768, 390 ve 360px’te horizontal overflow ölçülmedi; tüm sayfada `h1` sayısı 1 olarak doğrulandı.
- Reduced-motion emülasyonunda ScoutLab `data-reduced-motion="true"` state’i ve relative normal-flow geometrisi doğrulandı.
- Pulseboard Data Lens pointer etkileşimi hâlâ aktif; merkez pointer testinde lens `active=1` ve merkez koordinatlarını aldı.
- Forward bottom scroll ve reverse top scroll tamamlandı; scroll sonunda yaklaşık `19.514px`, dönüşte `0px` ölçüldü.
- İlk yüklemede ScoutLab/Analytics img’leri lazy olarak işaretleniyor. Scroll sırasında Next development runtime’ın lazy görüntüyü yeni LCP olarak işaretleyen iki bilgilendirici warning’i görüldü; runtime error veya page error oluşmadı. Bu, production performans profili yerine development LCP heuristiği olarak değerlendirildi.
- P3 copy repetition, sakin alan pacing’i ve index syntax yoğunluğu bu surgical pass’te bilinçli olarak deferred bırakıldı.
