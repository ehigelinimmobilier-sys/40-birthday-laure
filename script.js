// Maison Laure, Collection N° 40.
// Le coeur ouvre la porte. Les passages restent scelles
// jusqu'au 15 aout 2026, 9h00, heure du telephone de Laure.

(() => {
  const REVEAL_AT = new Date(2026, 7, 15, 9, 0, 0);
  const PREVIEW_KEY = 'laure40.preview';

  const gate = document.getElementById('gate');
  const heart = document.getElementById('gate-heart');
  const passages = Array.from(document.querySelectorAll('.passage'));
  const dots = Array.from(document.querySelectorAll('#dots i'));
  const finale = document.getElementById('finale');
  const countdown = document.getElementById('countdown');
  const countdownText = document.getElementById('countdown-text');
  const maisonWord = document.getElementById('maison-word');

  let revealed = false;

  /* ---- La porte ---- */
  heart.addEventListener('click', () => {
    gate.classList.add('is-open');
    setTimeout(() => {
      gate.remove();
      document.body.classList.remove('gate-locked');
    }, 820);
  });

  /* ---- Revelation ---- */
  function isForced() {
    try {
      return new URLSearchParams(location.search).has('copine')
        || sessionStorage.getItem(PREVIEW_KEY) === '1';
    } catch { return false; }
  }

  function shouldReveal() {
    return Date.now() >= REVEAL_AT.getTime() || isForced();
  }

  function openPassage(p, animated) {
    const sealed = p.querySelector('.passage__face--sealed');
    const open = p.querySelector('.passage__face--open');
    sealed.hidden = true;
    open.hidden = false;
    if (!animated) open.style.animation = 'none';
    p.classList.add('is-open');
    const idx = Number(p.dataset.index) - 1;
    if (dots[idx]) dots[idx].classList.add('is-on');
  }

  function reveal(animated) {
    if (revealed) return;
    revealed = true;
    document.body.classList.add('is-revealed');

    passages.forEach((p, i) => {
      if (animated) setTimeout(() => openPassage(p, true), i * 220);
      else openPassage(p, false);
    });

    const finaleDelay = animated ? passages.length * 220 + 500 : 0;
    setTimeout(() => {
      finale.hidden = false;
      if (animated) finale.classList.add('is-in');
    }, finaleDelay);

    countdownText.textContent = 'Bonne journée, Laure';
    if (maisonWord) {
      maisonWord.innerHTML = 'Tout est là.<br/>Laisse-toi porter.';
    }
  }

  /* ---- Compte a rebours ---- */
  function daysUntilReveal() {
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startReveal = new Date(2026, 7, 15);
    return Math.round((startReveal - startToday) / 86400000);
  }

  function tick() {
    if (shouldReveal()) {
      reveal(true);
      return;
    }
    const d = daysUntilReveal();
    if (d > 1) {
      countdownText.textContent = 'Révélation le 15 août · 9h00 · J-' + d;
    } else if (d === 1) {
      countdownText.textContent = 'Révélation demain · 9h00';
    } else {
      countdownText.textContent = "C'est aujourd'hui · rendez-vous à 9h00";
    }
  }

  if (shouldReveal()) {
    reveal(false);
  } else {
    tick();
    setInterval(tick, 30000);
  }

  /* ---- Registre : coche du sac ---- */
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

  /* ---- Apercu pour Elisabeth : taper "laure" ---- */
  (() => {
    let buf = '';
    document.addEventListener('keydown', (e) => {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === 'laure') {
        buf = '';
        try { sessionStorage.setItem(PREVIEW_KEY, '1'); } catch {}
        reveal(true);
      }
    });
  })();
})();
