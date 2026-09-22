/* ============================================================
   КОНСТАНТЫ
   ============================================================ */
const DEFAULT_CATEGORIES = [
  { id: 'blocks',      name: 'Блоки',            icon: '🧱' },
  { id: 'items',       name: 'Предметы',         icon: '🗡️' },
  { id: 'armor',       name: 'Броня',            icon: '🛡️' },
  { id: 'entity',      name: 'Сущности',         icon: '🐷' },
  { id: 'environment', name: 'Небо / Окружение', icon: '☁️' },
  { id: 'gui',         name: 'GUI',              icon: '🖼️' },
  { id: 'font',        name: 'Шрифт',            icon: '🔤' },
  { id: 'particle',    name: 'Частицы',          icon: '✨' },
  { id: 'painting',    name: 'Картины',          icon: '🎨' },
  { id: 'misc',        name: 'Разное',           icon: '📦' }
];
const CAT_ORDER = [
  'block','blocks','item','items','armor','entity','environment','gui','font',
  'particle','painting','models','colormap','effect','map','misc'
];

const MC_COLORS = {
  '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
  '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
  '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
  'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF'
};

const CAT_ICONS = {
  blocks:'🧱', items:'🗡️', armor:'🛡️', entity:'🐷', environment:'☁️',
  gui:'🖼️', font:'🔤', particle:'✨', painting:'🎨', misc:'📦',
  models:'🧊', colormap:'🎨', map:'🗺️', mob_effect:'💫',
  destroy_stage:'💥', effect:'💫', particle_alt:'✨',
  block: '🧱', item: '🗡️'
};
function catIcon(id) {
  if (id === 'mcpatcher/sky')    return '🌌';
  if (id === 'mcpatcher/ctm')    return '🔲';
  if (id === 'mcpatcher/cit')    return '🖼️';
  if (id === 'mcpatcher/grass')  return '🌿';
  if (id === 'mcpatcher/anim')   return '🎬';
  if (id.startsWith('mcpatcher/')) return '⚙️';
  return CAT_ICONS[id] || '📁';
}
function catName(id) {
  if (id === 'mcpatcher/sky')   return 'Небо (MCPatcher)';
  if (id === 'mcpatcher/ctm')   return 'CTM (MCPatcher)';
  if (id === 'mcpatcher/cit')   return 'CIT (MCPatcher)';
  if (id === 'mcpatcher/grass') return 'Трава (MCPatcher)';
  if (id === 'mcpatcher/anim')  return 'Анимация (MCPatcher)';
  if (id.startsWith('mcpatcher/')) return 'MCP: ' + prettifyName(id.slice(10));
  if (id === 'block')  return 'Блоки';
  if (id === 'item')   return 'Предметы';
  return prettifyName(id);
}
function prettifyName(id) {
  return id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' ');
}

/* Статичная библиотека (fallback) */
const TEXTURE_LIBRARY = {
  blocks: {
    'stone':[16,16,'Камень'], 'dirt':[16,16,'Земля'], 'grass_top':[16,16,'Трава (верх)'],
    'grass_side':[16,16,'Трава (бок)'], 'cobblestone':[16,16,'Булыжник'],
    'sand':[16,16,'Песок'], 'gravel':[16,16,'Гравий'], 'clay':[16,16,'Глина'],
    'obsidian':[16,16,'Обсидиан'], 'glass':[16,16,'Стекло'], 'brick':[16,16,'Кирпич'],
    'oak_planks':[16,16,'Доски (дуб)'], 'spruce_planks':[16,16,'Доски (ель)'],
    'oak_log':[16,16,'Бревно дуба'], 'coal_ore':[16,16,'Угольная руда'],
    'iron_ore':[16,16,'Железная руда'], 'gold_ore':[16,16,'Золотая руда'],
    'diamond_ore':[16,16,'Алмазная руда'], 'redstone_ore':[16,16,'Редстоуновая руда'],
    'iron_block':[16,16,'Железный блок'], 'gold_block':[16,16,'Золотой блок'],
    'diamond_block':[16,16,'Алмазный блок'], 'glowstone':[16,16,'Светокамень'],
    'tnt_side':[16,16,'ТНТ (бок)'], 'water_still':[16,16,'Вода'], 'lava_still':[16,16,'Лава']
  },
  items: {
    'stick':[16,16,'Палка'], 'coal':[16,16,'Уголь'], 'iron_ingot':[16,16,'Железный слиток'],
    'gold_ingot':[16,16,'Золотой слиток'], 'diamond':[16,16,'Алмаз'], 'emerald':[16,16,'Изумруд'],
    'redstone':[16,16,'Редстоун'], 'apple':[16,16,'Яблоко'], 'bread':[16,16,'Хлеб'],
    'bone':[16,16,'Кость'], 'feather':[16,16,'Перо'], 'leather':[16,16,'Кожа'],
    'paper':[16,16,'Бумага'], 'book':[16,16,'Книга'], 'egg':[16,16,'Яйцо'],
    'arrow':[16,16,'Стрела'], 'bow':[16,16,'Лук'],
    'diamond_sword':[16,16,'Алмазный меч'], 'iron_sword':[16,16,'Железный меч'],
    'diamond_pickaxe':[16,16,'Алмазная кирка'], 'iron_pickaxe':[16,16,'Железная кирка'],
    'diamond_axe':[16,16,'Алмазный топор'], 'diamond_shovel':[16,16,'Алмазная лопата'],
    'ender_pearl':[16,16,'Эндер-жемчуг'], 'blaze_rod':[16,16,'Огненный стержень']
  },
  armor: {
    'leather_helmet':[16,16,'Кожаный шлем'], 'leather_chestplate':[16,16,'Кожаная куртка'],
    'iron_helmet':[16,16,'Железный шлем'], 'iron_chestplate':[16,16,'Железная кираса'],
    'gold_helmet':[16,16,'Золотой шлем'], 'gold_chestplate':[16,16,'Золотая кираса'],
    'diamond_helmet':[16,16,'Алмазный шлем'], 'diamond_chestplate':[16,16,'Алмазная кираса'],
    'iron_layer_1':[64,32,'Железо (слой 1)'], 'iron_layer_2':[64,32,'Железо (слой 2)'],
    'diamond_layer_1':[64,32,'Алмаз (слой 1)'], 'diamond_layer_2':[64,32,'Алмаз (слой 2)']
  },
  entity: {
    'steve':[64,64,'Стив'], 'zombie':[64,64,'Зомби'], 'skeleton':[64,64,'Скелет'],
    'creeper':[64,64,'Крипер'], 'enderman':[64,64,'Эндермен'], 'spider':[64,64,'Паук'],
    'pig':[64,32,'Свинья'], 'cow':[64,32,'Корова'], 'sheep':[64,32,'Овца'],
    'chicken':[64,32,'Курица'], 'wolf':[64,32,'Волк'], 'villager':[64,64,'Житель'],
    'iron_golem':[128,128,'Железный голем']
  },
  environment: {
    'sun':[32,32,'Солнце'], 'moon_phases':[32,64,'Фазы луны'], 'clouds':[256,256,'Облака'],
    'rain':[64,64,'Дождь'], 'snow':[64,64,'Снег']
  },
  gui: {
    'widgets':[256,256,'Виджеты GUI'], 'icons':[256,256,'Иконки GUI'],
    'hotbar':[182,22,'Хотбар'], 'heart':[9,9,'Сердечко'], 'heart_empty':[9,9,'Пустое сердечко'],
    'container':[256,256,'Контейнер'], 'inventory':[256,256,'Инвентарь']
  },
  font: { 'default':[128,128,'Шрифт по умолчанию'] },
  particle: { 'particles':[128,128,'Частицы'] },
  painting: {
    'kebab':[16,16,'Картина «Кебаб»'], 'wanderer':[16,32,'Картина «Странник»'],
    'bomb':[16,16,'Картина «Бомба»'], 'pool':[32,16,'Картина «Бассейн»'],
    'sea':[32,16,'Картина «Море»'], 'sunset':[32,16,'Картина «Закат»']
  }
};

/* СОСТОЯНИЕ */
const state = {
  pack: { name: 'My Resource Pack', description: '', icon: null, version: '1.8.9' },
  categories: [],
  textures: {},
  activeCategory: null,
  rpLoaded: false,
  selected: new Set(),
  selectedTemplate: null
};
let lastClickedKey = null;
let pendingEditorAfterZip = false;

const versionTreeCache = {};
let librarySource = 'static';

