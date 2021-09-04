import { drawBorder } from './draw-line.js';
import { drawBackgroundColor } from './draw-block.js';
import { createTextCanvas, calcText } from './text.js';
import { createBlockCanvas } from './block.js';

/**
 * @param {string} text 
 * @param {object} opts 
 */
export function drawText(ctx2d, text, opts = {  }) {
  const result = { width: 0, height: 0, }
  const _opts = { ...{
    x: 0,
    y: 0,
    fontSize: 12,
    fontFamily: 'Microsoft YaHei',
    color: '#000000',
  }, ...opts};
  const {
    x, y, fontSize, color, fontFamily, maxWidth, lineHeight, wordBreak, ellipsisLine,
    borderWidth, borderColor, borderRadius, backgroundColor, paddingLeft, paddingRight, paddingTop, paddingBottom,
  } = _opts;

  const { lines, width, height } = calcText(ctx2d, text, {
    fontSize, color, fontFamily, maxWidth, lineHeight, wordBreak, ellipsisLine,
    paddingLeft, paddingRight, paddingTop, paddingBottom,
  });

  // draw background
  drawBackgroundColor(ctx2d, {x, y, width, height, borderRadius, backgroundColor})

  // draw text
  ctx2d.fontSize = `${fontSize}px ${fontFamily}`;
  ctx2d.fillStyle = color,
  lines.forEach((line) => {
    const { text, maxWidth } = line;
    ctx2d.fillText(text, x + line.x, y + line.y, maxWidth)
  });


  // const blockCanvas = createBlockCanvas({ width, height, backgroundColor, borderColor, borderRadius, })
  // ctx2d.drawImage(blockCanvas, x, y, width, height);
  // ctx2d.drawImage(textCanvas, x, y, width, height);
  drawBorder(ctx2d, { x, y, width, height, borderRadius, borderColor, borderWidth })
  return { width, height };
}

