(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  drawText(context, '1234567890abcdefghijkl', {
    y: 50,
    x: 50,
    size: 30,
    maxWidth: 200,
    color: '#039ef9',
    borderColor: '#999999',
    borderWidth: 6,
  });

  /**
   * @param {CanvasRenderingContext2D} ctx2d 
   * @param {string} text 
   * @param {object} opts 
   */
  function drawText(ctx2d, text, opts = {  }) {
    const _opts = { ...{
      x: 0,
      y: 0,
      size: 12,
      lineHeight: 20,
      fontFamily: 'Microsoft YaHei',
      color: '#000000',
      maxWidth: ctx2d.canvas.width,
    }, ...opts };
    const {x, y, size, color, fontFamily, backgroundColor, borderColor, borderRadius, borderWidth, maxWidth, lineHeight } = _opts;
    ctx2d.textBaseline = 'top';
    ctx2d.font = `${size}px ${fontFamily}`;
    let fontHeight = lineHeight || size;
    const textMetrics = ctx2d.measureText(text);
    const h = size;
    const w = textMetrics.width;
    const r = borderRadius;
    const halfWidth = borderWidth / 2; //borderWidth / 2;

    const lines = calcTextLines(ctx2d, text, maxWidth);


    ctx2d.fillStyle = backgroundColor;
    ctx2d.fillRect(x, y, maxWidth, h * lines.length);
    
    ctx2d.fillStyle = color;
    for (let i = 0; i < lines.length; i++) {
      console.log('lines[i] =', lines[i])
      ctx2d.fillText(lines[i] || '', x, y + i * fontHeight, maxWidth);
    }
    
  }

  function calcTextLines(ctx2d, text, maxWidth) {
    const fonts = text.split('');
    const lines = [];
    let tempLine = '';
    for (let i = 0; i < fonts.length; i ++) {
      const textMetrics = ctx2d.measureText(tempLine + fonts[i]);
      if (textMetrics.width > maxWidth) {
        lines.push(tempLine);
        tempLine = fonts[i];
      } else {
        tempLine = tempLine + fonts[i];
      }
      if (i === fonts.length - 1) {
        lines.push(tempLine);
      }
    }
    return lines;
  }
})();