/* УТИЛИТЫ */
const $ = id => document.getElementById(id);

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function renderMCText(text) {
  let html = '', cls = [], color = null;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '§' && i + 1 < text.length) {
      const code = text[i + 1].toLowerCase(); i++;
      if (MC_COLORS[code]) { color = MC_COLORS[code]; cls = []; }
      else if (code === 'l') cls.push('mc-bold');
      else if (code === 'o') cls.push('mc-italic');
      else if (code === 'n') cls.push('mc-underline');
      else if (code === 'm') cls.push('mc-strike');
      else if (code === 'r') { color = null; cls = []; }
      continue;
    }
    const style = color ? `color:${color}` : '';
    html += `<span class="${cls.join(' ')}" style="${style}">${escapeHtml(ch)}</span>`;
  }
  return html;
}
function insertAtCursor(input, text, onChange) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const v = input.value;
  input.value = v.slice(0, start) + text + v.slice(end);
  const pos = start + text.length;
  input.setSelectionRange(pos, pos);
  input.focus();
  input.dispatchEvent(new Event('input'));
  if (onChange) onChange();
}
function buildMCPalette(paletteEl, inputEl, onChange) {
  paletteEl.innerHTML = '';
  ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'].forEach(code => {
    const b = document.createElement('button');
    b.textContent = 'A'; b.style.background = MC_COLORS[code];
    b.title = `§${code}`;
    b.onclick = () => insertAtCursor(inputEl, `§${code}`, onChange);
    paletteEl.appendChild(b);
  });
  [['l','Ж','Жирный'],['o','К','Курсив'],['n','Ч','Подчёркнутый'],['m','З','Зачёркнутый'],['r','С','Сброс']]
    .forEach(([code, letter, title]) => {
      const b = document.createElement('button');
      b.className = 'fmt'; b.textContent = letter;
      b.title = `${title} (§${code})`;
      b.onclick = () => insertAtCursor(inputEl, `§${code}`, onChange);
      paletteEl.appendChild(b);
    });
}
function fileToDataURL(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}
function isImageDataUrl(dataUrl, name) {
  if (typeof dataUrl !== 'string') return false;
  if (/^data:image\//i.test(dataUrl)) return true;
  if (name && /\.png$/i.test(name) && /^data:/i.test(dataUrl)) return true;
  return false;
}
function normalizeDataUrl(dataUrl, name) {
  if (typeof dataUrl !== 'string') return dataUrl;
  if (/^data:image\//i.test(dataUrl)) return dataUrl;
  if (!/^data:/i.test(dataUrl)) return dataUrl;
  if (name && /\.png$/i.test(name)) return dataUrl.replace(/^data:[^;,]*/, 'data:image/png');
  return dataUrl;
}
function isTextFile(name) { return /\.(properties|txt|json|mcmeta|cfg|lang)$/i.test(name); }
function textDataUrlToText(dataUrl) {
  const idx = dataUrl.indexOf(',');
  if (idx < 0) return '';
  const head = dataUrl.slice(0, idx);
  const body = dataUrl.slice(idx + 1);
  if (head.includes(';base64')) {
    try {
      const bin = atob(body);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder('utf-8').decode(bytes);
    } catch { return ''; }
  }
  try { return decodeURIComponent(body); } catch { return ''; }
}
function textToDataUrl(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return 'data:text/plain;base64,' + btoa(bin);
}
function setStatus(text, kind) {
  const el = $('load-status');
  if (!el) return;
  if (!text) { el.hidden = true; el.innerHTML = ''; return; }
  el.hidden = false;
  el.className = 'load-status' + (kind ? ' ' + kind : '');
  const spin = kind === 'loading' ? '<div class="spin"></div>' : '';
  el.innerHTML = spin + `<span>${escapeHtml(text)}</span>`;
}
function triggerDownload(href, filename) {
  const a = document.createElement('a');
  a.href = href; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
}

/* ALERT / CONFIRM / PROMPT */
function showAlert(text, opts = {}) {
  return new Promise(resolve => {
    const modal = $('site-alert');
    const icon = $('site-alert-icon');
    icon.textContent = opts.icon || (opts.type === 'error' ? '✕' : opts.type === 'warn' ? '!' : opts.type === 'success' ? '✓' : 'ⓘ');
    icon.className = 'site-alert-icon ' + (opts.type || 'info');
    $('site-alert-title').textContent = opts.title || 'Уведомление';
    $('site-alert-text').textContent = text;
    modal.classList.add('active');
    const close = () => {
      modal.classList.remove('active');
      $('site-alert-ok').removeEventListener('click', close);
      modal.removeEventListener('click', bgClose);
      resolve();
    };
    const bgClose = e => { if (e.target === modal) close(); };
    $('site-alert-ok').addEventListener('click', close);
    modal.addEventListener('click', bgClose);
  });
}
function showConfirm(text, opts = {}) {
  return new Promise(resolve => {
    const modal = $('site-confirm');
    $('site-confirm-title').textContent = opts.title || 'Подтверждение';
    $('site-confirm-text').textContent = text;
    $('site-confirm-ok').textContent = opts.okText || 'ОК';
    $('site-confirm-cancel').textContent = opts.cancelText || 'Отмена';
    modal.classList.add('active');
    const close = val => {
      modal.classList.remove('active');
      $('site-confirm-ok').removeEventListener('click', onOk);
      $('site-confirm-cancel').removeEventListener('click', onCancel);
      modal.removeEventListener('click', bgClose);
      resolve(val);
    };
    const onOk = () => close(true);
    const onCancel = () => close(false);
    const bgClose = e => { if (e.target === modal) close(false); };
    $('site-confirm-ok').addEventListener('click', onOk);
    $('site-confirm-cancel').addEventListener('click', onCancel);
    modal.addEventListener('click', bgClose);
  });
}
function showPrompt(text, defaultValue = '', opts = {}) {
  return new Promise(resolve => {
    const modal = $('site-prompt');
    $('site-prompt-title').textContent = opts.title || 'Ввод';
    $('site-prompt-text').textContent = text;
    const inp = $('site-prompt-input');
    inp.value = defaultValue;
    modal.classList.add('active');
    setTimeout(() => { inp.focus(); inp.select(); }, 60);
    const close = val => {
      modal.classList.remove('active');
      $('site-prompt-ok').removeEventListener('click', onOk);
      $('site-prompt-cancel').removeEventListener('click', onCancel);
      inp.removeEventListener('keydown', onKey);
      modal.removeEventListener('click', bgClose);
      resolve(val);
    };
    const onOk = () => close(inp.value);
    const onCancel = () => close(null);
    const onKey = e => {
      if (e.key === 'Enter') { e.preventDefault(); onOk(); }
      if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
    };
    const bgClose = e => { if (e.target === modal) close(null); };
    $('site-prompt-ok').addEventListener('click', onOk);
    $('site-prompt-cancel').addEventListener('click', onCancel);
    inp.addEventListener('keydown', onKey);
    modal.addEventListener('click', bgClose);
  });
}
/* ПУТИ / КАТЕГОРИИ */
function parseTexPath(p) {
  const path = String(p).replace(/\\/g, '/');
  let m = path.match(/assets\/minecraft\/mcpatcher\/([^/]+)\/(.+)$/i);
  if (m) return { cat: 'mcpatcher/' + m[1], name: m[2] };
  m = path.match(/assets\/minecraft\/textures\/([^/]+)\/(.+)$/i);
  if (!m) return null;
  if (!/\.(png|properties|txt|json|mcmeta|lang)$/i.test(m[2])) return null;
  return { cat: m[1], name: m[2] };
}
function sortCategories() {
  state.categories.sort((a, b) => {
    const ia = CAT_ORDER.indexOf(a.id), ib = CAT_ORDER.indexOf(b.id);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    const ma = a.id.startsWith('mcpatcher/') ? 1 : 0;
    const mb = b.id.startsWith('mcpatcher/') ? 1 : 0;
    if (ma !== mb) return ma - mb;
    return a.id.localeCompare(b.id);
  });
}
function applyImportedTextures(items) {
  state.textures = {};
  state.selected.clear();
  lastClickedKey = null;
  const catSet = new Set();
  let count = 0;
  for (const { path, dataUrl } of items) {
    const parsed = parseTexPath(path);
    if (!parsed) continue;
    const { cat, name } = parsed;
    if (!state.textures[cat]) state.textures[cat] = {};
    state.textures[cat][name] = normalizeDataUrl(dataUrl, name);
    catSet.add(cat);
    count++;
  }
  state.categories = [...catSet].map(id => ({ id, name: catName(id), icon: catIcon(id) }));
  sortCategories();
  state.activeCategory = state.categories[0]?.id || null;
  state.rpLoaded = count > 0;
  updateSelectionToolbar();
  return count;
}

/* GITHUB TREE */
async function fetchVersionTree(version) {
  if (versionTreeCache[version]) return versionTreeCache[version];
  const repo = 'InventivetalentDev/minecraft-assets';
  const url = `https://api.github.com/repos/${repo}/git/trees/${version}?recursive=1`;
  const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const data = await r.json();
  const prefix = 'assets/minecraft/textures/';
  const out = [];
  for (const item of data.tree || []) {
    if (item.type !== 'blob') continue;
    const p = item.path;
    if (!p.startsWith(prefix)) continue;
    if (!/\.png$/i.test(p)) continue;
    const rel = p.slice(prefix.length);
    const slash = rel.indexOf('/');
    let cat, name;
    if (slash < 0) { cat = 'misc'; name = rel; }
    else { cat = rel.slice(0, slash); name = rel.slice(slash + 1); }
    out.push({ cat, name, path: p });
  }
  versionTreeCache[version] = out;
  return out;
}

/* CDN — без проверки protocol, fetch работает и в file:// благодаря CORS * */
async function loadFromCdn(version) {
  setStatus(`Получаю список файлов для ${version}...`, 'loading');
  let tree;
  try {
    tree = await fetchVersionTree(version);
  } catch (e) {
    setStatus(`Не удалось получить список (${version}): ${e.message}`, 'error');
    await showAlert('Не удалось получить список текстур с GitHub: ' + e.message, { type: 'error', title: 'Ошибка CDN' });
    return false;
  }
  if (!tree.length) {
    setStatus(`Для версии ${version} не найдено PNG.`, 'error');
    return false;
  }
  const repo = 'InventivetalentDev/minecraft-assets';
  const rawBase = `https://raw.githubusercontent.com/${repo}/${version}/`;
  state.textures = {};
  state.categories = [];
  state.selected.clear();
  lastClickedKey = null;
  const catSet = new Set();
  const total = tree.length;
  let done = 0;
  const queue = tree.slice();
  const CONCURRENCY = 100;
  async function worker() {
    while (queue.length) {
      const item = queue.shift();
      if (!item) break;
      try {
        const r = await fetch(rawBase + item.path, { cache: 'force-cache' });
        if (!r.ok) { done++; continue; }
        const buf = await r.arrayBuffer();
        const blob = new Blob([buf], { type: 'image/png' });
        const dataUrl = await Storage.blobToDataURL(blob, 'image/png');
        if (!state.textures[item.cat]) state.textures[item.cat] = {};
        state.textures[item.cat][item.name] = dataUrl;
        catSet.add(item.cat);
      } catch (err) { console.warn('Fetch failed:', item.path, err); }
      done++;
      if (done === 1 || done % 50 === 0 || done === total) {
        setStatus(`Скачано ${done} / ${total} (${version})...`, 'loading');
      }
    }
  }
  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) workers.push(worker());
  await Promise.all(workers);
  state.categories = [...catSet].map(id => ({ id, name: catName(id), icon: catIcon(id) }));
  sortCategories();
  state.activeCategory = state.categories[0]?.id || null;
  state.rpLoaded = Object.keys(state.textures).length > 0;
  updateSelectionToolbar();
  setStatus(`✅ Загружено ${done} файлов · ${state.categories.length} категорий из Minecraft ${version}`, 'ok');
  return true;
}

/* ИМПОРТ */
async function loadFromZip(file) {
  setStatus('Распаковываю .zip...', 'loading');
  try {
    const data = await Storage.importPack(file);
    const items = [];
    for (const cat of Object.keys(data.textures)) {
      for (const name of Object.keys(data.textures[cat])) {
        let path;
        if (cat.startsWith('mcpatcher/')) path = `assets/minecraft/${cat}/${name}`;
        else path = `assets/minecraft/textures/${cat}/${name}`;
        items.push({ path, dataUrl: data.textures[cat][name] });
      }
    }
    const count = applyImportedTextures(items);
    if (data.pack.description) { state.pack.description = data.pack.description; $('pack-desc').value = data.pack.description; updateDescPreview(); }
    if (data.pack.icon) { state.pack.icon = data.pack.icon; $('icon-preview').src = data.pack.icon; $('icon-drop').classList.add('has-image'); }
    const name = file.name.replace(/\.zip$/i, '');
    if (name) { state.pack.name = name; $('pack-name').value = name; updateNamePreview(); }
    setStatus(`✅ Импортировано ${count} файлов`, 'ok');
  } catch (err) { console.error(err); setStatus('Ошибка импорта: ' + err.message, 'error'); }
}
async function loadFromFolder(files) {
  setStatus('Сканирую папку...', 'loading');
  const texFiles = [];
  let mcmetaFile = null, packPngFile = null;
  for (const f of files) {
    const rel = (f.webkitRelativePath || f.name).replace(/\\/g, '/');
    if (/assets\/minecraft\/textures\/.+\.(png|properties|txt|json)$/i.test(rel)) texFiles.push(f);
    else if (/assets\/minecraft\/mcpatcher\/.+/i.test(rel)) texFiles.push(f);
    else if (/(^|\/)pack\.mcmeta$/i.test(rel)) mcmetaFile = f;
    else if (/(^|\/)pack\.png$/i.test(rel)) packPngFile = f;
  }
  if (!texFiles.length) { setStatus('Не найдено ни одного файла.', 'error'); return; }
  const items = [];
  const CHUNK = 80;
  for (let i = 0; i < texFiles.length; i += CHUNK) {
    const chunk = texFiles.slice(i, i + CHUNK);
    const results = await Promise.all(chunk.map(async f => {
      const rel = (f.webkitRelativePath || f.name).replace(/\\/g, '/');
      const idx = rel.indexOf('assets/');
      const assetPath = idx >= 0 ? rel.slice(idx) : rel;
      return { path: assetPath, dataUrl: await fileToDataURL(f) };
    }));
    items.push(...results);
    setStatus(`Загружаю... ${Math.min(i + CHUNK, texFiles.length)} / ${texFiles.length}`, 'loading');
  }
  const count = applyImportedTextures(items);
  if (mcmetaFile) {
    try { const j = JSON.parse(await mcmetaFile.text()); if (j?.pack?.description) { state.pack.description = String(j.pack.description); $('pack-desc').value = state.pack.description; updateDescPreview(); } } catch (e) {}
  }
  if (packPngFile) { const url = await fileToDataURL(packPngFile); state.pack.icon = url; $('icon-preview').src = url; $('icon-drop').classList.add('has-image'); }
  const firstRel = (files[0]?.webkitRelativePath || '').replace(/\\/g, '/');
  const rootName = firstRel.split('/')[0];
  if (rootName) { state.pack.name = rootName; $('pack-name').value = rootName; updateNamePreview(); }
  setStatus(`✅ Загружено ${count} файлов`, 'ok');
}

/* HOME */
const homeNameInput = $('pack-name');
const homeDescInput = $('pack-desc');
function updateNamePreview() {
  $('name-preview').innerHTML = homeNameInput.value ? renderMCText(homeNameInput.value) : '';
  state.pack.name = homeNameInput.value || 'My Resource Pack';
}
function updateDescPreview() {
  $('desc-preview').innerHTML = homeDescInput.value ? renderMCText(homeDescInput.value) : '';
  state.pack.description = homeDescInput.value;
}
homeNameInput.addEventListener('input', updateNamePreview);
homeDescInput.addEventListener('input', updateDescPreview);
buildMCPalette($('name-mc-colors'), homeNameInput, updateNamePreview);
buildMCPalette($('desc-mc-colors'), homeDescInput, updateDescPreview);
updateNamePreview();
updateDescPreview();

/* ВЫБОР ВЕРСИИ — простой, работает от .ver-select */
(function populateVersions() {
  const wrap = document.getElementById('ver-select');
  const btn = document.getElementById('ver-select-btn');
  const list = document.getElementById('ver-select-list');
  const label = document.getElementById('ver-select-label');
  if (!wrap || !btn || !list || !label) { console.warn('[ver-select] нет элементов'); return; }

  const versions = (typeof MC_VERSIONS !== 'undefined' && Array.isArray(MC_VERSIONS) && MC_VERSIONS.length)
    ? MC_VERSIONS
    : ['1.8.9','1.9.4','1.10.2','1.11.2','1.12.2','1.13.2','1.14.4','1.15.2',
       '1.16.5','1.17.1','1.18.2','1.19.4','1.20.1','1.20.4','1.20.6',
       '1.21.1','1.21.4','1.21.5','1.21.6','1.21.7','1.21.8','1.21.9','1.21.10','1.21.11',
       '26.1','26.2','26.3'];

  label.textContent = state.pack.version;
  list.innerHTML = '';

  versions.forEach(v => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ver-option' + (v === state.pack.version ? ' active' : '');
    b.textContent = v;
    b.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      state.pack.version = v;
      label.textContent = v;
      const tag = document.getElementById('ver-tag');
      if (tag) tag.textContent = v;
      list.querySelectorAll('.ver-option').forEach(el => el.classList.toggle('active', el.textContent === v));
      wrap.classList.remove('open');
      if (state.selectedTemplate === 'cdn' && typeof updateCdnDesc === 'function') updateCdnDesc();
      if (typeof updateLibraryCountBadge === 'function') updateLibraryCountBadge();
    });
    list.appendChild(b);
  });

  btn.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    wrap.classList.toggle('open');
    if (wrap.classList.contains('open')) {
      const active = list.querySelector('.ver-option.active');
      if (active) requestAnimationFrame(() => { try { active.scrollIntoView({ block: 'nearest' }); } catch {} });
    }
  });

  document.addEventListener('click', e => {
    if (!wrap.classList.contains('open')) return;
    if (wrap.contains(e.target)) return;
    wrap.classList.remove('open');
  });

  // Скролл: закрываем только если скролл НЕ внутри списка
  window.addEventListener('scroll', e => {
    if (!wrap.classList.contains('open')) return;
    if (e.target === list || (e.target && e.target.nodeType === 1 && list.contains(e.target))) return;
    wrap.classList.remove('open');
  }, { passive: true, capture: true });
})();

