(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  drawText(context, 'hello canvas-note!', {
    y: 50,
    size: 40,
    color: '#039ef9',
    backgroundColor: '#F0F0F0' 
  })


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
      maxWidth: ctx.canvas.width 
    }, ...opts };
    const {x, y, size, color, fontFamily, maxWidth, backgroundColor } = _opts;
    ctx.textBaseline = 'top';
    ctx.font = `${size}px ${fontFamily}`;
    const textMetrics = ctx.measureText(text);
    const height = size;
    const width = textMetrics.width;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = color;
    ctx.fillText(text, x, y, maxWidth);
  }
})();

