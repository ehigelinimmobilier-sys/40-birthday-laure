// Pour Laure, 15 août 2026.
// Mécanique de découverte : chaque enveloppe s'ouvre au clic
// et ne se referme plus. Progression trackée en haut.

(() => {
  const courses = document.querySelectorAll('.course');
  const counter = document.getElementById('progress-count');
  const total = courses.length;
  let opened = 0;

  function updateCounter() {
    if (counter) counter.textContent = String(opened);
  }

  function openCourse(course, { scroll = false } = {}) {
    if (course.classList.contains('is-open')) return;
    course.classList.add('is-open');
    opened += 1;
    updateCounter();

    if (opened === total) {
      setTimeout(finaleCelebration, 900);
    }

    if (scroll) {
      const rect = course.getBoundingClientRect();
      if (rect.top < 40 || rect.bottom > window.innerHeight - 40) {
        course.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  courses.forEach((course) => {
    const trigger = course.querySelector('[data-open]');
    if (!trigger) return;
    trigger.addEventListener('click', () => openCourse(course));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCourse(course);
      }
    });
  });

  // Auto-ouverture selon l'heure réelle du 15 août 2026 en Europe/Paris.
  // Si la date est passée ou en cours, on ouvre les moments déjà arrivés.
  (function autoOpenByTime() {
    const now = new Date();
    // Cible : 15 août 2026, heure locale du navigateur.
    // Simple check : year >= 2026 && (month > août || (août && day >= 15))
    const y = now.getFullYear();
    const m = now.getMonth(); // 0-indexed, août = 7
    const d = now.getDate();

    const isDayOrAfter =
      y > 2026 ||
      (y === 2026 && m > 7) ||
      (y === 2026 && m === 7 && d >= 15);

    if (!isDayOrAfter) return;

    // Sur le jour même, on ouvre selon l'heure.
    // Après le jour, tout est ouvert.
    const isTheDay = (y === 2026 && m === 7 && d === 15);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    courses.forEach((course) => {
      const t = course.getAttribute('data-time');
      if (!t) return;
      if (!isTheDay) { openCourse(course); return; }
      const [hh, mm] = t.split(':').map(Number);
      const startMin = hh * 60 + mm;
      if (nowMinutes >= startMin) openCourse(course);
    });
  })();

  // Petit code d'urgence : tape "laure" pour tout dévoiler.
  (function unlockAllShortcut() {
    let buf = '';
    document.addEventListener('keydown', (e) => {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === 'laure') {
        buf = '';
        courses.forEach(c => openCourse(c));
      }
    });
  })();

  // Célébration : quelques particules laiton/sienne à l'ouverture du dernier.
  function finaleCelebration() {
    const layer = document.createElement('div');
    layer.className = 'finale-veil';
    document.body.appendChild(layer);

    const N = 60;
    const colors = ['#b8945f', '#8b3a2f', '#1e1b17', '#f2ead8'];
    for (let i = 0; i < N; i++) {
      const p = document.createElement('span');
      const size = 4 + Math.random() * 8;
      const startX = Math.random() * 100;
      const dur = 3 + Math.random() * 3;
      Object.assign(p.style, {
        position: 'absolute',
        top: '-24px',
        left: startX + '%',
        width: size + 'px',
        height: (size * .35) + 'px',
        background: colors[i % colors.length],
        transform: `rotate(${Math.random() * 360}deg)`,
        opacity: '0',
        transition: `transform ${dur}s linear, top ${dur}s cubic-bezier(.4,.1,.6,1), opacity .5s ease`
      });
      layer.appendChild(p);
      requestAnimationFrame(() => {
        p.style.opacity = '1';
        p.style.top = (105 + Math.random() * 15) + 'vh';
        p.style.transform = `rotate(${Math.random() * 900}deg) translateX(${(Math.random() - .5) * 60}px)`;
      });
    }
    setTimeout(() => {
      layer.style.transition = 'opacity .8s ease';
      layer.style.opacity = '0';
      setTimeout(() => layer.remove(), 900);
    }, 5000);
  }
})();
