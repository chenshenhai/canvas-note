(function() {
  const { Image } = window;
  const canvas = document.querySelector("#canvas");
  const context = canvas.getContext("2d");
  const image = new Image();
  const x = 40;
  const y = 40;
  const radius = 30;
  const lineWidth = 20;
  const limitWidth = 200;
  const limitHeight = 200;
  const color = '#666666'
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
    cvs.width = limitWidth + x;
    cvs.height = limitHeight + y;
    ctx2d.drawImage(img, x, y, limitWidth, limitHeight);
    
    drawImage(cvs, limitWidth, limitHeight, radius);
  };
  image.src = "./../../../image/lena.png";


  function drawBorderRadius (ctx, x, y, w, h, r, pattern) {
    let radius = Math.min(w, h);
    if (r > radius / 2) {
      r = radius / 2;
    }


    const borderR = r + lineWidth / 2;
    const addW = lineWidth / 2
    ctx.beginPath();
    ctx.moveTo(x + r, y - addW);
    ctx.arcTo(x + w + addW, y - addW, x + w + addW, y + h, borderR);
    ctx.arcTo(x + w + addW, y + h + addW, x, y + h +addW, borderR);
    ctx.arcTo(x - addW, y + addW + h, x - addW, y, borderR);
    ctx.arcTo(x - addW, y - addW, x + w, y - addW, borderR);
    // ctx.closePath();  
    // ctx.fillStyle = color;
    // ctx.fill(); 
    
    ctx.closePath();  
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();

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



