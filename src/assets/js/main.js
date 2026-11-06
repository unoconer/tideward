(() => {
  'use strict';
  const header = document.querySelector('[data-header]');

  // Mobile navigation
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      if (open && header) document.documentElement.style.setProperty('--nav-top', `${Math.max(0, header.getBoundingClientRect().bottom)}px`);
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    window.matchMedia('(min-width: 1181px)').addEventListener('change', (e) => e.matches && setOpen(false));
  }

  // Header shadow on scroll
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Background video: respect reduced motion and data-saver
  const video = document.querySelector('[data-hero-video]');
  if (video) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = navigator.connection && navigator.connection.saveData;
    const wide = window.matchMedia('(min-width: 768px)');
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(([k, type]) => {
        if (video.dataset[k]) { const s = document.createElement('source'); s.src = video.dataset[k]; s.type = type; video.appendChild(s); }
      });
      video.load();
    };
    const apply = () => {
      if (reduce.matches || saveData || !wide.matches) { video.pause(); return; }
      load();
      const p = video.play(); if (p && p.catch) p.catch(() => {});
    };
    wide.addEventListener('change', apply);
    apply();
    reduce.addEventListener('change', apply);
    video.addEventListener('playing', () => video.closest('.hero')?.classList.add('has-video'));
  }

  // Table of contents highlighting
  const toc = document.querySelectorAll('.guide__toc a, .faq-page__nav a, .jump a');
  if (toc.length && 'IntersectionObserver' in window) {
    const map = new Map([...toc].map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          toc.forEach((a) => a.classList.remove('is-active'));
          map.get(en.target.id)?.classList.add('is-active');
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  // Reveal-on-scroll (progressive enhancement)
  const reveal = document.querySelectorAll('[data-reveal]');
  if (reveal.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
    const ro = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); } }), { rootMargin: '0px 0px -10% 0px' });
    reveal.forEach((el) => ro.observe(el));
  }

  // Contact form: prefill interest + accessible validation
  const form = document.querySelector('[data-form]');
  if (form) {
    const interest = new URLSearchParams(location.search).get('interest');
    const sel = form.querySelector('#interest');
    if (interest && sel && [...sel.options].some((o) => o.value === interest)) sel.value = interest;
    const errBox = form.querySelector('[data-form-error]');
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.textContent;
    window.addEventListener('pageshow', () => { btn.disabled = false; btn.textContent = label; });
    form.addEventListener('submit', (e) => {
      const fields = [...form.querySelectorAll('input, select, textarea')].filter((f) => f.name && f.type !== 'hidden' && f.type !== 'radio' && !f.closest('.hp'));
      const invalid = fields.filter((f) => !f.checkValidity());
      fields.forEach((f) => f.setAttribute('aria-invalid', invalid.includes(f) ? 'true' : 'false'));
      if (invalid.length) {
        e.preventDefault();
        const names = invalid.map((f) => f.dataset.label || (form.querySelector(`label[for="${f.id}"]`)?.textContent || f.name).replace('*', '').trim());
        errBox.textContent = `Please check: ${names.join(', ')}.`;
        errBox.hidden = false;
        invalid[0].focus();
        return;
      }
      errBox.hidden = true;
      btn.disabled = true;
      btn.textContent = 'Sending…';
    });
  }
})();
