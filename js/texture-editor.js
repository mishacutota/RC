/* Пиксельный редактор — зум, панорамирование, размер кисти */

function hexToRgba(hex) {
  const m = hex.replace('#', '');
  return [
    parseInt(m.slice(0, 2), 16),
    parseInt(m.slice(2, 4), 16),
    parseInt(m.slice(4, 6), 16), 255
  ];
}
function rgbToHex(r, g, b) {
  const h = n => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

class TextureEditor {
  constructor(canvas, gridOverlay, stage, viewport) {
    this.canvas = canvas;
    this.gridOverlay = gridOverlay;
    this.stage = stage;
    this.viewport = viewport;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });

    this.w = 16;
    this.h = 16;
    this.zoom = 20;
    this.minZoom = 1;
    this.maxZoom = 64;
    this.panX = 0;
    this.panY = 0;

    this.tool = 'pencil';
    this.color = '#ffffff';
    this.brushSize = 1;
    this.showGrid = true;

    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 60;

    this.drawing = false;
    this.lastPixel = null;
    this._spaceDown = false;

    this.onColorPick = null;
    this.onHistoryChange = null;
    this.onZoomChange = null;

    this._bindCanvas();
    this._bindPanZoom();
    this._bindKeyboard();
    this.setSize(16, 16);
  }

  _bindCanvas() {
    const c = this.canvas;
    c.addEventListener('mousedown', e => this._onDown(e));
    c.addEventListener('mousemove', e => this._onMove(e));
    window.addEventListener('mouseup', () => this._onUp());
    c.addEventListener('mouseleave', () => { this.lastPixel = null; });
    c.addEventListener('contextmenu', e => e.preventDefault());

    c.addEventListener('touchstart', e => {
      if (this.tool === 'hand' || this._spaceDown) return;
      e.preventDefault();
      const t = e.touches[0];
      this._onDown({ clientX: t.clientX, clientY: t.clientY, button: 0, preventDefault(){} });
    }, { passive: false });
    c.addEventListener('touchmove', e => {
      if (!this.drawing || this.tool === 'hand' || this._spaceDown) return;
      e.preventDefault();
      const t = e.touches[0];
      this._onMove({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: false });
    c.addEventListener('touchend', () => this._onUp());
  }

  _bindPanZoom() {
    const vp = this.viewport;
    let panning = false;
    let startX = 0, startY = 0, startPanX = 0, startPanY = 0;

    const canPan = (e) => {
      if (e.button === 1) return true;
      if (e.button !== 0) return false;
      if (this.tool === 'hand') return true;
      if (this._spaceDown) return true;
      return false;
    };

    vp.addEventListener('mousedown', e => {
      if (!canPan(e)) return;
      e.preventDefault();
      panning = true;
      startX = e.clientX; startY = e.clientY;
      startPanX = this.panX; startPanY = this.panY;
      vp.classList.add('panning');
    });

    window.addEventListener('mousemove', e => {
      if (!panning) return;
      this.panX = startPanX + (e.clientX - startX);
      this.panY = startPanY + (e.clientY - startY);
      this._applyPan();
    });

    window.addEventListener('mouseup', () => {
      if (!panning) return;
      panning = false;
      vp.classList.remove('panning');
    });

    vp.addEventListener('wheel', e => {
      e.preventDefault();
      const rect = vp.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
      this.zoomAt(mx, my, factor);
    }, { passive: false });

    vp.addEventListener('dblclick', e => {
      if (e.target === vp) this.centerCanvas();
    });

    let touchStartDist = 0;
    let touchStartZoom = 1;
    let touchCenter = { x: 0, y: 0 };
    let touchStartPan = { x: 0, y: 0 };

    vp.addEventListener('touchstart', e => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0], t2 = e.touches[1];
        touchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        touchStartZoom = this.zoom;
        const rect = vp.getBoundingClientRect();
        touchCenter = {
          x: (t1.clientX + t2.clientX) / 2 - rect.left,
          y: (t1.clientY + t2.clientY) / 2 - rect.top
        };
        touchStartPan = { x: this.panX, y: this.panY };
      } else if (e.touches.length === 1 && this.tool === 'hand') {
        e.preventDefault();
        const t = e.touches[0];
        touchStartDist = 0;
        touchStartPan = { x: this.panX, y: this.panY };
        touchCenter = { x: t.clientX, y: t.clientY };
      }
    }, { passive: false });

    vp.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0], t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        if (touchStartDist > 0) {
          const factor = dist / touchStartDist;
          const newZoom = this._clampZoom(touchStartZoom * factor);
          this._zoomKeepPoint(touchCenter.x, touchCenter.y, touchStartPan, newZoom);
        }
      } else if (e.touches.length === 1 && this.tool === 'hand') {
        e.preventDefault();
        const t = e.touches[0];
        this.panX = touchStartPan.x + (t.clientX - touchCenter.x);
        this.panY = touchStartPan.y + (t.clientY - touchCenter.y);
        this._applyPan();
      }
    }, { passive: false });
  }

  _bindKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.code !== 'Space' || e.repeat) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const modal = document.getElementById('painter-modal');
      if (!modal || !modal.classList.contains('active')) return;
      this._spaceDown = true;
      this.viewport.classList.add('space-pan');
      e.preventDefault();
    });
    document.addEventListener('keyup', e => {
      if (e.code !== 'Space') return;
      this._spaceDown = false;
      this.viewport.classList.remove('space-pan');
    });
  }

  _getPixel(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * this.w);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * this.h);
    return {
      x: Math.max(0, Math.min(this.w - 1, x)),
      y: Math.max(0, Math.min(this.h - 1, y))
    };
  }

  _onDown(e) {
    if (e.button === 2) return;
    if (this.tool === 'hand' || this._spaceDown || e.button === 1) return;
    e.preventDefault();
    this.pushUndo();
    this.drawing = true;
    const p = this._getPixel(e);
    this._applyTool(p);
    this.lastPixel = p;
  }

  _onMove(e) {
    if (!this.drawing) return;
    const p = this._getPixel(e);
    if (this.lastPixel && p.x === this.lastPixel.x && p.y === this.lastPixel.y) return;
    if (this.tool === 'pencil' || this.tool === 'eraser') {
      if (this.lastPixel) this._line(this.lastPixel, p);
    }
    this.lastPixel = p;
  }

  _onUp() {
    if (!this.drawing) return;
    this.drawing = false;
    this.lastPixel = null;
  }

  _applyTool(p) {
    switch (this.tool) {
      case 'pencil': this._brush(p.x, p.y, false); break;
      case 'eraser': this._brush(p.x, p.y, true); break;
      case 'fill':   this.floodFill(p.x, p.y, this.color); break;
      case 'picker': {
        const d = this.ctx.getImageData(p.x, p.y, 1, 1).data;
        if (d[3] === 0) return;
        const hex = rgbToHex(d[0], d[1], d[2]);
        this.color = hex;
        if (this.onColorPick) this.onColorPick(hex);
        break;
      }
    }
  }

  _brush(cx, cy, isErase) {
    const n = this.brushSize;
    const startX = cx - Math.floor((n - 1) / 2);
    const startY = cy - Math.floor((n - 1) / 2);
    if (isErase) this.ctx.clearRect(startX, startY, n, n);
    else {
      this.ctx.fillStyle = this.color;
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.fillRect(startX, startY, n, n);
    }
  }

  _line(a, b) {
    let x0 = a.x, y0 = a.y;
    const x1 = b.x, y1 = b.y;
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    const erasing = this.tool === 'eraser';
    while (true) {
      this._brush(x0, y0, erasing);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }

  floodFill(x, y, hex) {
    const img = this.ctx.getImageData(0, 0, this.w, this.h);
    const data = img.data;
    const idx0 = (y * this.w + x) * 4;
    const target = [data[idx0], data[idx0 + 1], data[idx0 + 2], data[idx0 + 3]];
    const fill = hexToRgba(hex);
    if (target[0] === fill[0] && target[1] === fill[1] &&
        target[2] === fill[2] && target[3] === fill[3]) return;

    const stack = [[x, y]];
    const visited = new Uint8Array(this.w * this.h);
    while (stack.length) {
      const [cx, cy] = stack.pop();
      if (cx < 0 || cy < 0 || cx >= this.w || cy >= this.h) continue;
      const key = cy * this.w + cx;
      if (visited[key]) continue;
      visited[key] = 1;
      const i = key * 4;
      if (data[i] !== target[0] || data[i + 1] !== target[1] ||
          data[i + 2] !== target[2] || data[i + 3] !== target[3]) continue;
      data[i] = fill[0]; data[i + 1] = fill[1]; data[i + 2] = fill[2]; data[i + 3] = fill[3];
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
    this.ctx.putImageData(img, 0, 0);
  }

  _snapshot() { return this.ctx.getImageData(0, 0, this.w, this.h); }
  pushUndo() {
    try {
      const snap = this._snapshot();
      this.undoStack.push(snap);
      if (this.undoStack.length > this.maxHistory) this.undoStack.shift();
      this.redoStack = [];
      if (this.onHistoryChange) this.onHistoryChange();
    } catch (e) {}
  }
  undo() {
    if (!this.undoStack.length) return;
    const cur = this._snapshot();
    const prev = this.undoStack.pop();
    this.redoStack.push(cur);
    this.ctx.putImageData(prev, 0, 0);
    if (this.onHistoryChange) this.onHistoryChange();
  }
  redo() {
    if (!this.redoStack.length) return;
    const cur = this._snapshot();
    const next = this.redoStack.pop();
    this.undoStack.push(cur);
    this.ctx.putImageData(next, 0, 0);
    if (this.onHistoryChange) this.onHistoryChange();
  }

  setSize(w, h, resetHistory = true) {
    this.w = w; this.h = h;
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx.imageSmoothingEnabled = false;
    if (resetHistory) {
      this.undoStack = []; this.redoStack = [];
      if (this.onHistoryChange) this.onHistoryChange();
    }
    this._applyZoom();
    this.centerCanvas();
  }

  _clampZoom(z) { return Math.max(this.minZoom, Math.min(this.maxZoom, z)); }

  setZoom(z, keepCenter = true) {
    const nz = this._clampZoom(z);
    if (nz === this.zoom) return;
    if (keepCenter) {
      const cx = this.viewport.clientWidth / 2;
      const cy = this.viewport.clientHeight / 2;
      this._zoomKeepPoint(cx, cy, { x: this.panX, y: this.panY }, nz);
    } else {
      this.zoom = nz;
      this._applyZoom();
      this._applyPan();
      this._emitZoom();
    }
  }
  zoomIn()  { this.setZoom(this.zoom * 1.25); }
  zoomOut() { this.setZoom(this.zoom / 1.25); }
  zoomReset() {
    const cx = this.viewport.clientWidth / 2;
    const cy = this.viewport.clientHeight / 2;
    this._zoomKeepPoint(cx, cy, { x: this.panX, y: this.panY }, 1);
  }
  zoomFit() {
    const vw = this.viewport.clientWidth;
    const vh = this.viewport.clientHeight;
    const pad = 60;
    const zx = (vw - pad) / this.w;
    const zy = (vh - pad) / this.h;
    const z = this._clampZoom(Math.floor(Math.min(zx, zy)));
    this.zoom = z;
    this._applyZoom();
    this.centerCanvas();
  }
  zoomAt(mx, my, factor) {
    const nz = this._clampZoom(this.zoom * factor);
    if (nz === this.zoom) return;
    this._zoomKeepPoint(mx, my, { x: this.panX, y: this.panY }, nz);
  }
  _zoomKeepPoint(vx, vy, startPan, newZoom) {
    const px = (vx - startPan.x) / this.zoom;
    const py = (vy - startPan.y) / this.zoom;
    this.zoom = newZoom;
    this.panX = vx - px * this.zoom;
    this.panY = vy - py * this.zoom;
    this._applyZoom();
    this._applyPan();
    this._emitZoom();
  }
  _applyZoom() {
    const dispW = this.w * this.zoom;
    const dispH = this.h * this.zoom;
    this.canvas.style.width  = dispW + 'px';
    this.canvas.style.height = dispH + 'px';
    this.stage.style.width  = dispW + 'px';
    this.stage.style.height = dispH + 'px';
    this._updateGrid();
  }
  _applyPan() {
    this.stage.style.left = this.panX + 'px';
    this.stage.style.top  = this.panY + 'px';
  }
  _emitZoom() { if (this.onZoomChange) this.onZoomChange(this.zoom); }
  centerCanvas() {
    const vw = this.viewport.clientWidth;
    const vh = this.viewport.clientHeight;
    this.panX = Math.round((vw - this.w * this.zoom) / 2);
    this.panY = Math.round((vh - this.h * this.zoom) / 2);
    this._applyPan();
    this._emitZoom();
  }

  setGrid(v) { this.showGrid = v; this._updateGrid(); }
  _updateGrid() {
    const z = this.zoom;
    if (!this.showGrid || z < 4) {
      this.gridOverlay.style.backgroundImage = 'none';
      return;
    }
    this.gridOverlay.style.backgroundImage = `
      linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)
    `;
    this.gridOverlay.style.backgroundSize = `${z}px ${z}px`;
  }

  clear() { this.pushUndo(); this.ctx.clearRect(0, 0, this.w, this.h); }

  load(dataUrl) {
    return new Promise(resolve => {
      if (!dataUrl) {
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.undoStack = []; this.redoStack = [];
        if (this.onHistoryChange) this.onHistoryChange();
        this.zoomFit();
        resolve({ w: this.w, h: this.h });
        return;
      }
      const img = new Image();
      img.onload = () => {
        const nw = img.naturalWidth || 16;
        const nh = img.naturalHeight || 16;
        this.setSize(nw, nh, false);
        this.ctx.clearRect(0, 0, nw, nh);
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(img, 0, 0);
        this.undoStack = []; this.redoStack = [];
        if (this.onHistoryChange) this.onHistoryChange();
        this.zoomFit();
        resolve({ w: nw, h: nh });
      };
      img.onerror = () => resolve({ w: this.w, h: this.h });
      img.src = dataUrl;
    });
  }

  toDataURL() { return this.canvas.toDataURL('image/png'); }
}