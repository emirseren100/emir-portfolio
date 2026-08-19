# Yaratıcı Yön: E/M — Kinetik İndeks

## Tek cümlelik yön

E/M, yaratıcı geliştirici portföyünü gösteren bir logo değil; işleri sıralayan, odaklayan ve birbirine bağlayan modüler bir editoryal indeks olacak. Her proje, aynı geometrik sistemin başka bir çalışma durumunu açacak: birleşik E/M yön bulmayı, ayrılmış modüller araştırmayı, çerçeve formu proje odaklamayı, yeniden birleşme ise iletişim kurmayı gösterecek.

## Yaratıcı pozisyon

Bu yön, “yeteneklerimi sergileyen bir ekran” yerine “arayüzlerin nasıl davrandığına dair çalışan bir örnek” önerir. Ziyaretçi yalnızca projeleri okumaz; bir karar mekanizmasının içinden geçirildiğini hisseder. Artefakt sayfada gezmek için kullanılan bir indeks olduğu için her hareketin bir soruya cevap vermesi gerekir: Neredeyim? Neye bakıyorum? Sırada ne var? İletişim kurmak için ne yapmalıyım?

## Seçilen görsel ankraj

**Ankraj: Swiss.** Yüksek kontrastlı beyaz yüzey, tek kobalt vurgu, sans-serif tipografi, saç teli grid çizgileri ve soldan hizalı asimetrik kompozisyon seçiliyor. Bu seçim, Lando’daki editoryal cesareti ve Lusion’daki teknik netliği alıp üç referansın renk/asset kimliğinden ayrılıyor. Arayüz “fütüristik” görünmek için neon, glow, cam veya rastgele parçacık kullanmayacak.

**Ayırt edici hareket:** E/M’nin altı plan modülü, scroll boyunca dekoratif olarak uçuşmak yerine bilgi mimarisini kurar. Birleşik monogram bir indeks düğümüdür; ayrıldığı anda parçalar proje görselinin crop pencerelerini, metadata kolonlarını veya geçiş maskesini oluşturur.

## Konsept: E/M — Kinetik İndeks

### Artefaktın yapısı

E/M, iki harfin kesişiminden türeyen altı düz modülden oluşur:

1. üç kısa yatay E kolu,
2. ortak dikey omurga,
3. M’nin iki dış ayağı,
4. ortada okunabilirliği sağlayan negatif kanal.

Bu parçalar başlangıçta tek bir monogram olarak okunur. Scroll ile açıldığında parçalar serbest cisimler gibi dağılmaz; 12 kolonlu grid çizgilerine kilitlenir. Böylece “parçalanma” bir fizik gösterisi değil, içeriğin yapısal olarak açılmasıdır.

### Durum makinesi

| Durum | Kullanıcı anlamı | Artefakt davranışı |
| --- | --- | --- |
| `assembled` | Giriş / yön bulma | Modüller tek monogram, ön yüz düz, metin görünür |
| `calibrating` | Scroll başladı | Modüller 1–2 kolon ayrılır, aktif folyo yükselir |
| `framing` | Proje odakta | Dış parçalar görsel crop maskesi, omurga metadata rayı olur |
| `open` | Proje / süreç açıklaması | Negatif kanallar büyür, HTML açıklama alanı açılır |
| `transition` | Bir sonraki işe geçiş | Modüller mevcut projeyi kapatıp sonraki grid’e oturur |
| `reassembled` | İletişim / döngü | E/M yeniden birleşir ve iletişim bağlantısının odak noktası olur |

Bir state değişimi yalnızca `progress` aralığında gerçekleşmeli; pointer tek başına proje değiştirmemeli.

## Görsel dil

### Yüzey ve renk

- Ana yüzey: `#FFFFFF` veya çok hafif nötr `#F7F7F8`.
- Metin: `#111111`.
- Tek vurgu: Yves Klein Blue yönünde `#002FA7`.
- Grid ve ayraçlar: `#D6D6D6` seviyesinde 1 px çizgiler.
- Artefakt aktif modülü: aynı kobalt; gölge, gradient ve glow yok.

