(function() {
  const canvas = document.getElementById('canvas-1');

  /**
   * 图片文件数据流显示
   * @param {File} imageFile 
   * @param {HTMLCanvasElement} canvas 画布document对象 
   */
  function displayImage(imageFile, canvas) {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const img = new Image();
      img.src = this.result;
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    };
    fileReader.readAsDataURL(imageFile);
  }

  /**
   * 上传图片操作 uploadImage
   * @param {HTMLCanvasElement} canvas 画布document对象 
   */
  function uploadImage(canvas) {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.addEventListener('change', function() {
      const imageFile = this.files[0];
      if (!/\.(jpg|png)$/.test(imageFile.name)) {
        throw Errow('no image file!');
      }
      displayImage(imageFile, canvas);
    });
    inputFile.click();
  }

  /**
   * 下载图片操作 downloadImage
   * @param {string} filename 图片名称
   * @param {HTMLCanvasElement} canvas 画布document对象 
   */
  function downloadImage(filename, canvas) {
    const stream = canvas.toDataURL("image/png");
    const downloadLink = document.createElement('a');
    downloadLink.href = stream;
    downloadLink.download = filename;
    const downloadClickEvent = document.createEvent('MouseEvents');
    downloadClickEvent.initEvent('click', true, false);
    downloadLink.dispatchEvent(downloadClickEvent);
  }


  const btnUpload = document.getElementById('J_Btn_Upload');
  const btnDownload = document.getElementById('J_Btn_Download');

  btnUpload.addEventListener('click', function() {
    uploadImage(canvas);
  });
  btnDownload.addEventListener('click', function() {
    downloadImage('download-image.png', canvas);
  });

})();
