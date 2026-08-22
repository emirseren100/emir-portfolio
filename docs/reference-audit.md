# Referans Denetimi

**Denetim tarihi:** 19 Ağustos 2026  
**Kapsam:** `https://landonorris.com/`, `https://www.igloo.inc/`, `https://lusion.co/` canlı ana sayfaları ve Lusion’ın Oryzo AI proje detayı.  
**Yöntem:** Sayfalar masaüstü görünümünde tarayıcı ile açıldı; DOM erişilebilirlik ağacı, ekran görüntüleri, kaydırma ve imleç hareketiyle gözlemlendi. Bazı WebGL davranışları görsel olarak doğrulandı ancak kaynak kodu incelenmedi. “Çıkarım” etiketi, doğrudan doğrulanamayan yorumları belirtir.

## Hızlı sentez

| Referans | En güçlü ilke | Gözlemlenen teknik omurga | Portföye aktarılacak karşılık |
| --- | --- | --- | --- |
| Lando Norris | Editoryal anlatıyı scroll ile sahnelemek | Sticky/pinned bloklar, yumuşak scroll, çoklu canvas, Rive geçişi | EMIR parçalarının bir bölümden diğerine anlam taşıması |
| Igloo Inc | İmleci mekânın yönlendirme girdisine çevirmek | Metinsiz, tam ekran WebGL sahnesi; pointer ile kamera/kompozisyon tepkisi | EMIR’in pointer ile düşük genlikli yön değiştirmesi ve scroll ile durum değiştirmesi |
| Lusion | Tek bir motion gramerini 3D ve UI’a yaymak | Three.js canvas, sanal scroll, video overlay, preloader, hover CSS kuralları | Artefakt, proje maskesi ve CTA’ların aynı “parçalanma / birleşme” dilini kullanması |

Bu üç ilke aynı görsel kimliği taklit etmek için değil, farklı katmanlara ayrılmak için kullanılıyor: Lando içerik ritmini, Igloo spatial input’u, Lusion ise mikro-etkileşim ve teknik geri dönüş planını besliyor.

## 1. Lando Norris

### Bilgi mimarisi

Ana navigasyon `Home`, `On Track`, `Off Track`, `Calendar` ve `Store` etrafında kuruluyor. Ana sayfa tek bir uzun anlatı: hero / sıradaki yarış, “Message from Lando” anlatı şeridi, tarihsel-görsel hikâye, `On Track` ve `Off Track` ayrımı, kask arşivi, mağaza, ortaklıklar, sosyal bağlantılar ve footer. Bu yapı bir portföy için “işler”i tek başına kataloglamaktan daha anlatısal bir referans sağlıyor.

### Hero davranışı

İlk ekranda sabit üst navigasyon, merkezde büyük insan görseli ve sol altta “next race” bilgi kartı bulunuyor. Beyaz zemin üzerindeki ince çizgi dokusu ve limon yeşili vurgu, portreyi görsel odak yapıyor. Portre, yatay glitch bantlarıyla kesiliyor; bu efekt yalnızca süs değil, kişinin kamusal imajını kontrollü biçimde “bozan” bir imza hareketi gibi çalışıyor.

DOM ve CSS gözleminde `.sticky-track.home-hero` yüksekliği `200vh`, hero öğesi sticky ve tam ekran canvas katmanı içeriyor. Bu, hero’nun tek viewport’luk bir görsel değil, scroll mesafesi boyunca oynatılan bir sahne olduğunu doğruluyor.

### Scroll ve sabit bölümler

Kaydırma yaklaşık ilk 600 px’de hero’dan “Message from Lando” bölümüne geçerken hero sahnesi sticky kalıyor. Mesaj bölümünde tekrar eden büyük tipografi, merkez görsel ve imza katmanı aynı karede üst üste geliyor. Kaydırma düz belge hareketi gibi değil; sahne, renk ve içerik arasında kontrollü bir scrub hissi veriyor. `scroll-indicator` sabit konumda ve kontrastı `mix-blend-mode: difference` ile koruyor.

Sonraki bölümlerde yatay kaydırma ve pinned bileşenler için `.is-horiz-scroll`, `.horizontal-pin-sticky` ve birden fazla `sticky-item` kullanılıyor. Bu sınıf isimleri doğrudan gözlemlendi; bunların her birinin tam davranış eşlemesi kaynak incelemesi yapılmadan kesinleştirilemez.

### Geçişler ve medya

