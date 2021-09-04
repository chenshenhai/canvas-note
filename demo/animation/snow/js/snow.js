export default class Snow {
  constructor(canvas, opts = {}) {
    this._status = 'prepare'; // prepare, stop, start
    this._canvas = canvas;
    this._ctx = this._canvas.getContext('2d');
    this._opts = { ...{ count: 100 }, ...opts };
    this._flakes = this._createFlakeList(this._opts.count);
  }

  start() {
    if (this._status === 'prepare') {
      this._snow();
    }
    this._status = 'start';
  }

  stop() {
    this._status = 'stop';
  }

  _snow() {
    const _snowAction = () => {
      if (this._status === 'start') {
        const ctx = this._ctx;
        const snowflakes = this._flakes;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this._opts.count; i++) {
          let snowflake = snowflakes[i];
          ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
          snowflake.y += snowflake.speed; 
          if ((snowflake.y >= canvas.height || snowflake.y <= 0) || (snowflake.x >= canvas.width || snowflake.x <= 0)) {
            snowflakes[i] = { ...this._createFlake(), ...{ y: 0 } };
          }
          ctx.beginPath();
          ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(_snowAction);
    }
    
    requestAnimationFrame(_snowAction);
  }

  _createFlake() {
    return {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      size: Math.min(Math.random() * 10, 10),
      opacity: Math.min(Math.random(), 1),
      speed: Math.max(2, Math.min(Math.random() * 10, 4)),
    }
  }

  _createFlakeList(count) {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(this._createFlake());
    }
    return list;
  }
}

