const defaultOpts = {
  fontSize: 12,
  lineHeight: 12,
  fontFamily: 'Microsoft YaHei',
  color: '#000000',
  wordBreak: undefined,
  ellipsisLine: undefined,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
}

export function createTextCanvas(text, opts = {}) {
  const canvas = document.createElement('canvas');
  const ctx2d = canvas.getContext('2d');
  const _opts = { ...defaultOpts, ...opts};
  const {
    fontSize, color, fontFamily, maxWidth, lineHeight, wordBreak, ellipsisLine,
    paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0,
  } = _opts;

  let fontHeight = lineHeight;
  if (!fontHeight) {
    fontHeight = fontSize;
  }

  const { lines, width, height } = calcText(ctx2d, text, _opts);
  canvas.width = width;
  canvas.height = height;

  ctx2d.fillStyle = color;
  ctx2d.textBaseline = 'top';
  ctx2d.font = `${fontSize}px ${fontFamily}`;
  const fixY = (lineHeight - fontSize) / 2;
  for (let i = 0; i < lines.length; i++) {
    const displayText = lines[i].text || '';
    const x = paddingLeft
    const y = paddingTop + fixY + i * fontHeight
    ctx2d.fillText(displayText, x, y, lines[i].maxWidth + paddingLeft + paddingRight);
  }
  return canvas;
}


export function calcText(ctx2d, text, opts = {}) {
  const _opts = { ...defaultOpts, ...opts};
  const {
    fontSize, color, fontFamily, maxWidth, lineHeight, wordBreak, ellipsisLine,
    paddingLeft = 0, paddingRight = 0, paddingTop = 0, paddingBottom = 0,
  } = _opts;

  ctx2d.textBaseline = 'top';
  ctx2d.font = `${fontSize}px ${fontFamily}`;

  let wordLines = calcWordLines(ctx2d, text, maxWidth, wordBreak, ellipsisLine);
  let textWidth = maxWidth + paddingLeft + paddingRight;

  let fontHeight = lineHeight;
  if (!fontHeight) {
    fontHeight = fontSize;
  }

  const lines = [];
  wordLines.forEach((line, i) => {
    textWidth = Math.max(textWidth, line.maxWidth + paddingLeft + paddingRight);
    const fixY = (lineHeight - fontSize) / 2;
    const x = paddingLeft
    const y = paddingTop + fixY + i * fontHeight;
    lines.push({
      text: line.text,
      maxWidth: line.maxWidth,
      x,
      y,
    })
  });
  let textHeight = lineHeight * lines.length + paddingTop + paddingBottom;

  return {
    lines: lines,
    width: textWidth,
    height: textHeight,
  }
}


function calcWordLines(ctx2d, text, maxWidth, wordBreak, ellipsisLine) {
  const fonts = text.split('');
  const lines = [];
  let tempLine = '';
  let word = [];
  if (['break-word', 'break-all'].indexOf(wordBreak) >= 0) {
    for (let i = 0; i < fonts.length; i ++) {
      let char = fonts[i];
      if ((/^[a-zA-Z]{1,1}$/.test(`${char}`) || /^[0-9]{1,1}$/.test(`${char}`)) && wordBreak === 'break-word') {
        word.push(char);
      } else {
        const textMetrics = ctx2d.measureText(tempLine + word.join('') + char);
        if (textMetrics.width > maxWidth) {
          lines.push({ text: tempLine, maxWidth });
          tempLine = word.join('') + char; 
          word = [];

          const textMetrics = ctx2d.measureText(tempLine);
          if (textMetrics.width > maxWidth) {
            lines.push({ text: tempLine, maxWidth: calcTotalTextWidth(ctx2d, tempLine) });
            tempLine = '';
          }
        } else {
          tempLine = tempLine + word.join('') + char; 
          word = [];
        }

        if (lines.length === ellipsisLine) {
          break;
        }
      }
      
      if (i === fonts.length - 1) {
        lines.push({ text: tempLine, maxWidth,});
        if (word.length > 0) {
          const tempLine = word.join('');
          lines.push({ text: tempLine, maxWidth: calcTotalTextWidth(ctx2d, tempLine) })
        }
      }
    }
  } else {
    lines.push({
      text: text,
      maxWidth: calcTotalTextWidth(ctx2d, text)
    })
  }

  

  if (ellipsisLine > 0) {
    const ellipsisStr = '...';
    if (lines[ellipsisLine - 1]) {
      tempLine = '';
      const lastLine = lines[ellipsisLine - 1];
      for (let i = 0; i < lastLine.text.length; i ++) {
        const textMetrics = ctx2d.measureText(tempLine + lastLine.text[i] + ellipsisStr);
        if (textMetrics.width > maxWidth) {
          break;
        } else {
          tempLine = tempLine + lastLine.text[i];
        }
      }
      tempLine = tempLine + ellipsisStr;
      lines[ellipsisLine - 1].text = tempLine;
      lines[ellipsisLine - 1].maxWidth = maxWidth;
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