# EMIR — Kinetic System motion sistemi

Bu belge `/motion-lab` içindeki prototip hareket sisteminin teknik sözleşmesidir. EMIR burada yalnızca bir kelime işareti değil; kimlik, proje çerçevesi ve metadata rail arasında süreklilik kuran modüler bir arayüz durum makinesidir.

## EMIR durumları

`components/emir/EMIRWordmark.tsx`, aynı inline SVG içinde dört harfin işlevsel parçalarını taşır. CSS transform’ları `components/emir/emir-wordmark.module.css` içinde tutulur; scroll yalnızca kök sequence üzerindeki custom property’leri sürer.

| Durum | Scroll aralığı | Kullanıcı anlamı | EMIR davranışı |
| --- | --- | --- | --- |
| `assembled` | `0–0.22` | Giriş / yön bulma | EMIR okunaklı, tek bir kimlik wordmark’ı olarak dinlenir. |
| `separating` | `0.22–0.52` | Yapının açılması | E yatay raylarını, M diyagonal yönünü ve I index omurgasını ayırmaya başlar. |
| `framing` | `0.52–0.73` | Proje odakta | E ve M parçaları proje görselinin crop sınırlarını kurar; R’nin leg’i geçiş kenarına uzanır. |
| `rail` | `0.73–0.90` | Metadata / indeks | I dikey rail olarak okunur; proje metadata’sı ve aksiyon bağlantısı görünürlük kazanır. |
| `exit` | `0.90–1` | Sonraki projeye hazırlık | Sistem sıkışır, yön çizgisi ileriye taşınır ve sahne bir sonraki proje için temizlenir. |

State etiketi erişilebilirlik ve marker metni içindir. Parça transform’ları eşiklerde sıçramaz; `--emir-separation`, `--emir-frame`, `--emir-rail` ve `--emir-exit` değerleri scroll ilerlemesine doğrudan bağlanır.

## Parça sözleşmesi

- **E / frame:** dikey omurga ve üç yatay rail; proje çerçevesinin yatay/dikey sınırlarını kurar.
- **M / direction:** iki diyagonal yön; ayrışma sırasında hareket vektörünü, frame state’inde crop yönünü taşır.
- **I / index:** cobalt aksanlı dikey omurga; rail state’inde proje numarası ve metadata ritmini sabitler.
- **R / mask:** gövde, bowl ve leg; proje maskesinin kenarı ve exit geçişinin kesme işareti olur.

Parçalar rastgele cisimler gibi patlamaz. Her hareket aynı nesnenin görev değiştirmesi olarak okunmalıdır: kimlik → yapısal çizim → proje frame’i → indeks rail’i → geçiş kenarı.

## GSAP timeline yapısı

Desktop’ta `components/motion-lab/MotionLab.tsx` içinde tek bir GSAP timeline ve tek bir `ScrollTrigger` sahibi vardır:

```text
trigger: sequence
pin: stage
start: top top
end: bottom bottom
scrub: 0.85

0.15 → 0.37  --emir-separation: 0 → 1
0.34 → 0.63  --emir-frame: 0 → 1
0.62 → 0.81  --emir-rail: 0 → 1
0.84 → 1.00  --emir-exit: 0 → 1
```

Timeline state’i parça başına ayrı React state olarak dağıtmaz. React yalnızca okunabilir stage marker’ı günceller; SVG hareketi CSS custom property’leri ve GPU-dostu transform’lar üzerinden ilerler.

## Scroll ownership ve pacing

Sequence’ın masaüstü yüksekliği şu an `390vh`’dir. Bu, hero’nun pin’li kalmasını ve dört işlevsel state’in okunmasını sağlar; 460vh’lik önceki pacing daha fazla boş scroll üretiyordu. Scroll native kalır, body kilitlenmez ve Lenis kullanılmaz. Reverse scroll aynı timeline’ın tersine ilerler; ayrı bir reset animasyonu yoktur.

## Production homepage entegrasyonu

