/* ============================================================
   Красивые частицы на фоне — canvas
   Читает настройки из window.RPSettings
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let running = false;
  let rafId = null;
  let W = 0, H = 0, DPR = 1;

  let currentSizeMul = 1;
  let currentGlowMul = 1;
  let currentShadow = true;
  let currentUseAccent = true;

  function getSettings() {
    if (window.RPSettings && typeof window.RPSettings.get === 'function') {
      return window.RPSettings.get();
    }
    return {
      particles: true,
      particlesCount: 60,
      particleSize: 100,
      particleGlow: 100,
      particleShadow: true,
      particleColorTheme: true,
      mode: 'beauty'
    };
  }

  function getAccentRGB() {
    if (!currentUseAccent) return [255, 255, 255];
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
    if (!raw) return [255, 255, 255];
    const parts = raw.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
    return parts.length === 3 ? parts : [255, 255, 255];
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function createParticles(count) {
    particles = [];
    const [r, g, b] = getAccentRGB();
    for (let i = 0; i < count; i++) {
      const baseSize = 0.6 + Math.random() * 1.4;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: baseSize * currentSizeMul,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: 0.25 + Math.random() * 0.55,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.015,
        color: `rgba(${r}, ${g}, ${b}, 1)`
      });
    }
  }

  function tick() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    const [r, g, b] = getAccentRGB();

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      const a = p.a * (0.6 + Math.sin(p.pulse) * 0.4);

      if (currentShadow && currentGlowMul > 0) {
        ctx.shadowBlur = 8 * currentGlowMul;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${Math.min(1, a * 0.9)})`;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    rafId = requestAnimationFrame(tick);
  }

  function start(count) {
    stop();

    const s = getSettings();
    currentSizeMul = (s.particleSize ?? 100) / 100;
    currentGlowMul = (s.particleGlow ?? 100) / 100;
    currentShadow = s.particleShadow !== false;
    currentUseAccent = s.particleColorTheme !== false;

    const desired = count || s.particlesCount || 60;

    resize();
    createParticles(desired);
    running = true;
    canvas.style.display = 'block';
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (canvas) { ctx.clearRect(0, 0, W, H); canvas.style.display = 'none'; }
  }

  function refresh() {
    if (running) start(particles.length || 60);
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!running) return;
      resize();
      createParticles(particles.length || 60);
    }, 180);
  });

  function autoStart() {
    const s = getSettings();
    if (s.mode === 'optimized') return;
    if (s.particles === false) return;
    const count = s.mode === 'balanced'
      ? Math.min(30, s.particlesCount || 60)
      : (s.particlesCount || 60);
    start(count);
  }

  // Автозапуск после загрузки
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(autoStart, 60));
  } else {
    setTimeout(autoStart, 60);
  }

  window.Particles = { start, stop, restart: start, refresh };
})();