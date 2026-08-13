// La Correspondance, pour Laure.
// L'enveloppe s'ouvre au tap. Le 14 aout a 20h00 : le sac et la tenue.
// Le 15 aout : chaque moment se devoile 1h30 avant son heure.
// Le 15 aout a 20h00 : le mot de la fin.

(() => {
  const VEILLE_AT = new Date(2026, 7, 14, 20, 0, 0);
  const LETTER_AT = new Date(2026, 7, 15, 20, 0, 0);
  const DAY = { y: 2026, m: 7, d: 15 };
  const PREVIEW_KEY = 'laure40.preview';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const gate = document.getElementById('gate');
  const seal = document.getElementById('gate-heart');
  const moments = Array.from(document.querySelectorAll('.moment'));
  const walks = Array.from(document.querySelectorAll('.walk'));
  const finale = document.getElementById('finale');
  const countdownText = document.getElementById('countdown-text');
  const veilleSealed = document.getElementById('veille-sealed');
  const veilleContent = document.getElementById('veille-content');

  /* ---- L'enveloppe qui s'ouvre ---- */
  seal.addEventListener('click', () => {
    if (gate.classList.contains('is-opening')) return;
    gate.classList.add('is-opening');
    setTimeout(() => gate.classList.add('is-out'), 520);
    setTimeout(() => gate.classList.add('is-gone'), 1500);
    setTimeout(() => {
      gate.remove();
      document.body.classList.remove('gate-locked');
    }, 2200);
  });

  /* ---- Revelation au fil de l'eau ---- */
  function isForced() {
    try {
      return new URLSearchParams(location.search).has('copine')
        || sessionStorage.getItem(PREVIEW_KEY) === '1';
    } catch { return false; }
  }

  function unlockDate(m) {
    const parts = (m.dataset.unlock || '0h00').split('h');
    return new Date(DAY.y, DAY.m, DAY.d, Number(parts[0]), Number(parts[1] || 0), 0);
  }

  let veilleOpen = false;
  function openVeille() {
    if (veilleOpen) return;
    veilleOpen = true;
    veilleSealed.hidden = true;
    veilleContent.hidden = false;
  }

  function openMoment(m, animated) {
    if (m.classList.contains('is-open')) return;
    const sealed = m.querySelector('.moment__sealed');
    const open = m.querySelector('.moment__open');
    sealed.hidden = true;
    open.hidden = false;
    if (!animated) open.style.animation = 'none';
    m.classList.add('is-open');
    // le trajet vers ce moment n'apparait qu'a son deblocage,
    // pour ne jamais annoncer la suite
    const w = walks[Number(m.dataset.index) - 2];
    if (w) w.classList.add('is-shown');
  }

  let letterShown = false;
  function showLetter() {
    if (letterShown) return;
    letterShown = true;
    finale.hidden = false;
  }

  function openAll(animated) {
    openVeille();
    moments.forEach((m, i) => {
      if (animated) setTimeout(() => openMoment(m, true), i * 240);
      else openMoment(m, false);
    });
    setTimeout(showLetter, animated ? moments.length * 240 + 400 : 0);
    countdownText.textContent = 'Bon anniversaire, Laure';
  }

  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (d) => d.getHours() + 'h' + pad(d.getMinutes());

  function daysUntil(target) {
    const now = new Date();
    const a = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const b = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    return Math.round((b - a) / 86400000);
  }

  function tick(animated) {
    if (isForced()) { openAll(animated); return; }
    const now = Date.now();

    if (now >= VEILLE_AT.getTime()) openVeille();

    let next = null;
    moments.forEach((m) => {
      const u = unlockDate(m).getTime();
      if (now >= u) openMoment(m, animated);
      else if (next === null || u < next) next = u;
    });

    if (now >= LETTER_AT.getTime()) showLetter();

    /* le fil du compte a rebours */
    if (now >= LETTER_AT.getTime()) {
      countdownText.textContent = 'Bon anniversaire, Laure';
    } else if (now < VEILLE_AT.getTime()) {
      const d = daysUntil(VEILLE_AT);
      if (d > 1) {
        countdownText.textContent = 'Première révélation le 14 août à 20h00 · J-' + d;
      } else if (d === 1) {
        countdownText.textContent = 'Première révélation demain soir, à 20h00';
      } else {
        const ms = VEILLE_AT.getTime() - now;
        countdownText.textContent = 'Ce soir à 20h00 · dans '
          + Math.floor(ms / 3600000) + 'h' + pad(Math.floor((ms % 3600000) / 60000));
      }
    } else if (next !== null) {
      const nd = new Date(next);
      const today = daysUntil(nd) === 0;
      countdownText.textContent = (today ? 'La suite se dévoile à ' : 'La suite se dévoile demain à ') + fmt(nd);
    } else {
      countdownText.textContent = 'Le mot de la fin arrive à 20h00';
    }
  }

  tick(false);
  setInterval(() => tick(true), 30000);

  /* ---- Le sac : coche persistante ---- */
  const SAC_KEY = 'laure40.sac';
  document.querySelectorAll('.registry__row').forEach((row) => {
    const box = row.querySelector('.registry__box');
    const id = row.dataset.check;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(SAC_KEY) || '{}'); } catch {}
    if (saved[id]) {
      row.classList.add('is-checked');
      box.setAttribute('aria-pressed', 'true');
    }
    box.addEventListener('click', () => {
      const on = row.classList.toggle('is-checked');
      box.setAttribute('aria-pressed', String(on));
      try {
        const s = JSON.parse(localStorage.getItem(SAC_KEY) || '{}');
        s[id] = on;
        localStorage.setItem(SAC_KEY, JSON.stringify(s));
      } catch {}
    });
  });

  /* ---- Apercu : taper "laure" ---- */
  (() => {
    let buf = '';
    document.addEventListener('keydown', (e) => {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === 'laure') {
        buf = '';
        try { sessionStorage.setItem(PREVIEW_KEY, '1'); } catch {}
        openAll(true);
      }
    });
  })();

  /* ---- Apparitions au scroll ---- */
  const toReveal = document.querySelectorAll('.reveal-on-scroll');
  if (reduced || !('IntersectionObserver' in window)) {
    toReveal.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    toReveal.forEach(el => io.observe(el));
  }

  /* ---- Parallax ---- */
  if (!reduced) {
    const layers = Array.from(document.querySelectorAll('[data-parallax]'))
      .map(el => ({ el, speed: parseFloat(el.dataset.parallax) || 0 }));
    let ticking = false;

    function apply() {
      const y = window.scrollY;
      const vh = window.innerHeight;
      layers.forEach(({ el, speed }) => {
        el.style.transform = 'translate3d(0,' + (y * speed).toFixed(1) + 'px,0)';
      });
      document.querySelectorAll('.frame img').forEach((img) => {
        const r = img.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        const progress = (r.top + r.height / 2 - vh / 2) / vh;
        const shift = Math.max(-8, Math.min(8, -progress * 10));
        img.style.transform = 'translate3d(0,' + shift.toFixed(2) + '%,0) scale(1.16)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    }, { passive: true });
    apply();
  }
})();
