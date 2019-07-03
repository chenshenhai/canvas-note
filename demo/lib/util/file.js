/**
 * 上传图片操作 uploadImage
 */
export const pickImage = function (opts) {
  const { onSuccess, onError } = opts;
  // 初始化一个 input[type="file"] 的dom
  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  // 设置变更事件
  inputFile.addEventListener('change', function() {
    const imageFile = this.files[0];
    if (!/\.(jpg|png)$/.test(imageFile.name)) {
      const err = Errow('no image file!');
      onError(err);
    } else {
      // 图片文件读取完毕后，将图片类文件返回
      onSuccess({
        data: imageFile,
      });
    }
  });
  // 出发文件读取的点击
  inputFile.click();
}

/**
 * 下载图片操作 downloadImage
 * @param {string} filename 图片名称
 * @param {HTMLCanvasElement} canvas 画布document对象 
 */
export const downloadImageFromCanvas = function (canvas, opts = {}) {
  const { filename, type = 'image/jpg' } = opts;
  // 将canvas的图片字符串数据取出
  const stream = canvas.toDataURL(type);
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


export const readerImageFile = function(imageFile) {
  return new Promise(function(resolve, reject) {
    // 初始化一个文件读取器
    const fileReader = new FileReader();

    // 设置文件读取结束事件
    fileReader.onload = function() {
      // 将文件流的base64字符串数据 this.result 传入 图片对象 
      resolve({
        data: this.result,
      });
    };
    fileReader.onerror = function(event) {
      fileReader.abort();
      reject(new Error('image reader error'));
    };
    // 开始读取图片类文件对象内容
    // 读取结束后会文件对象以字符串格式传入 this.result 属性中
    fileReader.readAsDataURL(imageFile);
  })
}


/**
* 图片文件数据流显示
* @param {File} imageFile 图片类文件对象
* @param {HTMLCanvasElement} canvas 画布document对象 
*/
export const displayImageFile = function(imageFile, canvas) {

  return new Promise(function(resolve, reject) {
    readerImageFile(imageFile).then(function(result = {}) {
      const base64 = result.data;

      const img = new Image();
      // 将文件流的base64字符串数据 this.result 传入 图片对象 
      img.src = base64;
      img.onload = function() {
        // 图片加载结束后
        // 将图片数据传入 canvas 的上下文context中
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve({
          success: true,
        })
      }
      img.onerror = function() {
        reject(new Error('image 404'));
      }
    }).catch(function(err) {
      reject(err);
    });
  })
}