Kobalt, “marka rengi” olarak her yerde kullanılmayacak. Aktif proje, focus ring, geçiş maskesi ve tek bir çağrı için ayrılacak. İkinci bir vurgu rengi eklenmeyecek.

### Tipografi

Tek sans ailesi kullanılacak: tercihen Söhne veya Helvetica Neue; web lisansı ve performans uygun değilse sistem fallback’i `Arial, sans-serif`. Display ve gövde aynı ailenin ağırlık/genişlik farklarıyla kurulacak.

- Hero display: viewport’a göre yaklaşık `clamp(4rem, 13vw, 12rem)`; sıkı tracking.
- Section başlıkları: 4–8vw; cümle kırımları asimetrik.
- Metadata: 11–13 px, tabular numerals, küçük harf veya cümle düzeni; dekoratif mono-kapsül değil.
- Folyolar: `01 / 06`, `WORK`, `CONTACT` gibi gerçek navigasyon bilgileri.

Kullanıcının gerçek proje adı, yılı, rolü ve bağlantısı yoksa doküman/arayüz veri sözleşmesi bunları boş bırakmalı; sahte müşteri veya sonuç üretilmemeli.

### Layout felsefesi

Masaüstünde 12 kolon, 1 px dikey grid çizgileri ve geniş kenar boşlukları. Hero başlığı sol/orta arasında; E/M çoğunlukla grid dışında taşarak sabit bir görsel mihenk taşı olur. Proje açıklaması sağ kolonlarda, görsel solda veya tersinde kullanılarak ritim değişir.

Her bölüm şu üç katmandan en az ikisini içerir:

1. **sabit bilgi:** folyo, bölüm adı, ilerleme;
2. **değişen içerik:** proje görseli, açıklama, rol/yıl;
3. **artefakt mekaniği:** E/M’nin o bölümün state’ine dönüşen modülleri.

Boşluk, animasyon kadar önemlidir. Büyük bir geçişten sonra en az bir viewport yüksekliğinde görsel sessizlik planlanmalı.

## Etkileşim felsefesi

1. Scroll, sayfanın ana zaman çizgisidir.
2. Pointer, zamanı ilerletmez; yalnızca aktif sahneye bakış ve temas hissi verir.
3. Hover, nesnenin görevini açıklar; rastgele deformasyon yapmaz.
4. Click, bir projeyi açar veya iletişim kurar; önemli içerik yalnızca hover arkasına saklanmaz.
5. Her karmaşık hareketin anlık statik karşılığı vardır: E/M, proje adı ve açıklama animasyon yokken de okunur.

## Motion grammar

### Temel ölçüler

- Kısa UI tepkisi: 180–260 ms, hızlı cubic-bezier.
- Tipografi ve parça kayması: 450–700 ms, yumuşak ease-out.
- Proje geçişi: 700–1000 ms; input kilidi yalnızca geçiş boyunca.
- Uzun scroll scrub: doğrudan `progress` ile lineer; görsel gecikme için en fazla küçük bir low-pass smoothing.
- Fizik hissi gereken tek yer: modülün grid’e oturuşu; spring overshoot çok küçük, zıplama yok.

### Giriş

Gerçek asset hazırlığı bitince E/M modülleri dıştan içe değil, grid çizgileri boyunca kısa mesafelerden yerlerine oturur. Başlık önce okunur, hareket sonra anlamı pekiştirir. Uzun logo animasyonu veya sahte yüzde göstergesi kullanılmaz.

### Scroll-linked hareket

Scroll progress şu sırayla okunur: `0–0.25` E/M açısı ve folyo, `0.25–0.65` modül ayrılması ve metin/medya maskesi, `0.65–0.9` proje içeriği, `0.9–1` transition hazırlığı. Kullanıcı hızlı kaydırdığında state atlanabilir ama proje içeriği kaybolmamalı; snap veya “nearest state” mantığı gerekir.

