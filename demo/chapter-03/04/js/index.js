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


  /**
   * 下载图片操作 downloadImage
   * @param {string} filename 图片名称
   * @param {HTMLCanvasElement} canvas 画布document对象 
   */
  function downloadImage(filename, canvas) {
    // 将canvas的图片字符串数据取出
    const stream = canvas.toDataURL("image/png");
    // 设置下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = stream;
    // 设置下载文件名称
    downloadLink.download = filename;
    // 设置点击事件
    const downloadClickEvent = document.createEvent('MouseEvents');
    // 出发点击事件
    downloadClickEvent.initEvent('click', true, false);
    downloadLink.dispatchEvent(downloadClickEvent);
  }


  const btn = document.getElementById('J_Btn');

  btn.addEventListener('click', function() {
    drawRotate(canvas);
  });
})();
