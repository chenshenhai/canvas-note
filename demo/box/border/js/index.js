(function() {
  const { Image } = window;
  const canvas = document.querySelector("#canvas");
  const context = canvas.getContext("2d");
  const image = new Image();
  const x = 40;
  const y = 40;
  const radius = 50;
  const drawImage = function(image, width, height, radius) {
    var pattern = context.createPattern(image, "no-repeat");
    drawBorderRadius(context, x, y, width, height, radius * 1 || 0, pattern);
  }

  image.onload = function() {
    const img = this;
    const { width, height } = img;
    // context.clearRect(0, 0, width, height);
    const cvs = document.createElement('canvas');
    const ctx2d = cvs.getContext('2d');
    cvs.width = width + x;
    cvs.height = height + y;
    ctx2d.drawImage(img, x, y, width, height);
    
    drawImage(cvs, width, height, radius);
  };
  image.src = "./../../../image/github-404.png";


  function drawBorderRadius (ctx, x, y, w, h, r, pattern) {
    let radius = Math.min(w, h);
    if (r > radius / 2) {
      r = radius / 2;
    }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();  
    ctx.fillStyle = pattern;
    ctx.fill();  
    
  }

})();



