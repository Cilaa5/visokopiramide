/* ============================================================
   PREMIUM JS — Bosnian Pyramids
   ============================================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Loading screen ──────────────────────────────────────── */
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => loadingScreen.classList.add('hidden'), 400);
    });
  }

  /* ── Scroll progress bar ─────────────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      progressBar.style.transform = `scaleX(${pct})`;
    }, { passive: true });
  }

  /* ── Nav: scrolled state ─────────────────────────────────── */
  const nav = document.getElementById('nav-premium');
  if (nav) {
    const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  }

  /* ── Active nav link ─────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav-link-premium');
  navLinks.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });

  /* ── Mobile menu ─────────────────────────────────────────── */
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('hidden');
      mobileBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  /* ── Parallax hero ───────────────────────────────────────── */
  if (!prefersReduced) {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        heroBg.style.transform = `translateY(${y * 0.35}px)`;
      }, { passive: true });
    }
  }

  /* ── Scroll reveal ───────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ── Animated counters ───────────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function step(now) {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      const val = target * eased;
      el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
      if (elapsed < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

  /* ── Magnetic buttons ────────────────────────────────────── */
  if (!prefersReduced) {
    document.querySelectorAll('.btn-primary, .btn-magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--mx', x + '%');
        btn.style.setProperty('--my', y + '%');
      });
    });
  }

  /* ── Tilt effect on cards ────────────────────────────────── */
  if (!prefersReduced) {
    document.querySelectorAll('.img-card, .pyramid-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── Page transition ─────────────────────────────────────── */
  if (!prefersReduced) {
    document.querySelectorAll('a[href]').forEach(link => {
      if (
        link.hostname === window.location.hostname &&
        !link.hasAttribute('target') &&
        !link.hash &&
        link.href !== window.location.href
      ) {
        link.addEventListener('click', e => {
          e.preventDefault();
          const href = link.href;
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.25s ease';
          setTimeout(() => { window.location.href = href; }, 250);
        });
      }
    });
    // Fade in on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    window.addEventListener('pageshow', () => {
      requestAnimationFrame(() => { document.body.style.opacity = '1'; });
    });
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  }

})();