Ana hikâyede fotoğraflar, tarih/yer etiketleri, çizim-imza katmanları ve tipografik tekrarlar birbirinin yerini alıyor. Bölüm temaları koyu yeşil, beyaz ve limon yeşili arasında değişiyor. Sayfa/rota geçişi için sabit bir `transition-w` ve `transition-rive` katmanı bulunuyor; Rive kullanımı sınıf ve DOM yapısından doğrulanıyor. Görsellerin crop, parallax ve overlay davranışları içerik tarihini bir görsel kolaja çeviriyor.

### Tipografi ve grid

Başlıklar çok büyük, sıkı ve çoğunlukla büyük harfli. İnce sans-serif gövde metni; yoğun, karakterli bir display yüzüyle yan yana geliyor. 1 px çizgiler, tarih folyo etiketleri ve belirgin sol/sağ asimetrisi içerik sıralamasını taşıyor. Görsel sayısı fazla olsa da boşluk, özellikle girişte ve geçiş aralarında korunuyor.

### Mouse, cursor ve hover

Navigasyon menüsü açıldığında içerik; Home, On Track, Off Track, Calendar, sosyal bağlantılar ve iş e-postasıyla tam yüzeyli bir menüye dönüşüyor. DOM’da butonun `Open navigation menu` durumundan `Close menu [expanded]` durumuna geçtiği görüldü. Menü, mobilde de ana gezinmeyi açık bir yüzey olarak sunuyor.

Kart ve program ızgaralarında hover ile limon yeşili / koyu yeşil renk değişimi gözlemlenebilir CSS kuralı olarak mevcut. Bunun dışında sürekli özel cursor izi kullanılmıyor; tepki, içerik bloklarının kendisinde kalıyor.

### 3D / WebGL kullanımı

Sayfa ilk yüklemede 21 canvas ve `.gl-canvas`, `.gl-background` gibi sabit katmanlar içeriyor. Bu, hero ve bazı geçişlerde WebGL veya canvas tabanlı görsel kompozisyon kullanıldığını gösteriyor. Ayrıntılı shader davranışı bu denetimde incelenmedi; bu nedenle “hangi katman Three.js, hangisi başka bir renderer” konusu çıkarımdır.

### Navigasyon, yükleme ve responsive

Navigasyon başlangıçta kompakt ve sabit; menü açıldığında editoryal bir tam ekran yüzeye genişliyor. İlk yükleme görünür bir sahneye nispeten hızlı ulaştı. Mobil görünümde hero kompozisyonu daraltılıyor, başlığın görsel bir “Lando Norris Text” varlığına dönüştüğü, `tap to lock` / `Back to scroll` yardımının ve dokunmatik odaklı bir el ikonunun gösterildiği gözlemlendi. Bu, masaüstü scroll dramaturgisinin mobilde birebir korunmadığını; etkileşim modunun değiştirildiğini gösteriyor.

### Proje / içerik sunumu

Lando sayfası proje portföyü değil, kişisel marka ve arşiv sunumu. Buna rağmen “On Track / Off Track” ayrımı, seçilebilir arşiv ve tekrarlanan tema geçişleri portföyde iş türlerini ayırmak için kullanılabilir.

### Pacing ve akılda kalıcılık

Pacing hızlı bir açılıştan sonra uzun, kontrollü duraklamalara geçiyor. Akılda kalan şey tek bir efekt değil: imza, tema rengi, fotoğraf ve scroll’un aynı kişisel anlatı işaretlerine tekrar tekrar bağlanması.

### Portföy için kavramsal ders

İçeriği scroll ile sadece “hareket ettirmek” yerine, her scroll aralığına bir anlatı fiili verilmeli: tanıt, ayır, karşılaştır, yakınlaştır, arşivle, geri birleştir. EMIR artefaktı bu fiillerin durum göstergesi olabilir.

## 2. Igloo Inc

### Bilgi mimarisi

Canlı denetimde görünür bir metin, navigasyon, bağlantı veya form yüzeyi bulunmadı. DOM kabuğu `#app > #webgl` içinde neredeyse boş kaldı; deneyim tek bir tam ekran görsel mekân olarak açılıyor. Bu nedenle içerik mimarisi yok değil, görsel mekânın içine gömülü; fakat bu oturumda metinsel katman gözlemlenmedi.

### Hero ve yükleme davranışı

