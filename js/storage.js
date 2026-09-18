/* Импорт / экспорт ресурс-паков Minecraft 1.8.9 */

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
    const [head, body] = dataurl.split(',');
    const mime = head.match(/:(.*?);/)?.[1] || 'application/octet-stream';
    const bin = atob(body);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return new Blob([u8], { type: mime });
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

  async exportPack(state) {
    const zip = new JSZip();

    const desc = state.pack.description && state.pack.description.trim()
      ? state.pack.description
      : state.pack.name;

    const mcmeta = { pack: { pack_format: 1, description: desc } };
    zip.file('pack.mcmeta', JSON.stringify(mcmeta, null, 2));

    if (state.pack.icon) {
      zip.file('pack.png', this.dataURLtoBlob(state.pack.icon));
    }

    let count = 0;
    for (const catId of Object.keys(state.textures)) {
      const files = state.textures[catId];
      for (const name of Object.keys(files)) {
        let path;
        if (catId.startsWith('mcpatcher/')) path = `assets/minecraft/${catId}/${name}`;
        else path = `assets/minecraft/textures/${catId}/${name}`;
        zip.file(path, this.dataURLtoBlob(files[name]));
        count++;
      }
    }

    const blob = await zip.generateAsync({
      type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 }
    });

    const safeName = state.pack.name.replace(/§./g, '').trim() || 'resourcepack';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${safeName}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    return count;
  },

  async importPack(fileOrBlob) {
    const zip = await JSZip.loadAsync(fileOrBlob);
    const result = {
      pack: { name: '', description: '', icon: null },
      textures: {}
    };

    const mcmeta = zip.file('pack.mcmeta');
    if (mcmeta) {
      try {
        const json = JSON.parse(await mcmeta.async('string'));
        if (json.pack && json.pack.description) {
          result.pack.description = String(json.pack.description);
        }
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