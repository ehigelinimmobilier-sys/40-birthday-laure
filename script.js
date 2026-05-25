// Reveal on scroll — léger, sans dépendance.
(() => {
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  items.forEach(el => io.observe(el));
})();

// Easter egg : tape "40" au clavier pour faire pleuvoir des confettis discrets.
(() => {
  let buf = '';
  document.addEventListener('keydown', (e) => {
    if (!/^[0-9]$/.test(e.key)) { buf = ''; return; }
    buf = (buf + e.key).slice(-2);
    if (buf === '40') {
      buf = '';
      rain();
    }
  });

  function rain() {
    const N = 40;
    const colors = ['#b8281f', '#1a1815', '#8a6a2a', '#5b2a86'];
    const layer = document.createElement('div');
    Object.assign(layer.style, {
      position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '9999', overflow: 'hidden'
    });
    document.body.appendChild(layer);

    for (let i = 0; i < N; i++) {
      const p = document.createElement('span');
      const size = 6 + Math.random() * 8;
      Object.assign(p.style, {
        position: 'absolute',
        top: '-20px',
        left: (Math.random() * 100) + '%',
        width: size + 'px',
        height: (size * .35) + 'px',
        background: colors[i % colors.length],
        transform: `rotate(${Math.random() * 360}deg)`,
        transition: `transform ${2 + Math.random() * 2}s linear, top ${2 + Math.random() * 2}s linear, opacity .4s ease`
      });
      layer.appendChild(p);
      requestAnimationFrame(() => {
        p.style.top = (100 + Math.random() * 20) + 'vh';
        p.style.transform = `rotate(${Math.random() * 720}deg)`;
      });
    }
    setTimeout(() => {
      layer.style.opacity = '0';
      setTimeout(() => layer.remove(), 500);
    }, 4200);
  }
})();