function updateCdnDesc() {
  const el = $('tpl-cdn-desc');
  if (!el) return;
  el.textContent = `Все текстуры MC ${state.pack.version}`;
}

/* ИКОНКА */
const iconDrop = $('icon-drop');
const iconInput = $('icon-input');
iconDrop.addEventListener('click', () => iconInput.click());
iconInput.addEventListener('change', e => { const f = e.target.files[0]; if (f) loadIcon(f); e.target.value = ''; });
iconDrop.addEventListener('drop', e => {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f && f.type === 'image/png') loadIcon(f);
});
['dragenter','dragover'].forEach(ev => iconDrop.addEventListener(ev, e => { e.preventDefault(); iconDrop.classList.add('drag'); }));
['dragleave','drop'].forEach(ev => iconDrop.addEventListener(ev, e => { e.preventDefault(); iconDrop.classList.remove('drag'); }));
function loadIcon(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, 128, 128);
      const url = c.toDataURL('image/png');
      state.pack.icon = url;
      $('icon-preview').src = url;
      iconDrop.classList.add('has-image');
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* ШАБЛОНЫ */
function selectTemplate(tpl) {
  state.selectedTemplate = tpl;
  document.querySelectorAll('.tpl-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.tpl === tpl);
  });
  const genBtn = $('btn-generate');
  if (genBtn) {
    genBtn.disabled = false;
    const labels = { empty: '⚙️ Создать пустой', cdn: '☁️ Скачать с CDN', zip: '🗜️ Импортировать .zip' };
    genBtn.textContent = labels[tpl] || '⚙️ Сгенерировать';
  }
  if (tpl === 'cdn') updateCdnDesc();
}
document.querySelectorAll('.tpl-card').forEach(card => {
  card.addEventListener('click', () => selectTemplate(card.dataset.tpl));
});

