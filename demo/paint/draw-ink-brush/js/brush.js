import { createBrushPoint } from './pattern.js';

export class Brush {
  constructor(ctx) {
    this._ctx = ctx;
    this._brushPoint = createBrushPoint();

    this._inertanceNum = 4;
    this._positions = [];
    this._prevPosition = null;
    this._prevBrushSize = null;
    this._expectedNextPosition = null;
    this._acceleration = 0;
    this._prevVelocity = 0;
    this._prevDistance = 0;
    
    // xxx
    this.velocityPressureCoff = 5;
  }

  pushPosition(p) {
    this._positions.push(p);
  }

  drawStart() {
    this._positions = [];
    this._prevPosition = null;
    this._prevBrushSize = null;
    this._prevVelocity = 0;
    this._prevDistance = 0;
    this._expectedNextPosition = null;
    this._acceleration = 0;
  }

  drawEnd() {
    if (this._acceleration > 1) {
      let pos = {
        x: this._expectedNextPosition.x,
        y: this._expectedNextPosition.y,
        t: (this._acceleration / (this._prevDistance * this._prevVelocity)) + this._prevPosition.t,
        p: this._prevPosition.p * Math.min(this._acceleration / (this._prevDistance * this._prevVelocity), 1)
      };
      for (let i = 0, n = this._inertanceNum; i < n; i++) {
        this._positions.push(pos);
      }
      if (this._positions.length >= 2) {
        this.drawLine(this._positions[positions.length - 2], positions[positions.length - 1]);
      }
    }
  }

  drawLine() {
    const ctx = this._ctx;
    let pos = this.getBufferedCurrentPosition();
    if (pos == null) return;

    if (this._prevPosition == null) {
      this._prevPosition = pos;
    }
    
    let t = (pos.t - this._prevPosition.t);
    let distance = this.getDistance(pos, this._prevPosition);
    let velocity = distance / Math.max(1, t);
    let acceleration = (this._prevVelocity == 0) ? 0 : velocity / this._prevVelocity;
    const curve = function(t, b, c, d) {
      return c * t / d + b;
    }
    let brushSize = Math.max(this._brushPoint.minSize,
      curve(
        velocity,
        this._brushPoint.maxSize,
        (0 - this._brushPoint.maxSize) - this._brushPoint.minSize,
        this.velocityPressureCoff
      )
    );
    if (pos.p > 0) {
      brushSize = Math.max(this._brushPoint.minSize, this._brushPoint.maxSize * pos.p);
    }

    
    ctx.save();
    this.drawPath(ctx, this._prevPosition, pos, brushSize, distance, velocity);
    ctx.restore();

    this._acceleration = acceleration;
    this._expectedNextPosition = this.getInterlatePos(this._prevPosition, pos, 1 + this._acceleration);
    this._prevPosition = pos;
    this._prevBrushSize = brushSize;
    this._prevVelocity = velocity;
    this._prevDistance = distance;
  }


  getDistance(p0, p1) {
    let distance = ((p1.x - p0.x) * (p1.x - p0.x)) + ((p1.y - p0.y) * (p1.y - p0.y));
    return (distance == 0) ? distance : Math.sqrt(distance);
  }

  drawPath(ctx, startPos, endPos, brushSize, distance) {
    let t = 0;
    let brushDelta = (brushSize - this._prevBrushSize);
  
    while (t < 1) {
      let brushSizeCur = Math.min(this._prevBrushSize + (brushDelta * t), this._brushPoint.maxSize);
      let pos = this.getInterlatePos(startPos, endPos, t);
      if (Math.random() > 0.2) {
        let px = pos.x;
        let py = pos.y;
        ctx.drawImage(this._brushPoint.pattern, px, py, brushSizeCur, brushSizeCur);
        
      }
      t += 1 / distance;
    }
  }

  getInterlatePos(p0, p1, moveLen) {
    let x = p0.x + (p1.x - p0.x) * moveLen;
    let y = p0.y + (p1.y - p0.y) * moveLen;
  
    return { x: x, y: y };
  }

  getBufferedCurrentPosition() {
    let pos = { x: 0, y: 0, t: 0};
    let inertanceNum = Math.min(this._inertanceNum, this._positions.length);
  
    if (inertanceNum == 0) {
      return null
    }
  
    for (let i = 1; i < inertanceNum + 1; i++) {
      let p = this._positions[this._positions.length - i];
      pos.x += p.x;
      pos.y += p.y;
      pos.t += p.t;
      pos.p += p.p;
    }
  
    pos.x /= inertanceNum;
    pos.y /= inertanceNum;
    pos.t /= inertanceNum;
    pos.p /= inertanceNum;
  
    return pos;
  }
}