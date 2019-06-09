(function() {
  const canvas = document.getElementById('canvas-1');
  
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

  drawImage(canvas, {
    imageSrc: './img/github-404.png',
  });

  const btnRotate = document.getElementById('J_Btn_RotateClockWise');
  const btnRotateAnti = document.getElementById('J_Btn_RotateAntiClockWise');

  function drawRotate(canvas, isAnti) {
    const context = canvas.getContext('2d');
    const imageBase64 = canvas.toDataURL("image/png");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const direction = isAnti === true ? -1 : 1;

    const image = new window.Image();
    image.src = imageBase64;
    image.onload = function() {
      const imgWidth = image.naturalWidth;
      const imgHeight = image.naturalHeight;

      canvas.width = imgHeight;
      canvas.height = imgWidth;
      if (direction === 1) {
        context.translate(canvas.width, 0);
      } else {
        context.translate(0, canvas.height);
      }
      context.rotate(Math.PI / 2 * direction);
      context.drawImage(image, 0, 0, imgWidth, imgHeight);

    }
  }

  

  btnRotate.addEventListener('click', function() {
    console.log('---- btnRotate ---');
    drawRotate(canvas);
  });

  btnRotateAnti.addEventListener('click', function() {
    console.log('---- btnRotateAnti ---');
    drawRotate(canvas, true);
  })
  

})();
