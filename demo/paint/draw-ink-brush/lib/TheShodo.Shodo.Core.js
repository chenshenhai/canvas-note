/// <reference path="TheShodo.Shodo.Resources.js" />

if (!window.TheShodo) window.TheShodo = {};

TheShodo.Shodo = {}

TheShodo.Shodo.StrokeManager = function(eventCaptureTarget, strokeEngine) {
  /// <summary></summary>
  /// <return>TheShodo.Shodo.StrokeManager</return>
  this.eventCaptureTarget = eventCaptureTarget;
  this.strokeEngine = strokeEngine;
  this.isInStroke = false;
  this.strokeBeginTime = null;
}

TheShodo.Shodo.StrokeManager.prototype.beginStroke = function() {
  /// <summary>Begin state of one stroke</summary>
  /// <return>TheShodo.Shodo.StrokeManager</return>

  this.endStroke();
  this.isInStroke = true;
  this.strokeBeginTime = Date.now();
  this.strokeEngine.beginStroke();

  return this;
}

TheShodo.Shodo.StrokeManager.prototype.addStrokePosition = function(x, y, pressure) {
  /// <summary>Add stroke position to history and render</summary>
  /// <return>TheShodo.Shodo.StrokeManager</return>

  var pos = { x, y, t: Date.now() - this.strokeBeginTime, p: pressure };
  this.strokeEngine.addStrokePosition(pos);
  this.strokeEngine.draw();
  return this;
}

TheShodo.Shodo.StrokeManager.prototype.endStroke = function() {
  /// <summary>End state of one stroke</summary>
  /// <return>TheShodo.Shodo.StrokeManager</return>

  if (!this.isInStroke) return;
  this.isInStroke = false;
  this.strokeEngine.endStroke();

  return this;
}


TheShodo.Shodo.StrokeManager.prototype.start = function() {
  /// <summary></summary>
  /// <return>TheShodo.Shodo.StrokeManager</return>
  var handCanvasObject = this.eventCaptureTarget;

  const mouseupEvent = new MouseEvent('mouseup');
  document.querySelector('body').addEventListener('mousemove', (e) => {
    handCanvasObject.dispatchEvent(mouseupEvent);
  }, false)

  var self = this;
  var isMouseDown = false;

  var offset = {
    left: handCanvasObject.parentElement.offsetLeft,
    top: handCanvasObject.parentElement.offsetTop,
  }

  function onStart(e){
    e.preventDefault();
    isMouseDown = true;
    self.beginStroke();
  }
  function onDraw(e){
    e.preventDefault();
    e.stopPropagation(),e.touches && (e = e.touches[0]);
    if (!isMouseDown) return;

    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;

    self.addStrokePosition(x, y);
  }
  function onEnd(e){
    e.preventDefault();
    if (!isMouseDown) return;
    isMouseDown = false;
    self.endStroke();
  }

  handCanvasObject.addEventListener('mousedown',onStart, false);
  handCanvasObject.addEventListener('mousemove',onDraw, false);
  handCanvasObject.addEventListener('mouseup',onEnd, false);

  handCanvasObject.addEventListener('touchstart', onStart, false);
  handCanvasObject.addEventListener('touchmove', onDraw, false);
  handCanvasObject.addEventListener('touchend', onEnd, false);
}

// ----------------------------------------------------------------------------