$('zip-input').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  await loadFromZip(f);
  setStatus('✅ .zip импортирован — теперь «Открыть редактор»', 'ok');
});

$('btn-generate').addEventListener('click', async () => {
  const tpl = state.selectedTemplate;
  if (!tpl) { await showAlert('Сначала выбери шаблон', { type: 'info', title: 'Шаблон не выбран' }); return; }
  const nameVal = homeNameInput.value.trim();
  if (!nameVal) { await showAlert('Введи название пакета', { type: 'warn' }); homeNameInput.focus(); return; }
  state.pack.name = nameVal;
  state.pack.description = homeDescInput.value;
  const btn = $('btn-generate');
  const orig = btn.textContent;

  if (tpl === 'empty') {
    state.textures = {};
    state.categories = DEFAULT_CATEGORIES.map(c => ({ ...c }));
    state.categories.forEach(c => state.textures[c.id] = {});
    state.activeCategory = 'blocks';
    state.rpLoaded = false;
    state.selected.clear();
    updateSelectionToolbar();
    setStatus('✅ Пустой пакет готов — теперь «Открыть редактор»', 'ok');
    return;
  }
  if (tpl === 'cdn') {
    btn.disabled = true;
    btn.textContent = '⏳ Загружаю...';
    try {
      const ok = await loadFromCdn(state.pack.version);
      if (ok) setStatus('✅ Текстуры загружены — теперь «Открыть редактор»', 'ok');
    } finally {
      btn.disabled = false;
      btn.textContent = orig;
    }
    return;
  }
  if (tpl === 'zip') { pendingEditorAfterZip = false; $('zip-input').click(); return; }
});

$('btn-create').addEventListener('click', async () => {
  const nameVal = homeNameInput.value.trim();
  if (!nameVal) { await showAlert('Введи название пакета', { type: 'warn' }); homeNameInput.focus(); return; }
  state.pack.name = nameVal;
  state.pack.description = homeDescInput.value;
  enterEditor();
});

/* DRAG & DROP */
const dropOverlay = $('drop-overlay');
let dragCounter = 0;
document.addEventListener('dragenter', e => { if (!e.dataTransfer.types.includes('Files')) return; dragCounter++; dropOverlay.classList.add('active'); });
document.addEventListener('dragleave', () => { dragCounter--; if (dragCounter <= 0) { dragCounter = 0; dropOverlay.classList.remove('active'); } });
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', async e => {
  e.preventDefault(); dragCounter = 0; dropOverlay.classList.remove('active');
  if (e.target.closest('#icon-drop')) return;
  if (e.target.closest('.modal')) return;
  const files = [...e.dataTransfer.files];
  if (files.length > 0 && /\.zip$/i.test(files[0].name)) { await loadFromZip(files[0]); return; }
  const items = e.dataTransfer.items;
  if (!items || !items.length) return;
  const first = items[0].webkitGetAsEntry?.();
  if (!first) {
    if (files.length && /\.png$/i.test(files[0].name)) return;
    await loadFromFolder(files);
    return;
  }
  setStatus('Сканирую папку...', 'loading');
  const folderFiles = await readEntry(first);
  if (!folderFiles.length) { setStatus('Пустая папка', 'error'); return; }
  await loadFromFolder(folderFiles);
});
async function readEntry(entry, prefix = '') {
  if (entry.isFile) {
    return new Promise(resolve => {
      entry.file(file => {
        try { Object.defineProperty(file, 'webkitRelativePath', { value: prefix + file.name, configurable: true }); } catch (e) {}
        resolve([file]);
      }, () => resolve([]));
    });
  }
  if (entry.isDirectory) {
    const reader = entry.createReader();
    const all = [];
    while (true) {
      const entries = await new Promise(res => reader.readEntries(res, () => res([])));
      if (!entries.length) break;
      for (const e of entries) { const sub = await readEntry(e, prefix + entry.name + '/'); all.push(...sub); }
    }
    return all;
  }
  return [];
}

/* ВЫДЕЛЕНИЕ */
function keyOf(cat, name) { return cat + '::' + name; }
function parseKey(key) { const idx = key.indexOf('::'); return { cat: key.slice(0, idx), name: key.slice(idx + 2) }; }
function toggleSelect(cat, name) {
  const k = keyOf(cat, name);
  if (state.selected.has(k)) state.selected.delete(k);
  else state.selected.add(k);
  lastClickedKey = k;
}
function clearSelection() { state.selected.clear(); lastClickedKey = null; renderTextures(); updateSelectionToolbar(); }
function selectAllInCategory() {
  const cat = state.activeCategory;
  if (!cat || !state.textures[cat]) return;
  for (const name of Object.keys(state.textures[cat])) state.selected.add(keyOf(cat, name));
  renderTextures(); updateSelectionToolbar();
}
function updateSelectionToolbar() {
  const tb = $('selection-toolbar'), cnt = $('st-count');
  const n = state.selected.size;
  tb.hidden = n === 0;
  if (n > 0) cnt.textContent = n;
}
function makeDuplicateName(cat, name) {
  const dotIdx = name.lastIndexOf('.');
  const base = dotIdx > 0 ? name.slice(0, dotIdx) : name;
  const ext = dotIdx > 0 ? name.slice(dotIdx) : '';
  let candidate = `${base}_copy${ext}`;
  let i = 1;
  while (state.textures[cat][candidate]) { i++; candidate = `${base}_copy${i}${ext}`; }
  return candidate;
}
function duplicateOne(cat, name) {
  if (!state.textures[cat] || !state.textures[cat][name]) return null;
  const newName = makeDuplicateName(cat, name);
  state.textures[cat][newName] = state.textures[cat][name];
  return newName;
}
function duplicateMany(keys) {
  const created = [];
  for (const k of keys) {
    const { cat, name } = parseKey(k);
    if (!state.textures[cat] || !state.textures[cat][name]) continue;
    const newName = duplicateOne(cat, name);
    if (newName) created.push({ cat, name: newName });
  }
  return created;
}
function deleteMany(keys) {
  for (const k of keys) {
    const { cat, name } = parseKey(k);
    if (state.textures[cat] && state.textures[cat][name]) delete state.textures[cat][name];
  }
}
function downloadOne(cat, name) {
  const dataUrl = state.textures[cat]?.[name];
  if (!dataUrl) return;
  triggerDownload(dataUrl, name);
}
async function downloadMany(keys) {
  const items = [];
  for (const k of keys) {
    const { cat, name } = parseKey(k);
    const dataUrl = state.textures[cat]?.[name];
    if (!dataUrl) continue;
    items.push({ cat, name, dataUrl });
  }
  if (!items.length) return;
  if (items.length === 1) { triggerDownload(items[0].dataUrl, items[0].name); return; }
  setStatus(`Готовлю архив из ${items.length} файлов...`, 'loading');
  const sameCat = items.every(it => it.cat === items[0].cat);
  const zipItems = items.map(it => ({ name: sameCat ? it.name : `${it.cat}/${it.name}`, dataUrl: it.dataUrl }));
  await Storage.exportSelected(zipItems, 'rp_textures.zip');
  setStatus(`✅ Скачано ${items.length} файлов`, 'ok');
  setTimeout(() => setStatus(''), 2500);
}

