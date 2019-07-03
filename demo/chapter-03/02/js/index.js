(function() {
  const canvas = document.getElementById('canvas-1');

  /**
   * 图片文件数据流显示
   * @param {File} imageFile 图片类文件对象
   * @param {HTMLCanvasElement} canvas 画布document对象 
   */
  function displayImage(imageFile, canvas) {
    // 初始化一个文件读取器
    const fileReader = new FileReader();

    // 设置文件读取结束事件
    fileReader.onload = function() {
      const img = new Image();
      // 将文件流的base64字符串数据 this.result 传入 图片对象 
      img.src = this.result;
      img.onload = function() {
        // 图片加载结束后
        // 将图片数据传入 canvas 的上下文context中
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    };
    // 开始读取图片类文件对象内容
    // 读取结束后会文件对象以字符串格式传入 this.result 属性中
    fileReader.readAsDataURL(imageFile);
  }

  /**
   * 上传图片操作 uploadImage
   * @param {HTMLCanvasElement} canvas 画布document对象 
   */
  function uploadImage(canvas) {
    // 初始化一个 input[type="file"] 的dom
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    // 设置变更事件
    inputFile.addEventListener('change', function() {
      const imageFile = this.files[0];
      if (!/\.(jpg|png)$/.test(imageFile.name)) {
        throw Errow('no image file!');
      }
      // 图片文件读取完毕后，将图片类文件数据显示在canvas上
      displayImage(imageFile, canvas);
    });
    // 出发文件读取的点击
    inputFile.click();
  }

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


  const btnUpload = document.getElementById('J_Btn_Upload');
  const btnDownload = document.getElementById('J_Btn_Download');

  btnUpload.addEventListener('click', function() {
    uploadImage(canvas);
  });
  btnDownload.addEventListener('click', function() {
    downloadImage('download-image.png', canvas);
  });

})();