TheShodo.Shodo.StrokeEngine = function(width, height, canvas, compositedCanvas) {
  /// <summary></summary>
  /// <return>TheShodo.Shodo.StrokeEngine</return>
  this.velocityPressureCoff = 5;
  this.canvas = canvas;
  this.width = width;
  this.height = height;
  this.canvasContext = this.canvas.getContext('2d');

  this.backgroundImage = null;
  this.backgroundImageClipping = { top: -43, left: 0 };

  this.brushOpacity = 1;
  this.brushColor = 0x000000;

  /// <summary>Create a brush.</summary>
  const brushName = 'Medium';
  var newBrush = TheShodo.Shodo.Brushes.getBrush(brushName);
  // newBrush.image = this.createColoredBrushImage(newBrush.image, this.brushColor, newBrush.width, newBrush.height);
  newBrush.kasureImage = this.createColoredBrushImage(newBrush.kasureImage, this.brushColor, newBrush.width, newBrush.height);
  this.currentBrush = newBrush;
 
  this.bufferingSize = 4;
  this.strokeBuffer = [];
  this.previousPosition = null;
  this.previousBrushSize = null;
  this.previousVelocity = 0;
  this.previousDistance = 0;
  this.expectedNextPosition = null;
  this.accelerate = 0;

  this.compositedCanvas = compositedCanvas;
  this.compositedCanvasContext = this.compositedCanvas.getContext('2d');

  this.canvasContext.clearRect(0, 0, this.width, this.height);
  this.compositedCanvasContext.clearRect(0, 0, this.width, this.height);
}


TheShodo.Shodo.StrokeEngine.prototype.createColoredBrushImage = function(originalBrushImage, brushColor, width, height) {
  var tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = width;
  tmpCanvas.height = height;
  var ctx = tmpCanvas.getContext('2d');
  ctx.drawImage(originalBrushImage, 0, 0);
  var imageData = ctx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);

  for (var i = 0, n = imageData.data.length / 4; i < n; i++) {
    imageData.data[(i * 4)] = (brushColor & 0xff0000) >> 16;
    imageData.data[(i * 4) + 1] = (brushColor & 0x00ff00) >> 8;
    imageData.data[(i * 4) + 2] = (brushColor & 0x0000ff);
  }
  ctx.putImageData(imageData, 0, 0);

  // 合成する
  var tmpCanvas2 = document.createElement('canvas');
  tmpCanvas2.width = width;
  tmpCanvas2.height = height;
  var ctx2 = tmpCanvas2.getContext('2d');
  for (var i = 0; i < 15; i++) {
    ctx2.drawImage(tmpCanvas, 0, 0);
  }

  var img = document.createElement('img');
  img.src = tmpCanvas2.toDataURL();

  return img;
}

// -----
TheShodo.Shodo.StrokeEngine.prototype.beginStroke = function() {
  /// <summary></summary>
  this.strokeBuffer = [];
  this.previousPosition = null;
  this.previousBrushSize = null;
  this.previousVelocity = 0;
  this.previousDistance = 0;
  this.expectedNextPosition = null;
  this.accelerate = 0;

  //console.log('beginStroke');
}

TheShodo.Shodo.StrokeEngine.prototype.addStrokePosition = function(pos) {
  /// <summary></summary>
  /// <param name="pos">a point</param>
  this.strokeBuffer.push(pos);
}

TheShodo.Shodo.StrokeEngine.prototype.endStroke = function() {
    /// <summary></summary>

    if (this.accelerate > 1) {
      // はらい
      var pos = {
        x: this.expectedNextPosition.x,
        y: this.expectedNextPosition.y,
        t: (this.accelerate / (this.previousDistance * this.previousVelocity)) + this.previousPosition.t,
        p: this.previousPosition.p * Math.min(this.accelerate / (this.previousDistance * this.previousVelocity), 1)
      };
      for (var i = 0, n = this.bufferingSize; i < n; i++) {
        this.strokeBuffer.push(pos);
      }
      this.draw(true);
      //console.log('endStroke: this.previousVelocity=%d, this.accelerate=%d, this.previousDistance=%d', this.previousVelocity, this.accelerate, this.previousDistance);
    }
  }
  // -----

TheShodo.Shodo.StrokeEngine.prototype.getInterlatePos = function(p0, p1, moveLen) {
  /// <summary></summary>
  /// <param name="p0">a source position</param>
  /// <param name="p1">a destination position</param>
  /// <param name="moveLen"></param>
  /// <return>Object</return>
  var x = p0.x + (p1.x - p0.x) * moveLen;
  var y = p0.y + (p1.y - p0.y) * moveLen;

  return { x: x, y: y };
}