/* EDITOR */
function enterEditor() {
  $('home-screen').classList.remove('active');
  $('editor-screen').classList.add('active');
  $('editor-title').innerHTML = renderMCText(state.pack.name);
  if (!state.categories.length) {
    state.categories = DEFAULT_CATEGORIES.map(c => ({ ...c }));
    state.categories.forEach(c => state.textures[c.id] = {});
    state.activeCategory = 'blocks';
  }
  if (!state.categories.find(c => c.id === state.activeCategory)) {
    state.activeCategory = state.categories[0]?.id || null;
  }
  renderCategories(); renderTextures(); updateSelectionToolbar();
}
$('btn-back').addEventListener('click', () => {
  $('editor-screen').classList.remove('active');
  $('home-screen').classList.add('active');
});
$('btn-export').addEventListener('click', async () => {
  const btn = $('btn-export');
  const orig = btn.textContent;
  btn.disabled = true; btn.textContent = '⏳ Собираю...';
  try {
    const t0 = performance.now();
    const count = await Storage.exportPack(state, (done, total, pct) => {
      if (pct > 0) btn.textContent = `⏳ ${Math.round(pct)}%`;
      else btn.textContent = `⏳ ${done}/${total}`;
    });
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (count === 0) await showAlert('В паке нет файлов.', { type: 'warn' });
    else { setStatus(`✅ Скачано ${count} файлов за ${dt} сек`, 'ok'); setTimeout(() => setStatus(''), 4000); }
  } catch (err) {
    console.error(err);
    await showAlert('Ошибка: ' + err.message, { type: 'error', title: 'Ошибка экспорта' });
  } finally {
    btn.disabled = false; btn.textContent = orig;
  }
});
function renderCategories() {
  const ul = $('categories');
  ul.innerHTML = '';
  if (!state.categories.length) {
    const li = document.createElement('li');
    li.innerHTML = '<span class="cat-name" style="color:#6b7280;font-style:italic">Нет категорий</span>';
    ul.appendChild(li); return;
  }
  state.categories.forEach(cat => {
    const li = document.createElement('li');
    if (cat.id === state.activeCategory) li.classList.add('active');
    const count = Object.keys(state.textures[cat.id] || {}).length;
    li.innerHTML = `<span class="cat-icon">${cat.icon}</span><span class="cat-name">${escapeHtml(cat.name)}</span><span class="cat-count">${count}</span>`;
    li.onclick = () => { state.activeCategory = cat.id; renderCategories(); renderTextures(); };
    ul.appendChild(li);
  });
}
$('btn-add-cat').addEventListener('click', async () => {
  const name = await showPrompt('Название категории (латиницей, без пробелов):', '', { title: 'Новая категория' });
  if (!name) return;
  const id = name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_\/]/g, '');
  if (!id) { await showAlert('Некорректное название', { type: 'warn' }); return; }
  if (state.categories.find(c => c.id === id)) { await showAlert('Такая категория уже есть', { type: 'warn' }); return; }
  state.categories.push({ id, name: catName(id), icon: catIcon(id) });
  sortCategories();
  state.textures[id] = {};
  state.activeCategory = id;
  renderCategories(); renderTextures();
});

/* ВИРТУАЛИЗАЦИЯ СЕТКИ */
const VS = {
  columns: 1, cardWidth: 128, cardHeight: 165, rowHeight: 181, gap: 16,
  totalRows: 0, visibleStart: -1, visibleEnd: -1,
  names: [], catId: null, scrollBound: false, rafPending: false
};
function ensureScrollBinding() {
  if (VS.scrollBound) return;
  VS.scrollBound = true;
  const content = $('content-area');
  content.addEventListener('scroll', () => {
    if (VS.rafPending) return;
    VS.rafPending = true;
    requestAnimationFrame(() => { VS.rafPending = false; renderVirtualRange(false); });
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (!VS.names.length) return;
    recomputeVirtualLayout(); VS.visibleStart = -1; renderVirtualRange(true);
  });
}
function recomputeVirtualLayout() {
  const grid = $('texture-grid');
  const w = grid.clientWidth || 800;
  const gap = 16, minW = 128;
  const cols = Math.max(1, Math.floor((w + gap) / (minW + gap)));
  const cardW = (w - (cols - 1) * gap) / cols;
  const cardH = cardW + 39;
  const rowH = cardH + gap;
  VS.columns = cols; VS.cardWidth = cardW; VS.cardHeight = cardH; VS.rowHeight = rowH; VS.gap = gap;
  VS.totalRows = Math.ceil(VS.names.length / cols);
  grid.style.height = (VS.totalRows * rowH - gap) + 'px';
}
function createTexCard(catId, name, dataUrl) {
  const img = isImageDataUrl(dataUrl, name);
  const k = keyOf(catId, name);
  const isSelected = state.selected.has(k);
  const card = document.createElement('div');
  card.className = 'tex-card' + (isSelected ? ' selected' : '');
  card.dataset.key = k;
  const inner = img ? `<img src="${dataUrl}" alt="" loading="lazy" decoding="async">` : `<div class="file-ico">📄</div>`;
  card.innerHTML = `
    <button class="tex-check" title="Выбрать">✓</button>
    <div class="tex-actions">
      <button class="tex-dl"  title="Скачать">📥</button>
      <button class="tex-dup" title="Дублировать">📋</button>
      <button class="tex-del danger" title="Удалить">✕</button>
    </div>
    <div class="tex-thumb">${inner}</div>
    <div class="tex-name" title="${escapeHtml(name)}">${escapeHtml(name)}</div>`;

  card.addEventListener('click', e => {
    if (e.target.closest('.tex-check') || e.target.closest('.tex-actions')) return;
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); toggleSelect(catId, name); renderTextures(); updateSelectionToolbar(); return; }
    if (e.shiftKey && lastClickedKey) {
      const { cat: lastCat, name: last } = parseKey(lastClickedKey);
      if (lastCat === catId) {
        const allNames = Object.keys(state.textures[catId]).sort();
        const a = allNames.indexOf(last);
        const b = allNames.indexOf(name);
        if (a >= 0 && b >= 0) {
          const [lo, hi] = a < b ? [a, b] : [b, a];
          for (let i = lo; i <= hi; i++) state.selected.add(keyOf(catId, allNames[i]));
        }
        renderTextures(); updateSelectionToolbar(); return;
      }
    }
    lastClickedKey = k;
    if (img) openPainter(catId, name, dataUrl);
    else if (isTextFile(name)) openTextEditor(catId, name, dataUrl);
  });
  card.querySelector('.tex-check').addEventListener('click', e => { e.stopPropagation(); toggleSelect(catId, name); renderTextures(); updateSelectionToolbar(); });
  card.querySelector('.tex-dl').addEventListener('click', e => { e.stopPropagation(); downloadOne(catId, name); });
  card.querySelector('.tex-dup').addEventListener('click', e => {
    e.stopPropagation();
    const created = duplicateOne(catId, name);
    if (created) {
      renderCategories(); renderTextures();
      requestAnimationFrame(() => {
        const el = document.querySelector(`.tex-card[data-key="${CSS.escape(keyOf(catId, created))}"]`);
        if (el) { el.classList.add('adding'); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); setTimeout(() => el.classList.remove('adding'), 500); }
      });
    }
  });
  card.querySelector('.tex-del').addEventListener('click', async e => {
    e.stopPropagation();
    if (await showConfirm(`Удалить "${name}"?`, { title: 'Удаление текстуры', okText: 'Удалить' })) {
      delete state.textures[catId][name];
      state.selected.delete(k);
      renderCategories(); renderTextures(); updateSelectionToolbar();
    }
  });
  return card;
}
function renderVirtualRange(force) {
  if (!VS.names.length) return;
  const grid = $('texture-grid');
  const content = $('content-area');
  const scrollTop = content.scrollTop, viewH = content.clientHeight, gridTop = grid.offsetTop;
  const localTop = Math.max(0, scrollTop - gridTop);
  const localBottom = localTop + viewH;
  const buffer = 3;
  let startRow = Math.max(0, Math.floor(localTop / VS.rowHeight) - buffer);
  let endRow = Math.min(VS.totalRows - 1, Math.ceil(localBottom / VS.rowHeight) + buffer);
  if (endRow < startRow) endRow = startRow;
  if (!force && startRow === VS.visibleStart && endRow === VS.visibleEnd) return;
  VS.visibleStart = startRow; VS.visibleEnd = endRow;
  const startIdx = startRow * VS.columns;
  const endIdx = Math.min(VS.names.length, (endRow + 1) * VS.columns);
  const catId = VS.catId;
  const files = state.textures[catId] || {};
  const frag = document.createDocumentFragment();
  for (let i = startIdx; i < endIdx; i++) {
    const name = VS.names[i];
    const col = i % VS.columns, row = Math.floor(i / VS.columns);
    const x = col * (VS.cardWidth + VS.gap);
    const y = row * VS.rowHeight;
    const card = createTexCard(catId, name, files[name]);
    card.style.position = 'absolute';
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.style.width = VS.cardWidth + 'px';
    frag.appendChild(card);
  }
  grid.innerHTML = ''; grid.appendChild(frag);
}
function renderTextures() {
  const grid = $('texture-grid'), empty = $('empty-state');
  const cat = state.categories.find(c => c.id === state.activeCategory);
  $('cat-title').textContent = cat ? cat.name : '—';
  if (!cat) { grid.innerHTML = ''; grid.style.height = '0px'; empty.hidden = false; VS.names = []; VS.catId = null; VS.visibleStart = -1; VS.visibleEnd = -1; return; }
  const files = state.textures[cat.id] || {};
  const names = Object.keys(files).sort();
  if (!names.length) { grid.innerHTML = ''; grid.style.height = '0px'; empty.hidden = false; VS.names = []; VS.catId = null; VS.visibleStart = -1; VS.visibleEnd = -1; return; }
  empty.hidden = true;
  VS.names = names; VS.catId = cat.id; VS.visibleStart = -1; VS.visibleEnd = -1;
  ensureScrollBinding(); recomputeVirtualLayout(); renderVirtualRange(true);
}