`components/home/ProductionHome.tsx`, aynı state makinesini gerçek ana sayfanın ilk iş deneyimine bağlar. `/` üzerindeki sequence `350vh` masaüstü pacing’iyle çalışır; `EMIR` kimliği ayrışırken `data/projects.ts` içindeki DevFlow verisi ve `public/projects/devflow/overview.png` gerçek proje medya slotunu doldurur. Proje görseli bir kart olarak eklenmez: E/M parçaları crop, çerçeve, edge ve metadata rail görevlerine dönüşür.

`/motion-lab` deneysel/regresyon rotası olarak korunur. Production route yalnızca gerçek içerik ve ileriye dönük Project 02 handoff’unu gösterir; motion-lab içeriği ana navigasyona taşınmaz.

Production takeover, aynı timeline’ın `--emir-takeover` katmanını kullanır. `0.50–0.74` aralığında koyu project surface görünür, grid opacity’si azalır ve DevFlow frame’i yaklaşık `66vw`’den `92vw`’ye büyür. Böylece medya crop içindeki bir panel olmaktan çıkıp stage’in ana uzamsal katmanı olur. `0.76` sonrasında metadata, medya kenarına absolute edge rail olarak bağlanır; `--emir-exit` ilerledikçe frame kontrollü biçimde küçülüp sağa çözülür.

Mobile bu takeover’ı pinlemez. `PROJECT / 01 → full-bleed DevFlow media → tipografik edge rail → CTA → 01 → 02` normal document flow içinde korunur; medya altındaki rail ayrı bir kart değil, cobalt sol çizgi ve metin hiyerarşisiyle devam eden proje kenarıdır.

## ScoutLab spatial sequence

ScoutLab, DevFlow’un fullscreen takeover dilini tekrar etmez. `01 → 02` handoff koyu surface’i bırakırken yeni bölüm açık, teknik bir yüzeye geçer; ince kobalt eksen ve küçük index kalıntıları EMIR sisteminin sürekliliğini taşır. ScoutLab’ın desktop sequence’ı ayrı bir pinned ScrollTrigger sahibidir ve normal dikey scroll’u yatay bir workspace ilerlemesine map eder.

```text
trigger: scoutlab sequence
pin: scoutlab scene
start: top top
end: bottom bottom
scrub: 0.8

0.00 → 0.20  intro / 02 / SCOUTLAB
0.20 → 0.46  primary layer → secondary layer
0.46 → 0.70  workspace detail / implementation rail
0.70 → 0.90  metadata and technical context
0.90 → 1.00  02 → 03 compression
```

`--scout-progress` doğrudan workspace canvas’ını taşır. Arka plan index’i daha yavaş bir hızda, medya katmanları ve detay rayları farklı çarpanlarla ilerler; bu fark proje hiyerarşisini belirtir, rastgele parallax oluşturmaz. Scene, DevFlow gibi viewport’a ölçeklenerek kapanmaz; daha geniş bir çalışma alanı keşfediliyormuş hissi verir. `--scout-exit` son aralıkta workspace’i ince bir 02 → 03 yönlendirmesine sıkıştırır.

ScoutLab verisi `data/projects.ts` içinde tipli tutulur. Doğrulanmış yerel ScoutLab uygulamasından alınan `overview.png` birincil medya, `detail.png` ikincil medya olarak `<Image>` üzerinden bağlanır. Birincil görünüm ürünün genel çalışma alanını, ikincil görünüm oyuncu analiz detayını taşır; portföy katmanları bu gerçek medya üzerinde yalnızca crop, ölçek ve derinlik uygular. React, TypeScript, Zustand, React Router, localStorage ve Tests yalnızca doğrulanmış teknik bağlam olarak destek metadata’sında listelenir.

Desktop pointer tepkisi yalnızca primary layer’a uygulanır: düşük genlikli x/y kayması ve kontrollü perspective, `quickTo` inertia ile doğal olarak sıfıra döner. Scroll state’ini veya metadata’yı değiştirmez. Touch ve reduced-motion koşullarında listener kurulmaz.

Mobile’de pinned yatay choreography kaldırılır. Sıra `02 / SCOUTLAB → overview media → player detail media → project rail → implementation context → project context → 02 → 03` normal document flow olarak okunur. Gerçek medya tek kolon içinde okunabilir kalır; bilgi, yatay animasyona bağlı değildir. Reduced-motion’da desktop timeline kurulmaz ve aynı içerik tek kolonlu normal akışta kalır.