TheShodo.Shodo.StrokeEngine.prototype.getDistance = function(p0, p1) {
  /// <summary></summary>
  /// <param name="p0">a source position</param>
  /// <param name="p1">a destination position</param>
  /// <return>Number</return>
  var distance = ((p1.x - p0.x) * (p1.x - p0.x)) + ((p1.y - p0.y) * (p1.y - p0.y));
  return (distance == 0) ? distance : Math.sqrt(distance);
}

TheShodo.Shodo.StrokeEngine.prototype.getBufferedCurrentPosition = function() {
  /// <summary></summary>
  /// <return>Object</return>
  var pos = { x: 0, y: 0, t: 0, p: 0 };
  var bufferingSize = Math.min(this.bufferingSize, this.strokeBuffer.length);

  if (bufferingSize == 0) return null;

  for (var i = 1; i < bufferingSize + 1; i++) {
    var p = this.strokeBuffer[this.strokeBuffer.length - i];
    pos.x += p.x;
    pos.y += p.y;
    pos.t += p.t;
    pos.p += p.p;
  }

  pos.x /= bufferingSize;
  pos.y /= bufferingSize;
  pos.t /= bufferingSize;
  pos.p /= bufferingSize;

  return pos;
}


//!!!!!!
TheShodo.Shodo.StrokeEngine.prototype.draw = function(isEnding) {
  /// <summary>Draw stroke line.</summary>
  var pos = this.getBufferedCurrentPosition();
  if (pos == null) return;

  if (this.previousPosition == null)
    this.previousPosition = pos;

  // ---- stroke setup
  var t = (pos.t - this.previousPosition.t);
  var distance = this.getDistance(pos, this.previousPosition);
  var velocity = distance / Math.max(1, t);
  var accelerate = (this.previousVelocity == 0) ? 0 : velocity / this.previousVelocity;
  var curve = function(t, b, c, d) {
    return c * t / d + b;
  }
  var brushSize = Math.max(this.currentBrush.minSize,
    curve(velocity,
      this.currentBrush.maxSize,
      (-this.currentBrush.maxSize) - this.currentBrush.minSize,
      this.velocityPressureCoff
    )
  );
  if (pos.p > 0) {
    // Has pressure value
    brushSize = Math.max(this.currentBrush.minSize, this.currentBrush.maxSize * pos.p);
  }

  pos.s = brushSize;

  // ---- draw
  var ctx = this.canvasContext;
  ctx.save();
  this.drawStroke(ctx, this.previousPosition, pos, brushSize, distance, velocity);
  ctx.restore();
  // ----

  this.accelerate = accelerate;
  this.expectedNextPosition = this.getInterlatePos(this.previousPosition, pos, 1 + this.accelerate);
  this.previousPosition = pos;
  this.previousBrushSize = brushSize;
  this.previousVelocity = velocity;
  this.previousDistance = distance;
}

TheShodo.Shodo.StrokeEngine.prototype.drawStroke = function(ctx, startPos, endPos, brushSize, distance) {
  var t = 0;
  var brushDelta = (brushSize - this.previousBrushSize);

  // console.log('startPos ====', startPos);
  // console.log('endPos ====', endPos);

  while (t < 1) {
    var brushSizeCur = Math.min(this.previousBrushSize + (brushDelta * t), this.currentBrush.maxSize);
    var pos = this.getInterlatePos(startPos, endPos, t);


    var jitter = ((Math.random() > 0.5) ? 1 : -1) * parseInt(Math.random() * 1.2, 10);
    // console.log('pos ===', pos, brushSizeCur, jitter);

    if (Math.random() > 0.2) {
      // var px = pos.x - brushSizeCur / 2 + jitter;
      // var py = pos.y - brushSizeCur / 2 + jitter;
      var px = pos.x;
      var py = pos.y;
      ctx.drawImage(this.currentBrush.kasureImage, px, py, brushSizeCur, brushSizeCur);
    }
    t += 1 / distance;
  }
}

