import { loadImage } from '../../../lib/util/loader.js';
import { drawBackgroundColor } from './../../../lib/util/draw-block.js';

(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx2d = canvas.getContext('2d');

  loadImage('./../../../image/pexels-photo-005.jpg').then((image) => {
    const opts = { x: 0, y: 0, width: 200, height: 200 }
    drawBackgroundColor(ctx2d, { ...opts, ...{backgroundColor: '#f0f0f0'}})
    drawImageCenter(ctx2d, image, opts)
  }).catch(console.log);

  loadImage('./../../../image/pexels-photo-003.jpg').then((image) => {
    const opts = { x: 200, y: 200, width: 200, height: 200 }
    drawBackgroundColor(ctx2d, { ...opts, ...{backgroundColor: '#cccccc'}})
    drawImageCenter(ctx2d, image, opts)
  }).catch(console.log);


  function drawImageCenter(ctx2d, image, opts = {}) {
    const _opts = {...{
      x: 0, y: 0, width: 0, height: 0,
    }, ...opts};
    const { x, y } = _opts;
    const maxHeight = _opts.height;
    const maxWidth = _opts.width;
    const { height, width } = image;
    const scale = Math.max(width / maxWidth, height / maxHeight);

    const sx = 0;
    const sy = 0;
    const sw = width;
    const sh = height;
    const dw = width / scale;
    const dh = height / scale;

    const dx = x + (maxWidth - dw) / 2;
    const dy = y + (maxHeight - dh) / 2;

    ctx2d.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }
 
})();

