/* Импорт / экспорт ресурс-паков Minecraft */

const MC_VERSIONS = [
  '1.8.9','1.9.4','1.10.2','1.11.2','1.12.2','1.13.2','1.14.4','1.15.2',
  '1.16.5','1.17.1','1.18.2','1.19.4','1.20.1','1.20.4','1.20.6',
  '1.21.1','1.21.4',
  '1.21.5','1.21.6','1.21.7','1.21.8','1.21.9','1.21.10','1.21.11',
  '26.1','26.2','26.3'
];

const PACK_FORMATS = {
  '1.8.9': 1,
  '1.9.4': 2, '1.10.2': 2,
  '1.11.2': 3, '1.12.2': 3,
  '1.13.2': 4, '1.14.4': 4,
  '1.15.2': 5,
  '1.16.5': 6,
  '1.17.1': 7,
  '1.18.2': 8,
  '1.19.4': 13,
  '1.20.1': 15,
  '1.20.4': 22,
  '1.20.6': 32,
  '1.21.1': 34,
  '1.21.4': 46,
  '1.21.5': 55,
  '1.21.6': 63,
  '1.21.7': 64,
  '1.21.8': 64,
  '1.21.9': 65,
  '1.21.10': 65,
  '1.21.11': 65,
  '26.1': 70,
  '26.2': 71,
  '26.3': 72
};

const Storage = {
  mimeFromName(name) {
    const n = String(name).toLowerCase();
    if (n.endsWith('.png')) return 'image/png';
    if (n.endsWith('.properties')) return 'text/plain';
    if (n.endsWith('.txt')) return 'text/plain';
    if (n.endsWith('.lang')) return 'text/plain';
    if (n.endsWith('.json')) return 'application/json';
    if (n.endsWith('.mcmeta')) return 'application/json';
    return 'application/octet-stream';
  },
  dataURLtoBlob(dataurl) {
    const comma = dataurl.indexOf(',');
    const head = dataurl.slice(0, comma);
    const body = dataurl.slice(comma + 1);
    const mime = head.match(/:(.*?);/)?.[1] || 'application/octet-stream';
    if (head.includes(';base64')) {
      const bin = atob(body);
      const len = bin.length;
      const u8 = new Uint8Array(len);
      for (let i = 0; i < len; i++) u8[i] = bin.charCodeAt(i);
      return new Blob([u8], { type: mime });
    }
    return new Blob([decodeURIComponent(body)], { type: mime });
  },
  blobToDataURL(blob, mimeHint) {
    let b = blob;
    if (mimeHint && (!b.type || b.type === 'application/octet-stream' || b.type === '')) {
      b = new Blob([blob], { type: mimeHint });
    }
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(b);
    });
  },
  async exportPack(state, onProgress) {
    const zip = new JSZip();
    const desc = state.pack.description && state.pack.description.trim() ? state.pack.description : state.pack.name;
    const version = state.pack.version || '1.8.9';
    const packFormat = PACK_FORMATS[version] ?? 1;
    const mcmeta = { pack: { pack_format: packFormat, description: desc } };
    zip.file('pack.mcmeta', JSON.stringify(mcmeta, null, 2));
    if (state.pack.icon) zip.file('pack.png', this.dataURLtoBlob(state.pack.icon));

    let total = 0;
    for (const catId of Object.keys(state.textures)) total += Object.keys(state.textures[catId]).length;
    let count = 0;
    for (const catId of Object.keys(state.textures)) {
      const files = state.textures[catId];
      for (const name of Object.keys(files)) {
        let path;
        if (catId.startsWith('mcpatcher/')) path = `assets/minecraft/${catId}/${name}`;
        else path = `assets/minecraft/textures/${catId}/${name}`;
        const blob = this.dataURLtoBlob(files[name]);
        const isPng = /\.png$/i.test(name);
        zip.file(path, blob, { compression: isPng ? 'STORE' : 'DEFLATE', compressionOptions: isPng ? undefined : { level: 6 } });
        count++;
        if (onProgress && (count % 50 === 0 || count === total)) onProgress(count, total, 0);
      }
    }
    const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE', streamFiles: false },
      (meta) => { if (onProgress) onProgress(count, total, meta.percent); });
    const safeName = state.pack.name.replace(/§./g, '').trim() || 'resourcepack';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${safeName}.zip`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    return count;
  },
  async exportSelected(items, zipName = 'textures.zip', onProgress) {
    const zip = new JSZip();
    const total = items.length;
    let count = 0;
    for (const it of items) {
      const isPng = /\.png$/i.test(it.name);
      const blob = this.dataURLtoBlob(it.dataUrl);
      zip.file(it.name, blob, { compression: isPng ? 'STORE' : 'DEFLATE', compressionOptions: isPng ? undefined : { level: 6 } });
      count++;
      if (onProgress) onProgress(count, total, 0);
    }
    const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE' },
      (meta) => { if (onProgress) onProgress(count, total, meta.percent); });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = zipName;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  },
  async importPack(fileOrBlob) {
    const zip = await JSZip.loadAsync(fileOrBlob);
    const result = { pack: { name: '', description: '', icon: null }, textures: {} };
    const mcmeta = zip.file('pack.mcmeta');
    if (mcmeta) {
      try {
        const json = JSON.parse(await mcmeta.async('string'));
        if (json.pack && json.pack.description) result.pack.description = String(json.pack.description);
      } catch (e) {}
    }
    const icon = zip.file('pack.png');
    if (icon) {
      const blob = await icon.async('blob');
      result.pack.icon = await this.blobToDataURL(blob, 'image/png');
    }
    const tasks = [];
    zip.forEach((path, entry) => {
      if (entry.dir) return;
      const p = path.replace(/\\/g, '/');
      let m = p.match(/^assets\/minecraft\/textures\/([^/]+)\/(.+\.(png|properties|txt|json|mcmeta|lang))$/i);
      if (m) {
        const cat = m[1], name = m[2];
        const mime = this.mimeFromName(name);
        tasks.push(entry.async('blob').then(async blob => {
          if (!result.textures[cat]) result.textures[cat] = {};
          result.textures[cat][name] = await this.blobToDataURL(blob, mime);
        }));
        return;
      }
      m = p.match(/^assets\/minecraft\/mcpatcher\/([^/]+)\/(.+)$/i);
      if (m) {
        const cat = 'mcpatcher/' + m[1], name = m[2];
        const mime = this.mimeFromName(name);
        tasks.push(entry.async('blob').then(async blob => {
          if (!result.textures[cat]) result.textures[cat] = {};
          result.textures[cat][name] = await this.blobToDataURL(blob, mime);
        }));
        return;
      }
    });
    await Promise.all(tasks);
    return result;
  }
};