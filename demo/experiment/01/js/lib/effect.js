const defaultOpts = {
  size: 100,
  width: 800,
  height: 600,
}

class Effect {
  constructor(options = {}) {
    const opts = { ...{},  ...options, ...defaultOpts };
    this._opts = opts;

    const canvas = document.createElement('canvas');
    canvas.width = opts.width;
    canvas.height = opts.height;
    
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
  }

  getCanvas() {
    return this._canvas;
  }
}

export default Effect;