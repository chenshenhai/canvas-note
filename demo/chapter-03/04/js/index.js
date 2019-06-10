(async function() {
  const canvas1 = document.getElementById('canvas-1');
  const canvas2 = document.getElementById('canvas-2');
  
  /**
   * 异步渲染图片并且获取图片数据
   * @param {HTMLCanvasElement} canvas 
   * @param {object} opts
   * opts.imageSrc {string} 图片链接
   */
  function drawImageAndGetData(canvas, opts) {
    const { imageSrc,} = opts;
    const img = new window.Image();
    return new Promise(function(resolve, reject) {
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
        const imgData = ctx.getImageData(0, 0, drawWidth, drawHeight);
        resolve(imgData);
      }
      img.onerror = function(err) {
        reject(err);
      }
      img.src = imageSrc;
    });
  }

  const imgData = await drawImageAndGetData(canvas1, { imageSrc: './img/github-404.png', });
  console.log('imgData = ', imgData);
  
})();
