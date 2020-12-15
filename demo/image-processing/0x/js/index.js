(async function() {
  const canvas1 = document.getElementById('canvas-1');
  const canvas2 = document.getElementById('canvas-2');
  
  /**
   * 获取图片数据 getImageData
   * @param {HTMLCanvasElement} canvas 
   * @param {object} opts
   * opts.imageSrc {string} 图片链接
   */
  function getImageData(imageSrc) {
    const img = new window.Image();
    const canvas = document.createElement('canvas');
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

  function renderImage(canvas, imageData) {
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0); 
  }
  

  function parseGrayImageData(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const redChannel = data[i + 0];
      const greenChannel = data[i + 1];
      const blueChannel = data[i + 2];
      // const alphaChannel = data[i + 3];

      grayChannel = (redChannel + greenChannel + blueChannel) / 3;
      data[i + 0] = grayChannel;
      data[i + 1] = grayChannel;
      data[i + 2] = grayChannel;
      data[i + 3] = 255;
    }
    imageData.data = data;
    return imageData;
  }

  const imgData = await getImageData('./img/github-404.png');
  renderImage(canvas1, imgData);

  const grayImgData = parseGrayImageData(imgData);
  console.log('grayImgData = ', grayImgData);
  renderImage(canvas2, grayImgData);
  
  
})();