İlk ekran açık gri bir alanda küçük, çizgisel bir formun belirmesiyle başladı. Yaklaşık 30 saniyelik bekleme boyunca sahne; merkezde bir küre, çevresinde çizgisel ızgaralar ve ardından kar/taş dokulu bir arazi ile iglo benzeri bir yapı oluşturdu. Bu süre, yüksek varlık yükleme veya shader/asset hazırlanması için güçlü bir preloader etkisi yaratıyor; ancak bunun amaçlı bir dramatik giriş mi yoksa tarayıcı yükleme gecikmesi mi olduğu kesin değildir.

### Pointer ve mekân

İmleç ekranın sağ, sol ve merkez bölgelerine taşındığında kamera/kompozisyon gözle görülür biçimde değişti: yapı daha yakın veya daha uzak göründü, çevre arazinin yönü ve merkezdeki ışık/çizgi yoğunluğu değişti. Tepki doğrudan “cursor trail” değil; imleç, mekânda bakış yönü veya kamera hedefi gibi çalışıyor.

Bu, portföy için değerli bir ilke: pointer yalnızca butonun rengini değiştirmek zorunda değil; sayfadaki bir nesnenin mekânsal durumunu etkileyebilir. Ancak Igloo’nun tam olarak hangi input eğrisini kullandığı ve scroll’a bağlanıp bağlanmadığı bu denetimde doğrulanmadı. Normal DOM scroll yüksekliği değişmedi; bir wheel denemesi de bu yüzeyde güvenilir bir sayfa ilerlemesi vermedi. Scroll ilişkisi bu nedenle **belirsiz / çıkarım** olarak bırakılmalı.

### 3D / WebGL kullanımı

Görsel çıktı, ışık, kamera perspektifi, çizgisel geometri, materyal ve arazi yüzeyleri nedeniyle gerçek zamanlı 3D renderer kullanımına işaret ediyor. DOM’da canvas görünür şekilde listelenmedi; Igloo uygulaması `https://www.igloo.inc/assets/index-2eb69c09.js` üzerinden çalışan özel bir WebGL yüzeyi olarak davranıyor. Renderer kütüphanesi bu denetimde doğrulanmadı; Three.js, WebGL2 veya özel bir motor olduğu iddia edilmemeli.

### Tipografi, layout ve navigasyon

Görünür tipografi veya grid bulunmadığı için tipografik hiyerarşi ve IA hakkında güvenilir çıkarım yapılamaz. Tam ekran kompozisyon, güçlü bir “tek nesne / tek dünya” yaklaşımı sunuyor. Bu minimalizm bir portföyde yalnızca giriş veya proje arası nefes alanı olarak kullanılmalı; ana içerik tamamen görsel mekâna bırakılmamalı.

### Hover / medya / responsive

Belirgin bir hover kontrolü, video overlay’i veya bağlantı sunulmadı. Sahne, media olarak video değil canlı renderer gibi davranıyor. Mobil uyarlama bu denetimde güvenilir biçimde gözlemlenmedi. **Çıkarım:** Böyle bir sahnenin mobilde tam renderer yerine düşük çözünürlüklü poster veya 2D SVG fallback’e ihtiyacı olacaktır.

### Teknik karmaşıklık ve risk

Tek bir tam ekran sahne bile asset indirme, GPU belleği, shader derleme, DPR kontrolü ve mobil termal yük açısından pahalı olabilir. Igloo’nun deneyimi yüksek etkili ama hata toleransı düşük bir örnek. Portföy için alınacak ders, aynı yoğunluğu kopyalamak değil, pointer’ı bir durum makinesinin girdisi yapmak ve renderer yükünü opsiyonel kılmaktır.

### Akılda kalıcılık

Metin anlatısı olmadan bir “dünya”nın oluşmasını izlemek akılda kalıyor. Nesne dekor gibi durmuyor; kullanıcı kendisini o mekâna bakıyor hissediyor. EMIR için karşılığı, artefaktın her sayfada aynı kalmaması ama her değişimin içerik anlamı taşımasıdır.

## 3. Lusion

### Bilgi mimarisi

Header içinde Home, About Us, Projects, Contact ve Labs bulunuyor; menü açıldığında newsletter alanı da geliyor. Ana sayfa sırası: yüksek etkili hero, `Bold Ideas, Brought to Life` yaklaşım bölümü, reel / video çağrısı, featured work listesi ve footer. Oryzo AI proje detayında proje açıklaması, dış bağlantılar ve `Next Project` geçişi ile projeler bir seri olarak bağlanıyor.

