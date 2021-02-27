import { createCircle } from './pattern.js';

const circle = createCircle(10);

export class Brush {
  constructor(ctx) {
    this._ctx = ctx;
    this._isBusy = false;
    this._size = 10;
    this._pointSize = this._size;
  }

  drawLine(start, end) { 
    const ctx = this._ctx;
    const forwardX = (end.x - start.x > 0);
    const forwardY = (end.y - start.y > 0);
    
    const dx = Math.max(0, Math.abs(end.x - start.x));
    const dy = Math.max(0, Math.abs(end.y - start.y));
    const t = Math.max(1, (end.t - start.t));
    const d = Math.sqrt(Math.abs(dx * dx + dy * dy));
    const v = d / t;

    const size = 10;

    ctx.fillStyle = 'rgb(0 0 0 / 20%)';
    ctx.strokeStyle = 'rgb(0 0 0 / 0%)';
    ctx.beginPath();
    ctx.arc(start.x, start.y, size, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    if (d > size) {
      let _x = start.x;
      let _y = start.y;

      while((end.x - _x) > 0 === forwardX && (end.y - _y) > 0 === forwardY) {
        if (dx > 0) {
          _x = _x + (forwardX ? 1 : -1);
          _y = _y + (forwardY ? 1 : -1) * dy / dx;
        } else {
          _y = _y + (forwardY ? 1 : -1);
        }
        
        ctx.beginPath();
        ctx.arc(_x, _y, size, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
      }
    }
    return v;
  }

  draw(positions) {
    if (this._isBusy === true) {
      console.log('render busy!');
      return;
    } 
    this._isBusy = true;
    let prevVelocity = 0; 

    for (let i = 0; i < positions.length - 1; i++) {
      const start = positions[i];
      const end = positions[i + 1];
      prevVelocity = this.drawLine(start, end, { prevVelocity });
    }
  }

  drawCurveLine(start, end) { 
    const ctx = this._ctx;
    let t = 0;

    const dx = Math.max(0, Math.abs(end.x - start.x));
    const dy = Math.max(0, Math.abs(end.y - start.y));
    const distance = Math.sqrt(Math.abs(dx * dx + dy * dy));

    var brushDelta = (this._size - this._pointSize);
  
    while (t < 1) {
      var pointSize = Math.min(this._pointSize + (brushDelta * t), this._size);
        
      let pos = this.getCurvePosition(start, end, t);
      if (Math.random() > 0.2) {
        const shake = ((Math.random() > 0.5) ? 1 : -1) * parseInt(Math.random() * 1.2, 10);
        const x = pos.x - pointSize / 2 + shake;
        const y = pos.y - pointSize / 2 + shake;
        ctx.drawImage(circle, x, y, pointSize, pointSize);
      }
      t = t + 1 / distance;
    }
  }

  getCurvePosition (start, end, t) {
    const x = start.x + (end.x - start.x) * t;
    const y = start.y + (end.y - start.y) * t;
    return { x, y };
  }

  drawCurve(positions) {
    if (this._isBusy === true) {
      console.log('render busy!');
      return;
    } 
    this._isBusy = true;

    for (let i = 0; i < positions.length - 1; i++) {
      const start = positions[i];
      const end = positions[i + 1];
      this.drawCurveLine(start, end);
    }
  }
}

