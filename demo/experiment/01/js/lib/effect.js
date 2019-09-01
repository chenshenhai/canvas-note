const defaultOpts = {
  size: 100,
  width: 800,
  height: 600,
  colors: [
    '#2196f3',
    '#3f51b5'
  ]
}

class Effect {

  constructor(options = {}) {
    const opts = { ...{}, ...defaultOpts, ...options,  };
    this._opts = opts;

    const canvas = document.createElement('canvas');
    canvas.width = opts.width;
    canvas.height = opts.height;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = opts.width;
    tempCanvas.height = opts.height;

    this._canvas = canvas;
    this._context = canvas.getContext('2d');

    this._rows = Math.ceil(opts.height / opts.size);
    this._columns = Math.ceil(opts.width / (opts.size * Math.cos(Math.PI / 6)));

    this._drawLinearGradientContext(tempCanvas);
    // this._drawLinearGradientContext(canvas);
  }

  getCanvas() {
    return this._canvas;
  }

  _drawLinearGradientContext(canvas) {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'multiply';
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    this._opts.colors.forEach((color, idx) => {
      gradient.addColorStop(idx, color);
    });
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.closePath();
    ctx.fill();
  }

  _getTriangleGrids(size, rows, columns) {
    const limit = rows * columns;
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
      
      }
    }
  }
}

export default Effect;