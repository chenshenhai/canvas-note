(function() {
  const canvasElem = document.getElementById('canvas-1');
  canvasElem.width = 1001;
  canvasElem.height = 501;
  
  /**
   * 等比缩放渲染图片
   * @param {HTMLCanvasElement} canvas 
   * @param {object} opts
   * opts.imageSrc {string} 图片链接
   * opts.scale {number} 缩放比例默认 1
   */
  function drawScaleImage(canvas, opts = {}) {
    const { imageSrc, scale = 1 } = opts;
    const img = new window.Image();
    img.onload = function(){
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const ctx = canvas.getContext('2d');
      // 先清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 再绘制图片
      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
    }
    img.src = imageSrc;
  }

  /**
   * 截取图片
   * @param {HTMLCanvasElement} canvas 
   * @param {object} opts
   * opts.imageSrc {string} 图片链接
   * opts.slice {number} 剪切比例
   */
  function drawSliceImage(canvas, opts = {}) {
    const { imageSrc, slice = 1} = opts;
    const img = new window.Image();
    img.onload = function(){
      const drawWidth = img.width;
      const drawHeight = img.height;
      const ctx = canvas.getContext('2d');
      // 先清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 再绘制图片
      // ctx.drawImage(img, 0, 0, drawWidth, drawHeight, 0, 0, drawWidth * slice, drawHeight * slice);
      ctx.drawImage(img, 0, 0, drawWidth * slice, drawHeight * slice, 0, 0, drawWidth * slice, drawHeight * slice);
    }
    img.src = imageSrc;
  }

  drawScaleImage(canvasElem, {
    imageSrc: './img/github-404.png',
    scale: 1,
  });


  const btnScaleList = document.querySelectorAll('.J_Btn_Scale');
  btnScaleList.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      const scaleRatio = event.target.getAttribute('data-scale') * 1
      drawScaleImage(canvasElem, {
        imageSrc: './img/github-404.png',
        scale: scaleRatio,
      });
    });
  })

  const btnSliceList = document.querySelectorAll('.J_Btn_Slice');
  btnSliceList.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      const sliceRatio = event.target.getAttribute('data-slice') * 1;
      drawSliceImage(canvasElem, {
        imageSrc: './img/github-404.png',
        slice: sliceRatio,
      });
    });
  })


})();
