# Emir Portfolio — Proje Kuralları

- Görsel yön Swiss/editoryal: beyaz veya nötr açık yüzey, near-black tipografi, tek kobalt vurgu, 1 px grid kuralları ve güçlü asimetrik boşluk.
- EMIR — Kinetik Sistem dekoratif bir logo değil; scroll, proje çerçevesi ve metadata yönlendirmesiyle işlevsel bir arayüz durum makinesidir.
- Hareketler aynı grammar’ı paylaşmalı: transform, scale, clip/mask ve kontrollü easing. Rastgele parçacık, glow, sürekli cursor trail, anlamsız parallax ve jenerik AI estetiği eklenmez.
- Önce native scroll + CSS/SVG; GSAP/ScrollTrigger yalnızca pinned sequence için. WebGL/Three.js ancak ölçülmüş, gerekçeli bir ihtiyaç olarak ayrıca onaylanır.
- Layout ölçümünü scroll sırasında yapma. Animasyonlarda tercihen `transform`, `opacity` ve CSS custom property kullan; pahalı filtre ve layout değişikliklerinden kaçın.
- Her içerik HTML ile okunabilir olmalı; SVG/canvas görsel destek sağlar, proje verisini saklamaz.
- Klavye, focus-visible, touch ve `prefers-reduced-motion` senaryoları ilk sınıf kabul edilir. Mobilde desktop choreography mekanik olarak küçültülmez; sadeleştirilir.
- Yeni bir route veya motion sistemi eklerken ilgili docs dosyasını güncelle. Lint, production build ve gerçek tarayıcı QA tamamlanmadan işi bitmiş sayma.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