### Pinned sequence

Yalnızca hero ve proje sequence pinned olacak. Hero’da E/M görünürken içerik katmanı onun etrafından geçer. Proje sequence’te tek bir büyük medya çerçevesi sabit kalır, metadata ve E/M parçaları proje değiştikçe güncellenir. Her proje için bağımsız uzun bir pin yerine aynı sahne yeniden kullanılır.

### Proje geçişleri

Geçiş formülü: mevcut görsel crop daralır → E/M omurgası dikey ayraç olur → sonraki görsel aynı maskeden açılır → başlık ve metadata değişir. Bu, Lusion’daki seri hissini alır; ancak proje görselleri aynı görsel efektle boğulmaz.

### Cursor tepkisi

Masaüstünde küçük kare/crosshair cursor yalnızca etkileşimli bölgelerde görünür. E/M üzerine gelince modüller imlece doğru en fazla 2–4 px / 2° yönelir; proje görselinde crop maskesi 1–2% oynar. Sürekli trail, parçacık, ışık izi ve tüm sayfayı takip eden büyük bir daire kullanılmaz.

### Hover ve focus

CTA ve proje linklerinde aynı dil kullanılır: kobalt bir dolgu yüzeyi alttan veya soldan genişler, metin 4–8 px kayar, küçük ok/işaret görünür. Focus-visible durumunda aynı affordance outline ve metin konumuyla klavyede de görülür. Hover, içeriği değiştirmez; yalnızca tıklanabilirliği anlatır.

### Görsel / video reveal

Görsel maskesi E/M dış modüllerinden kurulabilir, fakat içerik DOM/img olarak kalır. Video yalnızca gerçek reel veya proje içeriği varsa kullanılacak; otomatik ses yok. Poster görseli, lazy-load, `playsInline`, `muted` ve `prefers-reduced-motion` durumu baştan tanımlanacak.

### Tipografi hareketi

Başlık karakterleri bağımsız uçuşmayacak. En fazla satır veya kelime blokları 8–16 px yatay/dikey yer değiştirir; opacity değişimi yalnızca okunurluğu destekler. Aynı başlık birden fazla yerde farklı easing ile oynatılmayacak.

### Navigasyon ve sayfa geçişi

Header minimal ve sabit: E/M monogramı, `Work`, `About`, `Contact`. Menü açıldığında grid çizgileri belirginleşir ve E/M, menü durumunu gösterecek kadar açılır. Route transition yalnızca içerik bağlamı değiştiğinde çalışır; back/forward ve deep-link doğrudan içerik state’ine ulaşır.

### Reduced motion

`prefers-reduced-motion: reduce` durumunda:

- pin süreleri kaldırılır veya en fazla kısa fade/crossfade’e iner;
- E/M parçaları final state’e anında yerleşir;
- pointer parallax kapatılır;
- video autoplay durur, poster ve play kontrolü kalır;
- scroll progress yerine açık `Previous / Next` ve anchor linkleri görünür;
- menü opacity/fade ile açılır, transform sequence yoktur.

## 3D / WebGL rolü ve teknoloji kararı

| Etki | Önerilen teknoloji | Neden |
| --- | --- | --- |
| E/M geometrisi, grid ve maskeler | HTML/CSS + inline SVG | Keskin, erişilebilir, kolay responsive ve düşük maliyetli |
| Scroll pin / progress orchestration | GSAP + ScrollTrigger **veya** küçük bir native IntersectionObserver state katmanı | Tek bir pinned hero ve project sequence için yeterli; her yere GSAP yayılmamalı |
| Smooth scroll | Önce native scroll; yalnızca pointer/pin senkronu zorunluysa Lenis | Body’yi `overflow:hidden` yapmanın erişilebilirlik ve input riskini azaltmak |
| Uygulama kabuğu | React | Proje state’i, route, data contract ve fallback’leri net ayırmak için |
| Pointer depth | CSS transform veya SVG `transform` | E/M’nin 2–4° tepkisi için WebGL gereksiz |
| Opsiyonel derinlik | Three.js / React Three Fiber, düşük çözünürlüklü tek sahne | Sadece düz SVG ile anlamlı olmayan occlusion/parallax kanıtlanırsa |
| Shader | GLSL yalnızca maskenin görsel olarak başka türlü üretilemediği durumda | Prestige için değil, belirli bir kompozisyon ihtiyacı için |
| Reel / proje videosu | HTML `<video>` veya Vimeo embed | Gerçek medya varsa; poster ve reduced-motion fallback ile |
| Geçiş animasyonu | SVG / CSS; Rive ancak ayrı bir state asset’i gerçekten gerekiyorsa | Rive, her route için varsayılan bağımlılık olmayacak |

