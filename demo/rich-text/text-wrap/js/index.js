(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas');

  canvas.width = 501;
  canvas.height = 501;
  const context = canvas.getContext('2d');

  const textEn = 'To be or not to be: that is a question. (Hamlet)';
  const textCn = '生存还是毁灭，这是个值得思考的问题。——莎士比亚《哈姆雷特》'

  drawText(context, textEn, {
    x: 0,
    y: 0,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#039ef9',
  });
  drawText(context, textCn, {
    x: 0,
    y: 30,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#039ef9',
  });

  drawText(context, textEn, {
    x: 0,
    y: 100,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0',
    wordBreak: 'break-all', // break-all, break-word
  });
  drawText(context, textCn, {
    x: 250,
    y: 100,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0',
    wordBreak: 'break-all', // break-all, break-word
  });


  drawText(context, textEn, {
    x: 0,
    y: 250,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0',
    wordBreak: 'break-word', // break-all, break-word
  });

  drawText(context, '这件战国古董价值123456789块，是不是太贵了？', {
    x: 250,
    y: 250,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0',
    wordBreak: 'break-word', // break-all, break-word
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
      fontSize: 12,
      fontFamily: 'Microsoft YaHei',
      color: '#000000',
      maxWidth: ctx2d.canvas.width,
    }, ...opts };
    const {x, y, fontSize, color, fontFamily, maxWidth, lineHeight, wordBreak } = _opts;
    
    let fontHeight = lineHeight;
    let renderWidth = maxWidth;
    if (!fontHeight) {
      fontHeight = fontSize;
    }
    
    ctx2d.textBaseline = 'top';
    ctx2d.font = `${fontSize}px ${fontFamily}`;


    let lines = [text];
    if (wordBreak === 'break-all') {
      lines = calcFontLines(ctx2d, text, maxWidth);
    } else if (wordBreak === 'break-word') {
      lines = calcWordLines(ctx2d, text, maxWidth);
    } else {
      renderWidth = calcTotalTextWidth(ctx2d, text);
    }
    ctx2d.fillStyle = color;
    for (let i = 0; i < lines.length; i++) {
      ctx2d.fillText(lines[i] || '', x, y + i * fontHeight, renderWidth);
    }
    
  }

  function calcWordLines(ctx2d, text, maxWidth) {
    const fonts = text.split('');
    const lines = [];
    let tempLine = '';
    let word = [];
    for (let i = 0; i < fonts.length; i ++) {
      const char = fonts[i];
      if (isLetterChar(char) || isNumChar(char)) {
        word.push(char);
      } else {
        const textMetrics = ctx2d.measureText(tempLine + word.join('') + char);
        if (textMetrics.width > maxWidth) {
          lines.push(tempLine);
          tempLine = word.join('') + char; 
          word = [];

          const textMetrics = ctx2d.measureText(tempLine);
          if (textMetrics.width > maxWidth) {
            lines.push(tempLine);
            tempLine = '';
          }
        } else {
          tempLine = tempLine + word.join('') + char; 
          word = [];
        }
      }
      
      if (i === fonts.length - 1) {
        lines.push(tempLine);
      }
    }
    return lines;
  }

  function isLetterChar(char) {
    return /^[a-zA-Z]{1,1}$/.test(`${char}`)
  }

  function isNumChar(char) {
    return /^[0-9]{1,1}$/.test(`${char}`)
  }

  function calcFontLines(ctx2d, text, maxWidth) {
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

  function calcTotalTextWidth(ctx2d, text) {
    const fonts = text.split('');
    let totalWidth = 0;
    for (let i = 0; i < fonts.length; i ++) {
      const textMetrics = ctx2d.measureText(fonts[i]);
      totalWidth += textMetrics.width;
    }
    return totalWidth;
  }
})();