$('st-clear').addEventListener('click', clearSelection);
$('st-delete').addEventListener('click', async () => {
  const n = state.selected.size;
  if (n === 0) return;
  if (!await showConfirm(`Удалить ${n} текстур?`, { title: 'Удаление', okText: 'Удалить' })) return;
  deleteMany(state.selected);
  state.selected.clear(); lastClickedKey = null;
  renderCategories(); renderTextures(); updateSelectionToolbar();
});
$('st-duplicate').addEventListener('click', () => {
  const n = state.selected.size;
  if (n === 0) return;
  const keys = [...state.selected];
  const created = duplicateMany(keys);
  renderCategories(); renderTextures(); updateSelectionToolbar();
  setStatus(`✅ Дублировано ${created.length} текстур`, 'ok');
  setTimeout(() => setStatus(''), 2500);
});
$('st-download').addEventListener('click', async () => {
  const n = state.selected.size;
  if (n === 0) return;
  await downloadMany([...state.selected]);
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('editor-screen').classList.contains('active')) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'Escape' && state.selected.size > 0) clearSelection();
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') { e.preventDefault(); selectAllInCategory(); }
});
$('content-area').addEventListener('click', e => {
  if (state.selected.size === 0) return;
  if (e.target.closest('.tex-card') || e.target.closest('.selection-toolbar') || e.target.closest('.content-header')) return;
  clearSelection();
});

/* TEXT EDITOR */
const textModal = $('text-modal');
let textContext = { cat: null, name: null };
function openTextEditor(cat, name, dataUrl) {
  textContext = { cat, name };
  $('text-filename').value = name;
  $('text-content').value = textDataUrlToText(dataUrl);
  textModal.classList.add('active');
  setTimeout(() => $('text-content').focus(), 50);
}
function closeTextEditor() { textModal.classList.remove('active'); textContext = { cat: null, name: null }; }
$('text-cancel').addEventListener('click', closeTextEditor);
textModal.addEventListener('click', e => { if (e.target === textModal) closeTextEditor(); });
$('text-save').addEventListener('click', () => {
  let name = $('text-filename').value.trim();
  if (!name) { showAlert('Введи имя', { type: 'warn' }); return; }
  const content = $('text-content').value;
  const dataUrl = textToDataUrl(content);
  const cat = textContext.cat;
  if (!state.textures[cat]) state.textures[cat] = {};
  if (textContext.name !== name) { delete state.textures[cat][textContext.name]; state.selected.delete(keyOf(cat, textContext.name)); }
  state.textures[cat][name] = dataUrl;
  closeTextEditor(); renderCategories(); renderTextures(); updateSelectionToolbar();
});
document.addEventListener('keydown', e => {
  if (!textModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeTextEditor();
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); $('text-save').click(); }
});

/* NEW TEXTURE */
const newtexModal = $('newtex-modal');
let newtexActiveTab = 'create';
let libraryActiveCat = null;

