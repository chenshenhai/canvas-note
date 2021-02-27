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

  _initEvent() {
    const canvas = this._canvas;
    canvas.addEventListener('mousedown', this._onStart.bind(this));
    canvas.addEventListener('mousemove', this._onMove.bind(this));
    canvas.addEventListener('mouseup', this._onEnd.bind(this));

    const mouseupEvent = new MouseEvent('mouseup');
    document.querySelector('body').addEventListener('mousemove', (e) => {
      if (e.path[0] !== canvas) {
        canvas.dispatchEvent(mouseupEvent);
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
    this._positions.push(this._lastPoint)
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
        this._onDraw(this._positions);
      }
    }
  }
  
  _onEnd() {
    this._isPainting = false;
  }
  
}