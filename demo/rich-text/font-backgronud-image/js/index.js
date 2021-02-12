import { loadImage, loadPattern } from '../../../lib/util/loader.js';

(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  drawText(context, 'hello canvas-note!', {
    x: 30,
    y: 50,
    size: 40,
    color: '#66b6e4f0',
    backgroundImage: './../../../image/pexels-photo-005.jpg'
  })


  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @param {string} text 
   * @param {object} opts 
   */
  function drawText(ctx, text, opts = { }) {
    const _opts = { ...{
      x: 0,
      y: 0,
      size: 12,
      fontFamily: 'Microsoft YaHei',
      color: '#000000',
      maxWidth: ctx.canvas.width 
    }, ...opts };
    const {x, y, size, color, fontFamily, maxWidth, backgroundImage } = _opts;
    ctx.textBaseline = 'top';
    ctx.font = `${size}px ${fontFamily}`;
    const textMetrics = ctx.measureText(text);
    const height = size;
    const width = textMetrics.width;

    loadImage(backgroundImage).then((img) => {
      const pat = loadPattern(img, { x, y, width: img.width, height: img.height });

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x, y);
      ctx.closePath(); 
      
      ctx.fillStyle = pat;
      ctx.fill();  

      ctx.fillStyle = color;
      ctx.fillText(text, x, y, maxWidth);
    }).catch((err) => {
      console.log(err)
    })

    // ctx.fillStyle = backgroundColor;
    // ctx.fillRect(x, y, width, height);

    
  }
})();

