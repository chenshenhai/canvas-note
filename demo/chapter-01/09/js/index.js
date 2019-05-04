(function() {
  const canvas = document.getElementById('canvas-1');

  function displayImage(imageFile) {
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

  const inputFile = document.getElementById('J_UploadFile');
  inputFile.addEventListener('change', function() {
    const imageFile = this.files[0];
    if (!/\.(jpg|png)$/.test(imageFile.name)) {
      throw Errow('no image file!');
    }
    displayImage(imageFile);
  });

})();
