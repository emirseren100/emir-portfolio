# Yaratıcı Yön: EMIR — Kinetik Sistem

## Tek cümlelik yön

EMIR, yaratıcı geliştirici portföyünün statik logosu değil; işleri sıralayan, odaklayan ve birbirine bağlayan modüler bir editoryal sistemdir. Kelime önce kimlik olarak okunur, sonra aynı geometrinin başka bir görevi açılır: yapı, proje frame’i, metadata rail’i ve bir sonraki işe geçiş.

## Yaratıcı pozisyon

Bu yön, “yeteneklerimi sergileyen bir ekran” yerine “arayüzlerin nasıl davrandığına dair çalışan bir örnek” önerir. Ziyaretçi yalnızca projeleri okumaz; bir karar mekanizmasının içinden geçirildiğini hisseder. Artefakt sayfada gezmek için kullanılan bir indeks olduğu için her hareket şu sorulardan birine cevap vermelidir: Neredeyim? Neye bakıyorum? Sırada ne var? İletişim kurmak için ne yapmalıyım?

## Seçilen görsel ankraj

**Ankraj: Swiss punk record-label.** Yüksek kontrastlı sıcak nötr yüzey, near-black tipografi, tek kobalt vurgu, saç teli grid çizgileri ve büyük sans-serif ölçek korunur; ancak kompozisyona poster/record-label gerilimi veren sert crop’lar, bilinçli asimetri ve endeks işaretleri eklenir. Arayüz “fütüristik” görünmek için neon, glow, cam veya rastgele parçacık kullanmayacak.

**Ayırt edici hareket:** EMIR’in harfleri scroll boyunca dekoratif olarak uçuşmaz; kendi işlevlerine dönüşür. E frame ve yatay rayları, M diyagonal yönü, I metadata/index omurgası, R ise maske ve proje kenarı olur. Böylece kimlik ile içerik arasında kopuk bir geçiş yerine aynı nesnenin görev değiştirmesi görünür.

## Konsept: EMIR — Kinetik Sistem

### Artefaktın yapısı

EMIR tek bir modüler SVG wordmark’ı olarak kurulur:

1. **E:** dikey gövde ve üç yatay rail; grid ve proje frame’inin taşıyıcısıdır.
2. **M:** iki yapısal diyagonal; yön, derinlik ve geçiş kuvvetini taşır.
3. **I:** cobalt index omurgası; numara, metadata ve ilerleme ritmini sabitler.
4. **R:** stem, bowl ve leg; proje maskesinin kenarı ve exit işaretidir.

Başlangıçta kelime açıkça EMIR olarak okunur. Scroll ile açıldığında parçalar serbest cisimler gibi dağılmaz; grid çizgilerine ve proje görselinin sınırlarına bağlanır. “Parçalanma” fizik gösterisi değil, içeriğin yapısal olarak açılmasıdır.

### Durum makinesi

| Durum | Kullanıcı anlamı | Artefakt davranışı |
| --- | --- | --- |
| `assembled` | Giriş / yön bulma | EMIR tek wordmark, başlık ve kimlik bilgisi birlikte görünür. |
| `separating` | Yapının açılması | E rail’leri ayrılır, M yön değiştirir, I ve R yeni akslarını arar. |
| `framing` | Proje odakta | EMIR geometrisi geçici DEVFLOW görselini crop’layan bir frame’e dönüşür. |
| `rail` | Proje / süreç açıklaması | I metadata rail’i olarak okunur; numara, başlık ve link görünür kalır. |
| `exit` | Bir sonraki işe geçiş | R kenarı ve yön çizgisi sahneyi ileri taşır; frame temiz bir kapanışa çözülür. |

Bir state değişimi yalnızca scroll `progress` aralığında gerçekleşir; pointer tek başına proje değiştirmez. Reverse scroll aynı yolları tersine izler.

## Görsel dil

### Yüzey ve renk

- Ana yüzey: `#F5F5F2` gibi sıcak, hafif nötr bir yüzey.
- Metin: `#101010` near-black.
- Tek vurgu: cobalt `#002FA7`.
- Grid ve ayraçlar: düşük kontrastlı 1 px çizgiler.
- Aktif vurgu: kobalt yalnızca I omurgası, sinyal çizgisi, focus ve geçiş işaretlerinde kullanılır; büyük rastgele dolgu yoktur.

### Tipografi

Tek sans ailesi kullanılacak: tercihen Söhne veya Helvetica Neue; web lisansı ve performans uygun değilse sistem fallback’i `Arial, sans-serif`. Display ve gövde aynı ailenin ağırlık/genişlik farklarıyla kurulacak.

