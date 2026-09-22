/* ============================================================
   RP Studio — настройки сайта
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'rpstudio.settings.v3';

  const DEFAULTS = {
    mode: 'beauty',
    theme: 'white',

    glow: 100,
    panelOpacity: 72,
    blur: 24,

    particles: true,
    particlesCount: 60,
    particleSize: 100,
    particleGlow: 100,
    particleShadow: true,
    particleColorTheme: true,

    orbs: true,
    animations: true,

    animSpeed: 100,
    radiusScale: 100,
    borderWidth: 50,
    gradientAngle: 135
  };

  const THEME_MIGRATION = {
    'rose': 'red',
    'aurora': 'neon',
    'lava': 'dawn',
    'galaxy': 'borealis'
  };

  let settings = { ...DEFAULTS };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      settings = { ...DEFAULTS, ...parsed };
      if (THEME_MIGRATION[settings.theme]) settings.theme = THEME_MIGRATION[settings.theme];
    } catch (e) {}
  }

  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (e) {}
    }, 180);
  }

  function apply() {
    const html = document.documentElement;

    html.setAttribute('data-mode', settings.mode);
    html.setAttribute('data-theme', settings.theme);

    html.style.setProperty('--glow-power',   String(settings.glow / 100));
    html.style.setProperty('--panel-alpha',  String(settings.panelOpacity / 100));
    html.style.setProperty('--blur-power',   settings.blur + 'px');
    html.style.setProperty('--anim-speed',   String(settings.animSpeed / 100));
    html.style.setProperty('--radius-scale', String(settings.radiusScale / 100));
    html.style.setProperty('--border-w',     (settings.borderWidth / 100) + 'px');
    html.style.setProperty('--grad-angle',   settings.gradientAngle + 'deg');

    if (settings.mode === 'optimized') {
      html.style.setProperty('--glow-power', '0');
      html.style.setProperty('--blur-power', '0px');
      html.setAttribute('data-particles', 'off');
      html.setAttribute('data-orbs', 'off');
      html.setAttribute('data-animations', 'off');
    } else if (settings.mode === 'balanced') {
      html.style.setProperty('--glow-power', '0.5');
      html.style.setProperty('--blur-power', '12px');
      html.setAttribute('data-particles', settings.particles ? 'on' : 'off');
      html.setAttribute('data-orbs', 'off');
      html.setAttribute('data-animations', settings.animations ? 'on' : 'off');
    } else {
      html.setAttribute('data-particles', settings.particles ? 'on' : 'off');
      html.setAttribute('data-orbs', settings.orbs ? 'on' : 'off');
      html.setAttribute('data-animations', settings.animations ? 'on' : 'off');
    }

    if (window.Particles) {
      if (settings.mode === 'optimized' || !settings.particles) {
        window.Particles.stop();
      } else if (settings.mode === 'balanced') {
        window.Particles.start(Math.min(30, settings.particlesCount));
      } else {
        window.Particles.start(settings.particlesCount);
      }
    }

    syncUI();
  }

  function syncUI() {
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === settings.mode));
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.theme === settings.theme));

    const setV = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setV('set-glow', settings.glow);
    setV('set-opacity', settings.panelOpacity);
    setV('set-blur', settings.blur);
    setV('set-pcount', settings.particlesCount);
    setV('set-psize', settings.particleSize);
    setV('set-pglow', settings.particleGlow);
    setV('set-radius', settings.radiusScale);
    setV('set-border', settings.borderWidth);
    setV('set-animspeed', settings.animSpeed);
    setV('set-gradangle', settings.gradientAngle);

    const chk = (id, v) => { const el = document.getElementById(id); if (el) el.checked = v; };
    chk('set-particles', settings.particles);
    chk('set-pshadow', settings.particleShadow);
    chk('set-pcolor', settings.particleColorTheme);
    chk('set-orbs', settings.orbs);
    chk('set-anim', settings.animations);

    const lbl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    lbl('set-glow-val', settings.glow + '%');
    lbl('set-opacity-val', settings.panelOpacity + '%');
    lbl('set-blur-val', settings.blur + 'px');
    lbl('set-pcount-val', settings.particlesCount);
    lbl('set-psize-val', settings.particleSize + '%');
    lbl('set-pglow-val', settings.particleGlow + '%');
    lbl('set-radius-val', settings.radiusScale + '%');
    lbl('set-border-val', (settings.borderWidth / 100) + 'px');
    lbl('set-animspeed-val', (settings.animSpeed / 100).toFixed(1) + 'x');
    lbl('set-gradangle-val', settings.gradientAngle + '°');

    const beautySec = document.getElementById('beauty-settings');
    if (beautySec) {
      const off = settings.mode === 'optimized';
      beautySec.style.opacity = off ? '0.35' : '1';
      beautySec.style.pointerEvents = off ? 'none' : 'auto';
      beautySec.style.filter = off ? 'grayscale(0.7)' : 'none';
    }
  }

  function bindUI() {
    const modal = document.getElementById('settings-modal');
    const openBtn = document.getElementById('settings-btn');
    const closeBtn = document.getElementById('settings-close');
    if (!modal || !openBtn) return;

    const open = () => { syncUI(); modal.classList.add('active'); };
    const close = () => modal.classList.remove('active');
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('active')) close(); });

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => { settings.mode = btn.dataset.mode; apply(); save(); });
    });
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => { settings.theme = btn.dataset.theme; apply(); save(); });
    });

    const bindRange = (id, key, suffix) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        settings[key] = parseInt(el.value, 10);
        const lblEl = document.getElementById(id + '-val');
        if (lblEl) {
          if (key === 'animSpeed')        lblEl.textContent = (settings[key]/100).toFixed(1) + 'x';
          else if (key === 'borderWidth') lblEl.textContent = (settings[key]/100) + 'px';
          else if (key === 'gradientAngle') lblEl.textContent = settings[key] + '°';
          else lblEl.textContent = settings[key] + (suffix || '');
        }
        apply(); save();
      });
    };
    bindRange('set-glow', 'glow', '%');
    bindRange('set-opacity', 'panelOpacity', '%');
    bindRange('set-blur', 'blur', 'px');
    bindRange('set-pcount', 'particlesCount', '');
    bindRange('set-psize', 'particleSize', '%');
    bindRange('set-pglow', 'particleGlow', '%');
    bindRange('set-radius', 'radiusScale', '%');
    bindRange('set-border', 'borderWidth', 'px');
    bindRange('set-animspeed', 'animSpeed', 'x');
    bindRange('set-gradangle', 'gradientAngle', '°');

    const bindCheck = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('change', () => { settings[key] = el.checked; apply(); save(); });
    };
    bindCheck('set-particles', 'particles');
    bindCheck('set-pshadow', 'particleShadow');
    bindCheck('set-pcolor', 'particleColorTheme');
    bindCheck('set-orbs', 'orbs');
    bindCheck('set-anim', 'animations');

    const reset = document.getElementById('settings-reset');
    if (reset) {
      reset.addEventListener('click', () => {
        if (!confirm('Сбросить все настройки по умолчанию?')) return;
        settings = { ...DEFAULTS };
        apply(); save();
      });
    }
  }

  load();
  apply();

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindUI);
  else bindUI();

  window.RPSettings = {
    get: () => ({ ...settings }),
    set: (patch) => { settings = { ...settings, ...patch }; apply(); save(); },
    reset: () => { settings = { ...DEFAULTS }; apply(); save(); }
  };
})();