### Hero davranışı

İlk ekran soluk lavanta arka plan, büyük siyah sans-serif başlık, sabit yuvarlak header kontrolleri ve koyu bir medya çerçevesi içinde siyah/beyaz/mavi modüler 3D parçalar sunuyor. Hero’daki 3D nesneler mekanik bağlantı parçaları gibi görünse de kullanıcıya “bu sahneye bak” hissi veriyor; ana içerik hiyerarşisi başlıkta kalıyor.

### Scroll ve pinned yapı

DOM ve ekran gözleminde body `overflow: hidden`, tam ekran Three.js canvas ve `scroll-indicator` bulunuyor. Wheel girdisi normal `window.scrollY` değerini artırmadan sahne içindeki sanal ilerlemeyi değiştiriyor; ekran görüntülerinde hero görseli kadrajda kalırken yaklaşım tipografisi ve medya bölümü alttan içeri giriyor. Bu, scroll’un belgeyi hareket ettirmekten çok sahne durumunu scrub ettiği bir sistem.

Three.js canvas `data-engine="three.js r158"` ile açıkça işaretlenmiş; canvas iç çözünürlüğü masaüstünde 1600×900, CSS boyutu viewport’a uyuyor. Video için Vimeo overlay’i, geçiş için ayrı canvas ve yüzde tabanlı preloader DOM’da görüldü.

### Tipografi ve layout

Aeonik adlı geometrik sans ve Helvetica fallback’leriyle büyük, siyah, düşük kontrastlı olmayan bir tipografik hiyerarşi kuruluyor. Soluk lavanta zemin, siyah, beyaz ve doygun kobalt/mavi ile sınırlı. 12 kolonlu bir grid, büyük yuvarlak köşeli medya çerçeveleri, sabit header ve yoğun negatif alan var. 3D yüzey gösterişli olsa da layout disiplini korunuyor.

### Cursor ve hover davranışı

CSS gözleminde cursor davranışının sürekli iz bırakmadığı, belirli etkileşim hedeflerinde ortaya çıktığı görülüyor. Reel için büyük dairesel oynatıcı cursor’ı ve hover’da ölçeklenen play kontrolü var. Header butonlarında arka plan rengi, metin kayması, noktanın büyümesi ve ok ikonunun içeri girmesi tek bir easing ailesiyle çalışıyor. Menü linklerinde metnin klonu yukarı kayıyor, arka plan kapsülü ölçekleniyor ve ok görünür oluyor.

Bu mikro davranışlar içerikten bağımsız süsler değil; “buraya tıklanır” affordance’ı ve hareketli bir tasarım sisteminin tutarlılık göstergesi.

### Media geçişleri ve proje sunumu

Hero/reel bölümü video overlay’i açabiliyor. Featured work linkleri kategori etiketlerini ve karakterleri tekrar eden katmanlar halinde sunuyor; bu, proje adını grid içinde canlı tutuyor. Proje detayında açıklama ve `Next Project` numaralı geçişi, sayfayı bağımsız landing page’ler yerine bir rota dizisi gibi bağlıyor. Bu fikir EMIR sisteminde bir sonraki proje için artefakt geometrisinin kontrollü değişmesine dönüşebilir.

### Navigasyon ve yükleme

Header sabit. Menu açılınca linkler, newsletter, Labs ve Contact yüzeyi gecikmeli transform/opacity ile geliyor. Preloader yüzde değerleri, transition overlay ve Vimeo iframe’i DOM’da görüldü. İlk açılışta tarayıcıya göre yükleme yüzeyi uzun süre kalabildi; bu, deneyimin önemli bir kısmının GPU ve harici medya hazır olmasına bağlı olduğunu gösteriyor.

### Responsive

CSS içinde `@media (hover: hover)` ile hover davranışlarının touch cihazlarda kapatıldığı ve 812 px altı için mobil ipucu katmanlarının bulunduğu görüldü. Bu, masaüstü hover’ı mobilde zorla taklit etmemek açısından iyi bir ilke. Bu oturumda Lusion’ın mobile WebGL sahnesi tam olarak yüklenmediği için gerçek mobil kadraj kesinleştirilemez; bunu tasarım kararına değil, doğrulanması gereken bir QA maddesine çevirmek gerekir.

### Pacing ve akılda kalıcılık

