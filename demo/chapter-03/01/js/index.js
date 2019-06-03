(function() {
  const canvasElem = document.getElementById('canvas-1');
  
  /**
   * 等比缩放渲染图片
   * @param {HTMLCanvasElement} canvas 
   * @param {object} opts
   * opts.imageSrc {string} 图片链接
   * opts.scale {number} 缩放比例默认 1
   */
  function drawImage(canvas, opts) {
    const { imageSrc,} = opts;
    const img = new window.Image();
    img.onload = function(){
      const drawWidth = img.width;
      const drawHeight = img.height;
      canvas.width = drawWidth;
      canvas.height = drawHeight;
      const ctx = canvas.getContext('2d');
      // 先清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 再绘制图片
      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
    }
    img.src = imageSrc;
  }

  drawImage(canvasElem, {
    imageSrc: './img/github-404.png',
  });


})();