### WebGL eşik kararı

İlk sürüm E/M’yi SVG/CSS ile tamamlamalı. WebGL ancak şu iki ihtiyaçtan biri kanıtlanırsa eklenebilir:

1. parçaların birbirinin önünde/arkasında gerçek occlusion ile hareket etmesi zorunluysa;
2. pointer ile 2.5D yüzeyin düşük maliyetli üretimi SVG’de kabul edilemezse.

WebGL eklenirse tek canvas, sabit düşük DPR, asset instancing, görünür bölüm dışında pause ve `webglcontextlost` fallback’i zorunludur. Mobilde 2D/flat sürüm varsayılan kabul edilir.

## Responsive felsefesi

- **Masaüstü:** 12 kolon, pinned hero ve tek aktif proje sahnesi.
- **Tablet:** 8 kolon, daha kısa pin, E/M parçaları daha küçük ve metadata alt sıraya iner.
- **Mobil:** 4 kolon, uzun pinned sekans yerine üç-dört snap state; E/M 2D SVG, medya üstte, açıklama altta. Pointer etkisi kaldırılır; dokunma ile `Previous / Next` veya açık state kontrolü gelir.
- **Dar yükseklik:** hero başlığı ve artefakt üst üste binmez; E/M hero içinde sabit oranlı kutuda kalır.
- **Touch:** hover affordance içerikleri gizlemez, yalnızca basılı/odaklı state’e dönüşür.

## Erişilebilirlik ve içerik sözleşmesi

- Her bölüm gerçek HTML heading hiyerarşisi ve landmark ile kurulacak.
- Canvas/SVG yalnızca destekleyici görsel; proje adı, rol, yıl, açıklama ve bağlantı DOM’da bulunacak.
- `aria-live` yalnızca state değişimi kullanıcıya anlamlı bilgi veriyorsa kullanılacak; her scroll frame’i duyurulmayacak.
- Klavye kullanıcıları artefaktı `Previous`, `Next`, `Open project`, `Contact` ile kontrol edebilecek.
- Focus ring yalnızca kobalt ve en az 3:1 kontrastlı görünür bir kalınlıkta olacak.
- Görseller gerçek alt metin alacak; dekoratif E/M SVG’si `aria-hidden="true"` olabilir.
- Harici font başarısız olduğunda layout okunabilir kalacak.
- Gerçek proje verisi yoksa kartta sahte isim, ödül, metrik, müşteri veya tarih gösterilmeyecek.

## Performans bütçesi ve riskler

- İlk anlamlı HTML içerik: 1 s içinde görünür.
- Hero poster: 300 KB civarı hedef; gerçek proje medya lazy-load.
- İlk etkileşimden önce en fazla bir aktif renderer.
- Scroll sırasında layout thrash yok; yalnızca `transform` ve `opacity` animasyonu.
- Asset decode ve font yükü preloader’dan ayrılacak.

**En büyük teknik risk:** Smooth/pinned scroll, tek canvas ve proje medya geçişleri aynı anda kontrol edilirse düşük güçlü mobil cihazlarda input gecikmesi ve state senkron kaybı oluşabilir. Bu yüzden native scroll + SVG E/M temelidir; WebGL ve Lenis opsiyoneldir, her ikisi de performans ölçümü olmadan kabul edilmez.

