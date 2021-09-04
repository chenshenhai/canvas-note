export class Watcher {
  constructor(canvas) {
    this._canvas = canvas;
    this._isPainting = false;
    this._positions = [];
    this._onDraw = null;
    this._initEvent();
  }

  onDraw(callback) {
    this._onDraw = callback;
  }

  onDrawEnd(callback) {
    this._onDrawEnd = callback;
  }

  onDrawStart(callback) {
    this._onDrawStart = callback;
  }

  _initEvent() {
    const canvas = this._canvas;
    canvas.addEventListener('mousedown', this._onStart.bind(this));
    canvas.addEventListener('mousemove', this._onMove.bind(this));
    canvas.addEventListener('mouseup', this._onEnd.bind(this));

    const mouseupEvent = new MouseEvent('mouseup');
    document.querySelector('body').addEventListener('mousemove', (e) => {
      if (e.path[0] !== canvas) {
        if (this._isPainting === true) {
          canvas.dispatchEvent(mouseupEvent);
        }
      }
    }, false)
  }

  _onStart(e) {
    const x = e.clientX;
    const y = e.clientY;
    this._isPainting = true;
    this._positions = [];
    this._lastPoint = {
      x: x - canvas.offsetLeft,
      y: y - canvas.offsetTop,
      t: Date.now(),
    };
    this._positions.push(this._lastPoint);
    if (typeof this._onDrawStart === 'function') {
      this._onDrawStart(this._lastPoint);
    }
  }
  
  _onMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    if (this._isPainting) {
      let newPoint = { 
        x: x - canvas.offsetLeft,
        y: y - canvas.offsetTop,
        t: Date.now(),
      };
      this._lastPoint = newPoint;
      this._positions.push(newPoint);

      if (typeof this._onDraw === 'function') {
        const positions = this._positions;
        if (!(positions.length >= 2)) {
          return;
        }
        const start = positions[positions.length - 2];
        const end = positions[positions.length - 1];
        this._onDraw(start, end);
      }
    }
  }
  
  _onEnd() {
    this._isPainting = false;
    if (typeof this._onDrawEnd === 'function') {
      this._onDrawEnd(this._positions);
    }
  }
  
}