function openNewTextureModal() {
  if (!state.activeCategory) { showAlert('Сначала выбери категорию', { type: 'warn' }); return; }
  $('newtex-name').value = '';
  $('newtex-w').value = 16; $('newtex-h').value = 16;
  $('newtex-search').value = '';
  $('newtex-use-file').checked = false;
  $('newtex-file-field').hidden = true;
  $('newtex-file').value = '';
  $('newtex-file-hint').textContent = 'Файл не выбран';
  $('newtex-size-field').style.opacity = '1';
  $('newtex-size-field').style.pointerEvents = 'auto';
  libraryActiveCat = null;
  updateLibraryCountBadge();
  switchPickerTab('create');
  newtexModal.classList.add('active');
}
function closeNewTextureModal() { newtexModal.classList.remove('active'); }
function switchPickerTab(tab) {
  newtexActiveTab = tab;
  document.querySelectorAll('.picker-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  const pc = $('newtex-panel-create'), pl = $('newtex-panel-library');
  if (tab === 'create') {
    pc.hidden = false; pc.style.display = 'flex'; pl.hidden = true; pl.style.display = 'none';
    setTimeout(() => $('newtex-name').focus(), 60);
  } else {
    pc.hidden = true; pc.style.display = 'none'; pl.hidden = false; pl.style.display = 'flex';
    renderLibrary();
    setTimeout(() => $('newtex-search').focus(), 60);
  }
}
function updateLibraryCountBadge() {
  const badge = $('newtex-library-count');
  if (badge) badge.textContent = `Текстуры MC ${state.pack.version}`;
}

$('newtex-use-file').addEventListener('change', e => {
  const on = e.target.checked;
  $('newtex-file-field').hidden = !on;
  $('newtex-size-field').style.opacity = on ? '0.4' : '1';
  $('newtex-size-field').style.pointerEvents = on ? 'none' : 'auto';
});
$('newtex-file').addEventListener('change', e => {
  const f = e.target.files[0];
  const hint = $('newtex-file-hint');
  if (!f) { hint.textContent = 'Файл не выбран'; return; }
  hint.textContent = `${f.name} · ${Math.round(f.size/1024)} KB`;
  if (!$('newtex-name').value.trim()) {
    let n = f.name;
    if (!/\.png$/i.test(n)) n += '.png';
    $('newtex-name').value = n;
  }
});

/* БИБЛИОТЕКА — работает и в file:// */
async function renderLibrary() {
  const version = state.pack.version;
  const list = $('newtex-list');
  if (versionTreeCache[version]) { librarySource = 'cdn'; renderLibraryCats(); renderLibraryGrid(); return; }
  list.innerHTML = `<div class="library-loading"><div class="spin"></div><div>Загружаю список текстур Minecraft ${escapeHtml(version)}...</div></div>`;
  $('newtex-lib-cats').innerHTML = '';
  $('newtex-count').textContent = '...';
  try {
    await fetchVersionTree(version);
    librarySource = 'cdn';
  } catch (e) {
    console.warn('CDN tree failed, falling back to static', e);
    librarySource = 'static';
  }
  renderLibraryCats(); renderLibraryGrid();
}
function renderLibraryCats() {
  const wrap = $('newtex-lib-cats');
  wrap.innerHTML = '';
  const all = getAllLibraryItems();
  const byCat = {};
  for (const t of all) byCat[t.cat] = (byCat[t.cat] || 0) + 1;
  const totalAll = all.length;
  const allBtn = document.createElement('button');
  allBtn.className = 'lib-cat' + (libraryActiveCat === null ? ' active' : '');
  allBtn.type = 'button';
  allBtn.innerHTML = `★ Все <span class="lc-count">${totalAll}</span>`;
  allBtn.onclick = () => { libraryActiveCat = null; renderLibraryCats(); renderLibraryGrid(); };
  wrap.appendChild(allBtn);
  Object.keys(byCat).sort((a, b) => {
    const ia = CAT_ORDER.indexOf(a), ib = CAT_ORDER.indexOf(b);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return a.localeCompare(b);
  }).forEach(catId => {
    const cat = state.categories.find(c => c.id === catId) || { id: catId, icon: catIcon(catId), name: catName(catId) };
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lib-cat' + (libraryActiveCat === catId ? ' active' : '');
    btn.innerHTML = `${cat.icon} ${cat.name} <span class="lc-count">${byCat[catId]}</span>`;
    btn.onclick = () => { libraryActiveCat = catId; renderLibraryCats(); renderLibraryGrid(); };
    wrap.appendChild(btn);
  });
}
function getAllLibraryItems() {
  const version = state.pack.version;
  if (librarySource === 'cdn' && versionTreeCache[version]) {
    return versionTreeCache[version].map(t => ({
      cat: t.cat, name: t.name.replace(/\.png$/i, ''),
      w: 0, h: 0, ru: '', cdnPath: t.path
    }));
  }
  const all = [];
  for (const catId of Object.keys(TEXTURE_LIBRARY)) {
    const cat = TEXTURE_LIBRARY[catId];
    for (const name of Object.keys(cat)) {
      const [w, h, ru] = cat[name];
      all.push({ cat: catId, name, w, h, ru: ru || '' });
    }
  }
  return all;
}
function renderLibraryGrid() {
  const list = $('newtex-list');
  const search = $('newtex-search').value.trim().toLowerCase();
  const counter = $('newtex-count');
  let filtered = getAllLibraryItems();
  if (libraryActiveCat) filtered = filtered.filter(t => t.cat === libraryActiveCat);
  if (search) filtered = filtered.filter(t => t.name.toLowerCase().includes(search) || (t.ru && t.ru.toLowerCase().includes(search)));
  counter.textContent = filtered.length;
  if (!filtered.length) { list.innerHTML = `<div class="existing-empty"><span class="ee-icon">🔍</span><p>Ничего не найдено.</p></div>`; return; }
  const groups = {};
  for (const t of filtered) { if (!groups[t.cat]) groups[t.cat] = []; groups[t.cat].push(t); }
  const sortedCats = Object.keys(groups).sort((a, b) => {
    const ia = CAT_ORDER.indexOf(a), ib = CAT_ORDER.indexOf(b);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return a.localeCompare(b);
  });
  list.innerHTML = '';
  for (const catId of sortedCats) {
    const items = groups[catId].sort((a, b) => a.name.localeCompare(b.name));
    const cat = state.categories.find(c => c.id === catId) || { id: catId, icon: catIcon(catId), name: catName(catId) };
    const title = document.createElement('div');
    title.className = 'existing-group-title';
    title.innerHTML = `${cat.icon} ${escapeHtml(cat.name)} <span class="g-count">${items.length}</span>`;
    list.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'existing-grid';
    for (const t of items) {
      const btn = document.createElement('button');
      btn.className = 'existing-item';
      btn.type = 'button';
      const sizeLabel = t.w && t.h ? ` · ${t.w}×${t.h}` : '';
      btn.title = `${t.name}.png — ${t.ru || ''}${sizeLabel}`;
      const emoji = t.w && t.h && t.w !== t.h ? (t.w > t.h ? '▭' : '▯') : '🖼️';
      btn.innerHTML = `
        <div class="ei-thumb"><div class="ei-file-ico">${emoji}</div></div>
        <div class="ei-name">${escapeHtml(t.name)}.png</div>
        <div class="ei-name-ru">${escapeHtml(t.ru || '')}${t.w && t.h ? ` · ${t.w}×${t.h}` : ''}</div>`;
      btn.addEventListener('click', async () => {
        if (!state.categories.find(c => c.id === t.cat)) {
          state.categories.push({ id: t.cat, name: catName(t.cat), icon: catIcon(t.cat) });
          sortCategories();
          if (!state.textures[t.cat]) state.textures[t.cat] = {};
        }
        state.activeCategory = t.cat;
        closeNewTextureModal();
        const withTexture = $('newtex-lib-with-texture')?.checked !== false;
        if (withTexture && t.cdnPath) await openLibraryTexture(t.cat, t.name, t.cdnPath);
        else {
          const w = t.w || 16, h = t.h || 16;
          openPainter(t.cat, `${t.name}.png`, null, [w, h]);
        }
      });
      grid.appendChild(btn);
    }
    list.appendChild(grid);
  }
}
async function openLibraryTexture(cat, name, cdnPath) {
  const repo = 'InventivetalentDev/minecraft-assets';
  const version = state.pack.version;
  const url = `https://raw.githubusercontent.com/${repo}/${version}/${cdnPath}`;
  setStatus(`Загружаю ${name}.png...`, 'loading');
  try {
    const r = await fetch(url, { cache: 'force-cache' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const blob = await r.blob();
    const dataUrl = await Storage.blobToDataURL(blob, 'image/png');
    setStatus('');
    openPainter(cat, `${name}.png`, dataUrl);
  } catch (e) {
    setStatus('');
    await showAlert('Не удалось загрузить текстуру: ' + e.message, { type: 'error', title: 'Ошибка' });
  }
}

document.querySelectorAll('.picker-tab').forEach(btn => btn.addEventListener('click', () => switchPickerTab(btn.dataset.tab)));
$('newtex-close').addEventListener('click', closeNewTextureModal);
$('newtex-cancel').addEventListener('click', closeNewTextureModal);
newtexModal.addEventListener('click', e => { if (e.target === newtexModal) closeNewTextureModal(); });
$('newtex-search').addEventListener('input', renderLibraryGrid);
$('newtex-ok').addEventListener('click', async () => {
  let name = $('newtex-name').value.trim();
  if (!name) { await showAlert('Введи имя файла', { type: 'warn' }); return; }
  if (!/\.png$/i.test(name)) name += '.png';
  const useFile = $('newtex-use-file').checked;
  if (useFile) {
    const f = $('newtex-file').files[0];
    if (!f) { await showAlert('Выбери PNG-файл', { type: 'warn' }); return; }
    const dataUrl = await fileToDataURL(f);
    closeNewTextureModal();
    openPainter(state.activeCategory, name, dataUrl);
  } else {
    const w = Math.max(1, Math.min(512, parseInt($('newtex-w').value, 10) || 16));
    const h = Math.max(1, Math.min(512, parseInt($('newtex-h').value, 10) || 16));
    closeNewTextureModal();
    openPainter(state.activeCategory, name, null, [w, h]);
  }
});
document.addEventListener('keydown', e => {
  if (!newtexModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeNewTextureModal();
  if (e.key === 'Enter' && newtexActiveTab === 'create' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); $('newtex-ok').click(); }
});
$('btn-new-texture').addEventListener('click', openNewTextureModal);
$('btn-empty-new').addEventListener('click', openNewTextureModal);

$('btn-import-textures').addEventListener('click', () => {
  if (!state.activeCategory) { showAlert('Нет активной категории', { type: 'warn' }); return; }
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'image/png'; inp.multiple = true;
  inp.onchange = async () => {
    const files = [...inp.files];
    for (const f of files) {
      const dataUrl = await fileToDataURL(f);
      let name = f.name;
      if (!/\.png$/i.test(name)) name += '.png';
      const cat = state.textures[state.activeCategory];
      if (cat[name]) {
        const base = name.replace(/\.png$/i, '');
        let i = 2;
        while (cat[`${base}_${i}.png`]) i++;
        name = `${base}_${i}.png`;
      }
      cat[name] = dataUrl;
    }
    renderCategories(); renderTextures();
  };
  inp.click();
});

/* PAINTER */
const painterModal = $('painter-modal');
const painterNameInput = $('painter-name');
const paintCanvas = $('paint-canvas');
const gridOverlay = $('grid-overlay');
const canvasStage = $('canvas-stage');
const canvasViewport = $('canvas-viewport');
const canvasInfo = $('canvas-info');
const zoomDisplay = $('zoom-display');

const editor = new TextureEditor(paintCanvas, gridOverlay, canvasStage, canvasViewport);

/* Палитра — 80 цветов, 8 колонок */
const PALETTE = [
  /* Greys (8) */
  '#000000','#1a1a1a','#333333','#4d4d4d','#666666','#808080','#b3b3b3','#ffffff',
  /* Browns (8) */
  '#2a1810','#3d2114','#52301f','#6b3f27','#855030','#a0653e','#c08a5e','#e0b184',
  /* Reds (8) */
  '#2a0a0a','#450f0f','#611515','#7e1c1c','#9b2424','#c73232','#e85858','#f5a5a5',
  /* Orange / Yellow (8) */
  '#2a1a04','#45290a','#613b12','#7e4f1c','#9b6327','#d69432','#eebf5e','#f9e19c',
  /* Greens (8) */
  '#0a2a0a','#104510','#156115','#1c7e1c','#249b24','#38c238','#5ce85c','#a5f5a5',
  /* Teals (8) */
  '#052a2a','#0a4545','#106161','#157e7e','#1c9b9b','#38c2c2','#5ce8e8','#a5f5f5',
  /* Blues (8) */
  '#0a0a2a','#101045','#151561','#1c1c7e','#24249b','#3838c2','#5c5ce8','#a5a5f5',
  /* Purples (8) */
  '#1a0a2a','#291045','#3a1561','#4f1c7e','#63249b','#7d38c2','#a55ce8','#d2a5f5',
  /* Pinks (8) */
  '#2a0a1a','#45102a','#61153a','#7e1c4f','#9b2463','#c2327d','#e8589a','#f5a5d2',
  /* Cyans / Aqua (8) */
  '#0a2a20','#104530','#156148','#1c7e60','#249b78','#32c29a','#58e8bf','#a5f5e0'
];

const paletteEl = $('palette');
const paletteButtons = [];
PALETTE.forEach(c => {
  const b = document.createElement('button');
  b.style.background = c;
  b.title = c;
  b.dataset.color = c;
  b.onclick = () => setColor(c);
  paletteEl.appendChild(b);
  paletteButtons.push(b);
});

function updatePaletteSelection(hex) {
  for (const b of paletteButtons) {
    b.classList.toggle('selected', b.dataset.color === hex);
  }
}
const colorInput = $('color-input');
const colorHex = $('color-hex');
function setColor(hex) {
  hex = hex.toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(hex)) return;
  editor.color = hex;
  colorInput.value = hex;
  colorHex.value = hex;
  if (typeof updatePaletteSelection === 'function') updatePaletteSelection(hex);
}
colorInput.addEventListener('input', () => setColor(colorInput.value));
colorHex.addEventListener('input', () => {
  let v = colorHex.value.trim();
  if (!v.startsWith('#')) v = '#' + v;
  if (/^#[0-9a-f]{6}$/i.test(v)) setColor(v);
});
editor.onColorPick = hex => setColor(hex);

document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    editor.tool = btn.dataset.tool;
    canvasViewport.classList.toggle('hand-mode', btn.dataset.tool === 'hand');
  });
});
const brushRange = $('brush-range');
const brushValue = $('brush-value');
brushRange.addEventListener('input', () => { editor.brushSize = parseInt(brushRange.value, 10); brushValue.textContent = editor.brushSize; });

