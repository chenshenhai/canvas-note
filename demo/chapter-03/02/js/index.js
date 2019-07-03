import {
  pickImage,
  downloadImageFromCanvas,
  displayImageFile,
} from './../../../lib/util/file.js';


(function() {
  const canvas = document.getElementById('canvas-1');

  const btnUpload = document.getElementById('J_Btn_Upload');
  const btnDownload = document.getElementById('J_Btn_Download');

  btnUpload.addEventListener('click', function() {
    pickImage({
      onError(err) {
        console.log(err);
        alert(err);
      },
      onSuccess(result = {}) {
        const imageFile = result.data;
        displayImageFile(imageFile, canvas)
      }
    })
  });
  btnDownload.addEventListener('click', function() {
    downloadImageFromCanvas(canvas, {
      filename: 'download-image.png',
      type: 'image/png',
    });
  });

})();
