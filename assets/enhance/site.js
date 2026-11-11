/* Evolve 360 preview: theme, menu, WhatsApp form, Lenis smooth scroll, GSAP parallax / depth / counters. */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const KEY = 'evolve-theme';
  const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const save = (v) => { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } };

  /* theme */
  const tbtn = document.querySelector('.theme-toggle');
  const meta = document.querySelector('meta[name="theme-color"]');
  const setTheme = (t, persist) => {
    root.dataset.theme = t;
    if (meta) meta.content = t === 'dark' ? '#04060a' : '#f3f7fc';
    if (tbtn) { tbtn.setAttribute('aria-pressed', String(t === 'dark')); tbtn.setAttribute('aria-label', t === 'dark' ? tbtn.dataset.toLight : tbtn.dataset.toDark); }
    if (persist) save(t);
    window.dispatchEvent(new CustomEvent('themechange', { detail: t }));
  };
  setTheme(root.dataset.theme || 'light', false);
  if (tbtn) tbtn.addEventListener('click', () => {
    root.classList.add('theme-anim');
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    setTimeout(() => root.classList.remove('theme-anim'), 550);
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => { if (!read()) setTheme(e.matches ? 'dark' : 'light', false); });

  /* menu */
  const mbtn = document.querySelector('.menu-btn'), links = document.querySelector('.nav-links');
  if (mbtn && links) {
    const set = (o) => { links.classList.toggle('open', o); mbtn.setAttribute('aria-expanded', String(o)); };
    mbtn.addEventListener('click', () => set(!links.classList.contains('open')));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  /* contact form -> WhatsApp (no server needed) */
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form), f = (k) => String(d.get(k) || '').trim();
    const msg = [form.dataset.greeting, f('name'), f('service'), '', f('message')].join('\n');
    const url = `${form.dataset.wa}?text=${encodeURIComponent(msg)}`;
    const w = window.open(url, '_blank');
    if (w) w.opener = null; else location.href = url;
  });

  /* lightbox: pictures enlarge in place, no outside links */
  const shots = document.querySelectorAll('.shot[data-full]');
  if (shots.length && typeof HTMLDialogElement === 'function') {
    const dlg = document.createElement('dialog');
    dlg.className = 'lb';
    dlg.innerHTML = '<div class="lb__in"><button class="lb__x" type="button" aria-label="' + (document.documentElement.lang === 'ckb' ? 'داخستن' : 'Close') + '">&times;</button><img alt=""><p class="lb__cap"></p></div>';
    document.body.appendChild(dlg);
    const im = dlg.querySelector('img'), cap = dlg.querySelector('.lb__cap');
    shots.forEach((b) => b.addEventListener('click', () => {
      im.src = b.dataset.full; im.alt = b.dataset.alt || '';
      cap.textContent = b.dataset.cap || '';
      dlg.showModal();
    }));
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('.lb__x') || e.target.classList.contains('lb__in')) dlg.close(); });
  }

  if (reduce || !window.gsap || !window.ScrollTrigger || !window.Lenis) return;

  /* headline: words rise in (split by words so Kurdish letters stay joined) */
  const splitWords = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = p; w.appendChild(i); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) splitWords(n);
    });
  };
  const h1 = document.querySelector('.hero h1');
  if (h1) {
    h1.setAttribute('aria-label', h1.textContent.trim());
    splitWords(h1);
    gsap.from(h1.querySelectorAll('.w > span'), { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.09, delay: 0.15 });
  }

  /* magnetic primary buttons */
  document.querySelectorAll('.btn--primary').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3, ease: 'power2.out' });
    });
    b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,.5)' }));
  });

  /* smooth scroll in step with GSAP */
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault(); lenis.scrollTo(el, { offset: -72, duration: 1.1 });
  });

  /* progress line */
  const bar = document.querySelector('.scroll-progress');
  if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

  /* hero parallax: words rise and fade, the 3D layer reads the same progress */
  const hero = document.querySelector('.hero');
  if (hero) {
    window.__heroProgress = 0;
    ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', onUpdate: (s) => { window.__heroProgress = s.progress; } });
    gsap.to(hero.querySelector(':scope > .wrap'), { y: -90, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    hero.addEventListener('pointermove', (ev) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (ev.clientX - r.left) + 'px'); hero.style.setProperty('--my', (ev.clientY - r.top) + 'px');
    });
    gsap.from(hero.querySelectorAll('.eyebrow, .lead, .actions, .chips'), { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.5 });
  }

  /* depth: reel covers drift inside their frames (pictures only, never text) */
  gsap.utils.toArray('.shot img, .step__img img').forEach((img) => {
    gsap.set(img, { scale: 1.18 });
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
  });
  /* pictures are unveiled once, step lines draw as you reach them */
  gsap.utils.toArray('.step__img').forEach((el) => gsap.from(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
  gsap.utils.toArray('.step__line').forEach((el) => gsap.from(el, { scaleX: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));

  /* headings, cards and highlights arrive once */
  gsap.utils.toArray('main section h2').forEach((h) => gsap.from(h, { y: 30, opacity: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 90%', once: true } }));
  ['.hl-row', '.grid3', '.stats', '.contact-list', '.goals', '.gallery'].forEach((sel) => {
    document.querySelectorAll(sel).forEach((g) => gsap.from(g.children, { y: 26, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: g, start: 'top 88%', once: true } }));
  });

  /* numbers count up once; the real value is already in the HTML */
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count), o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('en-US'); }, onComplete: () => { el.textContent = end.toLocaleString('en-US'); } }) });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