## Project 03 analytical sequence

Project 03, `components/home/AnalyticsSequence.tsx` içinde ScoutLab’ın `02 → 03` çıkışından sonra açılır. Bu bölüm DevFlow’un fullscreen takeover’ını veya ScoutLab’ın yatay workspace’ini tekrarlamaz; dikey scroll önce analitik yüzeyi yerleştirir, sonra pointer incelemesine alan bırakır.

```text
trigger: analytics sequence
pin: analytics scene
start: top top
end: bottom bottom
scrub: 0.78

0.00 → 0.20  02 → 03 / analytics intro
0.20 → 0.42  real overview dashboard enters
0.42 → 0.72  data lens / overview ↔ revenue view
0.72 → 0.90  project context and confirmed stack
0.90 → 1.00  03 → PLAYGROUND handoff
```

`public/projects/analytics/overview.png` birincil, `revenue.png` ilişkili ikincil gerçek görünüm olarak kullanılır. Birincil ekran sürekli okunur; ikincil ekran aynı yüzeyin üstünde CSS `clip-path: circle(...)` maskesiyle açılır. Lens merkezi ve kenar koordinatlarını React state’e yazmaz: pointer hareketi `gsap.quickTo` ile `--analytics-lens-x`, `--analytics-lens-y`, `--analytics-lens-size` ve `--analytics-lens-active` custom property’lerine düşük genlikli inertia ile bağlanır. Pointer yüzeyden ayrıldığında lens kapanır; klavye odağı lensi merkezde açabilir.

Lens yalnızca medya üzerinde sahibidir. Scroll timeline analitik state’i ve yüzey yerleşimini sürer; pointer sistemi scroll state’ini değiştirmez. Metadatanın, stack bilgisinin ve iki görünümün anlamı lens olmadan HTML içinde okunabilir kalır.

`899px` altında pin ve pointer lens kaldırılır. Mobil sıra `03 / PULSEBOARD ANALYTICS → overview medya → revenue medya → project context → confirmed stack → 03 → PLAYGROUND` normal document flow’dur. Gerçek dashboard ekranları 4:3 medya alanında kontrollü biçimde crop edilir; ana analitik içerik korunur ve yatay overflow oluşmaz.

Reduced-motion’da ScrollTrigger ve pointer listener’ları kurulmaz. Overview ve revenue görünümleri normal akışta ayrı medya olarak görünür; Project 03 içeriği lens hareketine bağlı değildir.

Project 03 için WebGL kullanılmadı. İki sabit raster görünüm ve bir CSS maskesi veri lensinin anlamını ve gereken derinlik hissini sağlıyor; canlı deformasyon, occlusion veya canvas tabanlı çizim için ölçülmüş bir ihtiyaç yok.

## Playground / Interactive Field

Project 03’ün `03 → PLAYGROUND` çıkışı, analitik koordinatları normal akışta bir deney alanına bırakır. Playground pinned bir sinematik sequence değildir; girişte kısa bir geçiş satırı, ardından etkileşimli alan, Penalty Game deney sunumu ve `PLAYGROUND → ABOUT` handoff’u okunur.

Interactive Field için Canvas 2D seçildi. Alan, sınırlı sayıda EMIR düğümü, bağlantı çizgisi, koordinat etiketi ve ince grid kuralından oluşur; bu ölçekte DOM/SVG yerine Canvas daha az node ve daha kararlı pointer fiziği sağlar. WebGL kullanılmadı: shader, occlusion veya yüksek sayıda geometri gerekmiyor ve yeni bir bağımlılık/renderer maliyeti deneyimin anlamlı kalitesini artırmayacaktı.

Canvas’ın kendi render loop’u React state’ine yazmaz. Pointer ve touch olayları ref tabanlıdır; yakın düğümler düşük genlikte itilir, sürükleme sırasında velocity kuvveti eklenir ve spring/damping ile doğal dengeye döner. `touch-action: none` yalnızca canvas yüzeyine aittir; sayfanın geri kalanı native scroll kullanır. IntersectionObserver alan görünür değilken loop’u durdurur. DPR masaüstünde 1.5, mobilde 1.25 ile sınırlıdır ve resize yalnızca ResizeObserver/window resize üzerinden yeniden ölçer.

