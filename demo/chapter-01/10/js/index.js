(function() {
  const canvasElem = document.getElementById('canvas-1');
  

  function drawImage(canvas, imageUrl) {
    const img = new window.Image();
    img.onload = function(){
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    img.src = imageUrl;
  }

  drawImage(canvasElem, './img/github-404.png')

})();