- Hero display: viewport’a göre büyük, sıkı tracking’li cümle ölçeği.
- Section başlıkları: 4–8vw; cümle kırımları asimetrik.
- Metadata: 11–13 px, tabular numerals, dekoratif mono-kapsül olmadan.
- Folyolar: `01 / 05`, `WORK / SYSTEMS`, `FORWARD / PROJECT 02` gibi gerçek navigasyon bilgileri.

Gerçek proje adı, yılı, rolü ve bağlantısı yoksa veri sözleşmesi bunları boş bırakmalı; sahte müşteri veya sonuç üretilmemeli.

### Layout felsefesi

Masaüstünde 12 kolon, 1 px dikey grid çizgileri ve geniş kenar boşlukları kullanılır. Hero başlığı sol bölgede nefes alır; EMIR geniş bir yatay kütle olarak merkezi alanı tutar. Scroll ilerleyince aynı kütle sağdaki proje frame’i ve dikey metadata rail’i ile yeni bir asimetri kurar.

Her bölüm şu üç katmandan en az ikisini içerir:

1. **sabit bilgi:** folyo, bölüm adı, ilerleme;
2. **değişen içerik:** proje görseli, açıklama, rol/yıl;
3. **artefakt mekaniği:** EMIR’in o bölümün state’ine dönüşen parçaları.

Boşluk, animasyon kadar önemlidir. Büyük bir geçişten sonra kompozisyonun nefes alacağı alan bırakılır; ancak pin süresi gereksiz yere uzatılmaz.

## Etkileşim felsefesi

1. Scroll sayfanın ana zaman çizgisidir.
2. Pointer zamanı ilerletmez; yalnızca aktif sahneye bakış ve temas hissi verir.
3. Hover, nesnenin görevini açıklar; rastgele deformasyon yapmaz.
4. Click, bir projeyi açar veya iletişim kurar; önemli içerik yalnızca hover arkasına saklanmaz.
5. Her karmaşık hareketin anlık statik karşılığı vardır: EMIR, proje adı ve açıklama animasyon yokken de okunur.

## Motion grammar

### Temel ölçüler

- Kısa UI tepkisi: 180–260 ms, hızlı cubic-bezier.
- Tipografi ve parça kayması: 450–700 ms, yumuşak ease-out.
- Proje geçişi: 700–1000 ms; input kilidi yalnızca geçiş boyunca.
- Uzun scroll scrub: doğrudan `progress` ile lineer; görsel gecikme için küçük low-pass smoothing.
- Kontrollü perspektif: yalnızca proje görselinde ve düşük derece aralığında.

### Giriş

EMIR önce okunur, hareket sonra anlamı pekiştirir. Wordmark dıştan içe uçuşan parçalardan değil, yerinde duran modüler çizgilerden oluşur. Uzun logo animasyonu veya sahte yüzde göstergesi kullanılmaz.

### Scroll-linked hareket

Scroll progress şu sırayla okunur: `0–0.22` assembled kimlik, `0.22–0.52` decomposition, `0.52–0.73` proje frame’i, `0.73–0.90` metadata rail’i, `0.90–1` exit hazırlığı. Kullanıcı hızlı kaydırdığında ara görsel kısalabilir; proje içeriği kaybolmamalıdır. Snap veya scroll hijacking kullanılmaz.

### Pinned sequence

Desktop’ta tek bir scene pinlenir; `390vh` sequence yüksekliği dört okunabilir state için pacing sağlar. Hero’da EMIR ve başlık birlikte yaşar. Proje frame’i büyük detached bir kobalt kart olarak belirmez; EMIR geometrisinin kurulmuş sınırlarından açılır, I rail’i de aynı sistemin metadata yüzü olur.

### Proje geçişleri

Geçiş formülü: assembled EMIR → yönlenen rail’ler → aynı geometriden açılan proje crop’u → I metadata rail’i → R/çizgi ile sonraki projeye yön. İçerik DOM’da kalır; frame yalnızca işlevsel bir maske ve odaklayıcı katmandır.

### Pointer tepkisi

EMIR üzerine gelince wordmark en fazla düşük genlikli x/y parallax ve 1.6° rotasyon alır; proje görseli 1–1.4° aralığında kontrollü perspective tilt ile derinleşir. Inertia dönüşü vardır fakat nesne imleci takip etmez. Sürekli trail, parçacık, ışık izi ve tüm sayfayı takip eden büyük bir daire kullanılmaz.

### Hover ve focus

CTA ve proje linklerinde aynı dil kullanılır: ince kobalt veya near-black çizgi, küçük ok hareketi ve görünür focus ring. Hover içeriği değiştirmez; yalnızca tıklanabilirliği anlatır.

### Görsel / video reveal