Reduced-motion modunda sürekli render loop’u ve fizik devre dışıdır; alan tek bir composed state olarak çizilir. İçerik, Penalty Game medya görünümleri ve teknik bağlam HTML ile her zaman okunabilir kalır. Mobilde uzun pin yoktur; aynı alan normal akışta daha az düğümle pointer/touch drag kabul eder ve Penalty Game medya + metadata tek kolon halinde sunulur.

## Playground / Penalty Game

Penalty Game, `C:\Users\Emir\Documents\Web Oyun` içindeki doğrulanmış Phaser 3 / TypeScript / Vite projesinden alınan gerçek tarayıcı yakalamalarıyla deney nesnesi olarak gösterilir. `gameplay.png` canlı aim/power state’ini, `result.png` ise gerçek goal result state’ini taşır. Public URL doğrulanmadığı için sahte bir oynatılabilir link eklenmez; medya ve teknik bağlam bağımsız olarak anlaşılır.

Playground çıkışında field ve game yoğunluğu `PLAYGROUND → ABOUT` satırına yerleşir. Bu, About henüz uygulanmamış olsa da bir sonraki sakin editoryal sisteme yön verir.

## Playground → About / human layer

Playground’dan çıkarken `PlaygroundSequence` görünürlük gözlemcisi alanı yeniden composed state’e yerleştirir: pointer aktifliği ve velocity sıfırlanır, düğümler home koordinatlarına döner ve Canvas loop’u durur. Böylece About yeni bir dramatik sahne olarak değil, sistem yoğunluğu azalmış bir yüzey olarak başlar.

About pinned değildir. `components/home/AboutSection.tsx` normal document flow içinde `IntersectionObserver` ile statement, focus, principles, practice index ve handoff bloklarını sırayla görünür kılar. Reveal yalnızca `opacity` ve küçük `translateY` kullanır; ScrollTrigger veya pointer fiziği bu bölüme taşınmaz. About’ın tek tactile tepkisi, principle satırında hover/focus ile düşük genlikli yatay kayma ve kobalt signal çizgisidir.

Reduced-motion veya JavaScript yokluğu içerik kaybına yol açmaz: About blokları normal görünür state’te kalır, gözlemci reveal’i kurulmaz ve principle transform’ları kapanır. `ABOUT → CONTACT` handoff’u, EMIR’in yeniden küçük bir signal/axis olarak dönmesini öneren statik bir sonraki sistem sınırıdır; Contact bölümü henüz uygulanmamıştır.

## Pointer davranışı

Pointer zamanı veya state’i değiştirmez. Desktop’ta yalnızca aktif sahnede şu düşük genlikli tepkileri üretir:

- EMIR wordmark’ı `quickTo` ile en fazla 9 × 7 px hareket ve 1.6° rotasyon alır.
- Proje görseli en fazla 1.1° / 1.4° kontrollü perspektif eğimi alır.
- Pointer sahneden ayrılınca hedefler doğal olarak sıfıra döner.
- Mobile ve reduced-motion koşullarında listener kurulmaz.

## Mobile davranışı

`768px` altında pinned sequence kaldırılır. EMIR önce okunur, ardından wordmark ve proje frame’i normal belge akışında üst üste gelir; metadata rail frame’in altına iner. Uzun scroll-cinematic mesafe yerine dokunarak okunabilir, tek kolonlu bir proje sunumu kullanılır. Mobile transform’ları CSS’te sabit ve düşük maliyetlidir; yatay overflow oluşturmaz.

## Reduced motion davranışı

`useReducedMotion` `prefers-reduced-motion: reduce` media query’sini izler. Bu durumda ScrollTrigger, pointer listener’ları ve uzun pin dizisi kurulmaz. EMIR okunabilir bir static frame durumuna yerleşir; proje görseli, metadata ve normal anchor navigasyonu görünür kalır. `data-reduced-motion="true"` CSS fallback’i transition ve clip-path hareketlerini de kaldırır. Marker `STATIC EMIR FRAME` olarak açıklayıcı hale gelir.

## Yeniden kullanılabilir motion token’ları

