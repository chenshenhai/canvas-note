export class Brush {
  constructor(ctx) {
    this._ctx = ctx;
    this._isBusy = false;
  }

  drawLine(start, end, opts = { prevVelocity: 0 }) { 
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
    // ctx.arc(start.x, start.y, size, 0, 2 * Math.PI, false);
    ctx.arc(start.x, start.y, size, 0, 2 * Math.PI, false);
    // ctx.arc(end.x, end.y, size, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    if (d > size) {
      let _x = start.x;
      let _y = start.y;
      let _size = size / 2;

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
}