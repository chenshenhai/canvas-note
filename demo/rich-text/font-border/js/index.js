(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  drawText(context, 'hello canvas-note!', {
    y: 50,
    x: 50,
    size: 30,
    color: '#039ef9',
    borderColor: '#999999',
    borderWidth: 6,
  });

  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @param {string} text 
   * @param {object} opts 
   */
  function drawText(ctx, text, opts = {  }) {
    const _opts = { ...{
      x: 0,
      y: 0,
      size: 12,
      fontFamily: 'Microsoft YaHei',
      color: '#000000',
    }, ...opts };
    const {x, y, size, color, fontFamily, backgroundColor, borderColor, borderRadius, borderWidth } = _opts;
    ctx.textBaseline = 'top';
    ctx.font = `${size}px ${fontFamily}`;
    const maxWidth = ctx.canvas.width;
    const textMetrics = ctx.measureText(text);
    const h = size;
    const w = textMetrics.width;
    const r = borderRadius;
    const halfWidth = borderWidth / 2; //borderWidth / 2;

    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = color;
    ctx.fillText(text, x, y, maxWidth);

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;

    ctx.beginPath();
    ctx.moveTo(x - halfWidth * 2, y - halfWidth);
    ctx.lineTo(x + w + halfWidth, y - halfWidth);
    ctx.lineTo(x + w + halfWidth, y + h + halfWidth);
    ctx.lineTo(x - halfWidth, y + h + halfWidth);
    ctx.lineTo(x - halfWidth, y - halfWidth);
    ctx.stroke();
    ctx.closePath();  
  }
})();