`lib/motion/tokens.ts` içindeki küçük sözleşme:

- `duration.micro / standard / sequence`: kısa UI tepkisi, standart yerleşme ve sequence referansı.
- `ease.standard / reveal / settle`: scroll, reveal ve pointer dönüşü için easing.
- `pointer.duration`, `maxX`, `maxY`, `maxRotation`: wordmark inertia sınırları.
- `pointer.projectTiltX / projectTiltY`: proje frame perspektif sınırları.
- `reveal.distance`: ilerideki tipografi veya içerik reveal’ları için ortak mesafe.

## Performans riskleri

Bu prototipte ağır medya, canvas, WebGL veya sürekli çalışan render loop yoktur. Ana riskler pinned ScrollTrigger’ın düşük güçlü cihazlarda refresh maliyeti, SVG parça sayısı büyürse paint yükü ve ileride proje medya maskelerinin decode maliyetidir. Scroll sırasında layout özelliği yerine transform, opacity ve clip-path kullanılır; resize sonrası ScrollTrigger kendi refresh döngüsünü yönetir.

## WebGL ne zaman gerekçelenir?

Henüz gerekçelenmez. EMIR’in mevcut geometrisi SVG/CSS ile keskin, erişilebilir ve performanslı biçimde kurulabiliyor. WebGL ancak gerçek occlusion gerektiren çok katmanlı 2.5D hareket veya SVG’de kabul edilemeyecek ölçekte canlı deformasyon kanıtlanırsa gündeme gelmeli; o durumda tek canvas, düşük DPR, görünür bölüm dışında pause ve context-loss fallback’i zorunlu olur.

## About → Contact / resolved signal

About’ın `The work can become a signal.` handoff’u, Contact’ın giriş satırı olarak tekrar edilir; iki bölüm arasında yeni bir pinned sequence açılmaz. About’ın sakinleşen tipografik yüzeyi Contact’ta daha yüksek kontrastlı, beyaz bir kapanış yüzeyine geçer. Contact bölümü normal document flow içinde şu sırayı izler:

```text
ABOUT → CONTACT / PERSON → SIGNAL
OPEN CHANNEL. / contact context
signal line → structural fragments → resolved EMIR
contact actions → stable identity → BACK TO INDEX
```

`ContactSection` tek bir IntersectionObserver ile görünürlük kazanır. Signal çizgisi önce yatay olarak açılır; iki kısa yapısal parça ve assembled EMIR wordmark’ı gecikmeli olarak yerlerine oturur. Bu, açılıştaki kimliği tekrar oynatmadan aynı sistemin sakin bir kapanışını üretir. Uzun pin, scroll hijacking veya sürekli çalışan bir animation loop kullanılmaz; görünür final state sabit kalır.

Contact linkleri `data/contact.ts` içinde merkezi tutulur. Bu depoda doğrulanmış public e-posta, GitHub veya LinkedIn değeri bulunmadığı için sahte aksiyon üretilmez; bölüm bunun yerine açıkça doğrulama bekleyen bir kanal satırı gösterir ve eksikler `docs/contact-review.md` içinde tutulur.

## Contact pointer ownership

Contact’taki tek tactile tepki, kimlik satırları veya doğrulanmış iletişim aksiyonları üzerine pointer/focus geldiğinde çalışır. Etkin hedefin konumu yalnızca `pointerenter`/focus olayında bir kez ölçülür; signal çizgisi ve wordmark düşük genlikli `transform` ile hedefe doğru kayar. `pointerleave`/blur hedefleri sıfıra alır. Scroll state’i değiştirilmez, React state’i pointer sırasında güncellenmez ve global cursor eklenmez.

Reduced-motion’da tüm Contact içeriği anında görünür; signal ve EMIR çözülmüş halde başlar, pointer kayması devre dışıdır ve tüm metin normal akışta okunur.

## Back to Index

`BACK TO INDEX ↑` erişilebilir bir anchor’dır. Aktivasyonda URL `#top` ile güncellenir ve sayfa `window.scrollTo({ top: 0, behavior: "auto" })` ile doğrudan açılışa döner. Böylece reduced-motion kullanıcılarında ve klavye kullanımında uzun teatral bir dönüş yoktur.