Pacing, yavaşça oluşan 3D hero → büyük bir sakin tipografik cümle → medya/reel → iş listesi şeklinde nefes alıyor. Akılda kalan, tek bir 3D nesneden çok aynı hareket gramerinin buton, menü, video ve sahne içinde tekrarlanması.

## Ne ödünç alınacak?

- **Lando’dan:** Scroll mesafesini anlatıdaki bir fiile çevirmek; tema, görüntü ve tipografiyi aynı bölüm durumuna bağlamak; mobilde etkileşim modunu değiştirmek.
- **Igloo’dan:** Pointer’ı kamera/kompozisyon girdisi yapmak; tek bir obje ya da dünya ile güçlü bir giriş hissi kurmak; görselin “bakılacak şey” değil “girilecek durum” olması.
- **Lusion’dan:** Sabit bir canvas ile içerik akışını birbirinden ayırmak; aynı easing ve affordance dilini CTA, menü, proje kartı ve geçişte kullanmak; preloader, transition ve reduced-motion fallback’lerini ilk günden düşünmek.

## Ne kopyalanmayacak?

- Lando’nun kişisel marka renkleri, portre kompozisyonu, glitch bantları, imza kullanımı, metinleri ve bölüm sırası.
- Igloo’nun iglo/arazi dünyası, gri-beyaz renk atmosferi, herhangi bir özel 3D mesh veya sahne dramaturgisi.
- Lusion’ın lavanta/kobalt paleti, modüler bağlantı parçaları, Aeonik/başlık yerleşimi, menü şekli, proje isimleri, animasyon eğrilerinin birebir değerleri ve kaynak kodu.
- Üç sitenin section-for-section akışı, marka işaretleri, görsel varlıkları veya proprietary artwork’ü.

## Birleştirme riskleri

1. Üç kaynaktaki “yüksek teknoloji” etkisini aynı anda kullanmak sayfayı gürültülü yapabilir. EMIR’in her durumu bir içerik göreviyle sınırlanmalı.
2. WebGL sahnesi scroll anlatısını gölgede bırakabilir. Artefaktın metin ve proje yönlendirmesi olmadan hareket etmesine izin verilmemeli.
3. Smooth scroll ve pinned bölümler erişilebilirlik, klavye ve mobil performansını kırabilir. Native scroll fallback’i her zaman korunmalı.
4. Büyük medya, harici video ve GPU renderer ilk açılışı uzatabilir. Preloader yalnızca gerçek yükleme ilerlemesini yansıtmalı; sahte bekleme yaratmamalı.
5. Hover-only affordance’lar touch ve keyboard kullanıcılarına kapalı kalabilir. Her hover davranışının focus/active karşılığı tasarlanmalı.

## Yeniden kullanılabilir etkileşim dersleri

- Scroll, bir bölümün “ilerleme oranı” olarak ele alınmalı; her bölümün başı ve sonu net bir state ile tanımlanmalı.
- Pinned sahne sadece bir noktada kullanılmalı; sahne sayfayı boğduğunda hareketin anlamı kayboluyor.
- Pointer tepkisi düşük genlikli ve bağlamsal olmalı; kullanıcı içerikten kopacak kadar kamerayı savurmamalı.
- Bir hover dilinde en fazla 2–3 hareket birleşmeli: renk, metin kayması, ikon/ok girişi.
- Proje geçişleri bir sonraki işi önceden sezdirerek navigasyon yükünü azaltabilir; ancak kullanıcıya doğrudan `Next` kontrolü de verilmeli.
- Preloader ve page transition ayrı kavramlar olarak belgelenmeli: ilki asset hazırlığı, ikincisi bağlam değişimi.
- Canvas’a yazılmayan her bilgi HTML olarak bulunmalı; WebGL bozulduğunda kullanıcı yine portföyü gezebilmeli.

## Referans etkisinin portföye dağılımı

| Tasarım kararı | Esas kaynak | EMIR’deki özgün karşılık |
| --- | --- | --- |
| Scroll ile anlatı ritmi | Lando | Artefaktın birleşme, açılma ve yeniden hizalanma durumları |
| Pointer ile mekânsal tepki | Igloo | EMIR modüllerinin düşük dereceli bakış değişimi ve maskeye oturma davranışı |
| Tutarlı hover ve geçiş grameri | Lusion | Aynı parça-split easing’inin buton, kart, menü ve proje geçişinde kullanılması |
| Mobile fallback | Lando + Lusion | Scroll sahnesinin snap/step kontrolüne ve poster/SVG’ye düşmesi |