Görsel maskesi EMIR’in dış modüllerinden kurulabilir, fakat içerik DOM/img olarak kalır. Video yalnızca gerçek reel veya proje içeriği varsa kullanılacak; otomatik ses yok. Poster, lazy-load, `playsInline`, `muted` ve reduced-motion durumu baştan tanımlanacak.

### Tipografi hareketi

Başlık karakterleri bağımsız uçuşmayacak. En fazla satır veya kelime blokları 8–16 px yer değiştirir; opacity yalnızca okunurluğu destekler. Aynı başlık birden fazla yerde farklı easing ile oynatılmaz.

### Navigasyon ve sayfa geçişi

Header minimal ve sabit: EMIR wordmark’ı, work/about/contact bağlantıları ve mevcut prototipteki sequence marker. Route transition yalnızca içerik bağlamı değiştiğinde çalışır; back/forward ve deep-link doğrudan içerik state’ine ulaşır.

### Reduced motion

`prefers-reduced-motion: reduce` durumunda:

- pin süresi ve uzun cinematic sequence kaldırılır;
- EMIR okunabilir static frame durumuna anında yerleşir;
- pointer parallax ve transition’lar kapanır;
- proje içeriği, metadata ve anchor navigasyonu normal belge akışında kalır;
- menü opacity/fade ile açılır, transform sequence kullanılmaz.

## 3D / WebGL rolü ve teknoloji kararı

| Etki | Önerilen teknoloji | Neden |
| --- | --- | --- |
| EMIR geometrisi, grid ve maskeler | HTML/CSS + inline SVG | Keskin, erişilebilir, responsive ve düşük maliyetli |
| Scroll pin / progress | GSAP + ScrollTrigger | Tek pinned scene için açık sahiplik ve doğrudan scrub |
| Smooth scroll | Önce native scroll; yalnızca kanıtlanmış ihtiyaç varsa Lenis | Body kilitleme ve input riskini azaltmak |
| Pointer depth | CSS transform veya SVG transform | EMIR’in düşük dereceli tepkisi için WebGL gereksiz |
| Opsiyonel derinlik | Three.js / React Three Fiber | Sadece düz SVG ile anlamlı olmayan occlusion kanıtlanırsa |
| Shader | GLSL | Yalnızca maskenin başka türlü üretilemediği belirli bir ihtiyaç varsa |

### WebGL eşik kararı

İlk sürüm EMIR’i SVG/CSS ile tamamlamalı. WebGL ancak parçaların gerçek occlusion ile hareket etmesi veya SVG’de kabul edilemeyecek ölçekte canlı deformasyon zorunluysa eklenebilir. Mobilde 2D/flat sürüm varsayılan kalır.

## Responsive felsefesi

- **Masaüstü:** 12 kolon, pinned hero ve tek aktif proje sahnesi.
- **Tablet:** daha sıkı grid, daha kısa algılanan pacing ve metadata rail’i için daha fazla yatay nefes.
- **Mobil:** uzun pinned sequence yok; EMIR, proje görseli ve metadata normal belge akışında tek kolona geçer. Pointer etkisi kaldırılır.
- **Dar yükseklik:** hero başlığı ve wordmark üst üste binmez; EMIR sabit oranlı SVG alanında kalır.
- **Touch:** hover affordance içerikleri gizlemez; link ve frame klavye/touch ile erişilebilir kalır.

## Erişilebilirlik ve içerik sözleşmesi

- Her bölüm gerçek HTML heading hiyerarşisi ve landmark ile kurulacak.
- SVG destekleyici görsel; proje adı, rol, açıklama ve bağlantı DOM’da bulunacak.
- `aria-live` yalnızca state değişimi kullanıcıya anlamlı bilgi veriyorsa kullanılacak; her scroll frame’i duyurulmayacak.
- Klavye kullanıcıları skip link ve proje anchor’ı ile motion sequence’ı geçebilecek.
- Focus ring kobalt veya near-black ve görünür kontrastta olacak.
- EMIR SVG’si anlamlı wordmark olarak etiketlenebilir; dekoratif varyantlar `aria-hidden="true"` olabilir.
- Harici font başarısız olduğunda layout okunabilir kalacak.

## Performans bütçesi ve riskler

- İlk anlamlı HTML içerik: 1 s içinde görünür.
- Prototipte ağır asset, canvas veya sürekli render loop yok.
- Scroll sırasında layout thrash yok; transform, opacity ve sınırlı clip-path kullanılır.
- SVG ve ileride eklenecek proje medya decode maliyeti ölçülmeden büyütülmez.

**Ana risk:** pinned ScrollTrigger, ilerideki proje medya geçişleri ve smooth scroll aynı anda kontrol edilirse düşük güçlü cihazlarda input gecikmesi oluşabilir. Bu yüzden native scroll + SVG/DOM temelidir; Lenis ve WebGL performans ölçümü olmadan kabul edilmez.
