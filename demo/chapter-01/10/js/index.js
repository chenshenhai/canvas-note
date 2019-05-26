(function() {
  const canvasElem = document.getElementById('canvas-1');
  canvasElem.width = 1001;
  canvasElem.height = 501;
  
  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {object} opts
   * opts.imageSrc {string} 图片链接
   * opts.scale {number} 百分比
   */
  function drawImage(canvas, opts = {}) {
    const { imageSrc, scale = 100 } = opts;
    const img = new window.Image();
    img.onload = function(){
      const drawWidth = img.width * scale / 100;
      const drawHeight = img.height * scale /  100;
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
    scale: 100,
  });


  const btnScaleList = document.querySelectorAll('.J_Btn_Scale');
  btnScaleList.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      const scalePercent = event.target.getAttribute('data-scale') * 1
      drawImage(canvasElem, {
        imageSrc: './img/github-404.png',
        scale: scalePercent,
      });
    });
  })


})();