const sizeWInput = $('size-w');
const sizeHInput = $('size-h');
function markSizeActive() {
  sizeWInput.value = editor.w; sizeHInput.value = editor.h;
  document.querySelectorAll('#size-list button').forEach(b => {
    b.classList.toggle('active', +b.dataset.w === editor.w && +b.dataset.h === editor.h);
  });
}
document.querySelectorAll('#size-list button').forEach(btn => {
  btn.addEventListener('click', async () => {
    const w = +btn.dataset.w, h = +btn.dataset.h;
    if (editor.w === w && editor.h === h) return;
    if (editor.undoStack.length > 0 && !await showConfirm('Изменение размера очистит холст. Продолжить?', { title: 'Изменение размера', okText: 'Продолжить' })) return;
    editor.setSize(w, h); editor.ctx.clearRect(0, 0, w, h); markSizeActive(); updateCanvasInfo();
  });
});
$('size-apply').addEventListener('click', async () => {
  const w = Math.max(1, Math.min(512, parseInt(sizeWInput.value, 10) || 16));
  const h = Math.max(1, Math.min(512, parseInt(sizeHInput.value, 10) || 16));
  if (editor.w === w && editor.h === h) return;
  if (editor.undoStack.length > 0 && !await showConfirm('Изменение размера очистит холст. Продолжить?', { title: 'Изменение размера', okText: 'Продолжить' })) return;
  editor.setSize(w, h); editor.ctx.clearRect(0, 0, w, h); markSizeActive(); updateCanvasInfo();
});
$('zoom-in').addEventListener('click', () => editor.zoomIn());
$('zoom-out').addEventListener('click', () => editor.zoomOut());
$('zoom-fit').addEventListener('click', () => editor.zoomFit());
$('zoom-reset').addEventListener('click', () => editor.zoomReset());
$('btn-center').addEventListener('click', () => editor.centerCanvas());
editor.onZoomChange = z => { zoomDisplay.textContent = Math.round(z) + 'px'; };
$('toggle-grid').addEventListener('change', e => editor.setGrid(e.target.checked));
$('btn-undo').addEventListener('click', () => editor.undo());
$('btn-redo').addEventListener('click', () => editor.redo());
$('btn-clear').addEventListener('click', async () => { if (await showConfirm('Очистить холст?', { title: 'Очистка', okText: 'Очистить' })) editor.clear(); });
editor.onHistoryChange = () => {
  $('btn-undo').style.opacity = editor.undoStack.length ? '1' : '0.4';
  $('btn-redo').style.opacity = editor.redoStack.length ? '1' : '0.4';
};

let painterContext = { category: null, originalName: null, isNew: true };
async function openPainter(category, name, dataUrl, size) {
  painterContext = { category, originalName: name, isNew: !name };
  painterNameInput.value = name || 'texture.png';
  document.querySelectorAll('.tool-btn[data-tool]').forEach((b, i) => { b.classList.toggle('active', i === 0); });
  editor.tool = 'pencil';
  canvasViewport.classList.remove('hand-mode');
  setColor('#ffffff');
  $('toggle-grid').checked = true;
  editor.setGrid(true);
  brushRange.value = 1; brushValue.textContent = '1'; editor.brushSize = 1;
  painterModal.classList.add('active');
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  if (size) { editor.setSize(size[0], size[1]); editor.ctx.clearRect(0, 0, size[0], size[1]); }
  if (dataUrl) await editor.load(dataUrl);
  else {
    editor.undoStack = []; editor.redoStack = [];
    if (editor.onHistoryChange) editor.onHistoryChange();
    editor.zoomFit();
  }
  markSizeActive(); updateCanvasInfo();
  editor.onZoomChange(editor.zoom);
}
function updateCanvasInfo() { canvasInfo.textContent = `${editor.w} × ${editor.h}`; }
function closePainter() { painterModal.classList.remove('active'); painterContext = { category: null, originalName: null, isNew: true }; }
$('painter-cancel').addEventListener('click', closePainter);
painterModal.addEventListener('click', e => { if (e.target === painterModal) closePainter(); });
$('painter-download').addEventListener('click', () => {
  let name = painterNameInput.value.trim();
  if (!name) name = 'texture.png';
  if (!/\.(png|properties|txt|json|mcmeta|lang)$/i.test(name)) name += '.png';
  triggerDownload(editor.toDataURL(), name);
});
document.addEventListener('keydown', e => {
  if (!painterModal.classList.contains('active')) return;
  if (e.key === 'Escape') { closePainter(); return; }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) editor.redo(); else editor.undo(); }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); savePainter(); }
  if (e.target.tagName === 'INPUT') return;
  const map = { b: 'pencil', e: 'eraser', g: 'fill', i: 'picker', h: 'hand' };
  const t = map[e.key.toLowerCase()];
  if (t) {
    editor.tool = t;
    canvasViewport.classList.toggle('hand-mode', t === 'hand');
    document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.toggle('active', b.dataset.tool === t));
  }
});
$('painter-import').addEventListener('click', () => $('painter-import-input').click());
$('painter-import-input').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  const dataUrl = await fileToDataURL(f);
  await editor.load(dataUrl);
  markSizeActive(); updateCanvasInfo();
  if (painterContext.isNew && (!painterNameInput.value || painterNameInput.value === 'texture.png')) painterNameInput.value = f.name;
});
function savePainter() {
  let name = painterNameInput.value.trim();
  if (!name) { showAlert('Введи имя файла', { type: 'warn' }); painterNameInput.focus(); return; }
  if (!/\.png$/i.test(name)) name += '.png';
  const dataUrl = editor.toDataURL();
  const cat = painterContext.category;
  if (!state.textures[cat]) state.textures[cat] = {};
  if (!painterContext.isNew && painterContext.originalName && painterContext.originalName !== name) {
    delete state.textures[cat][painterContext.originalName];
    state.selected.delete(keyOf(cat, painterContext.originalName));
  }
  state.textures[cat][name] = dataUrl;
  closePainter();
  renderCategories(); renderTextures(); updateSelectionToolbar();
}
$('painter-save').addEventListener('click', savePainter);

/* INIT */
setColor('#ffffff');
markSizeActive();
updateCanvasInfo();
brushValue.textContent = '1';
updateLibraryCountBadge();