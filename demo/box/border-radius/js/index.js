(function() {
  const { Image } = window;
  const canvas = document.querySelector("#canvas");
  const context = canvas.getContext("2d");
  const image = new Image();
  const drawImage = function(image, radius) {
    var pattern = context.createPattern(image, "no-repeat");
    drawBorderRadius(context, 0, 0, image.width, image.height, radius * 1 || 0);
    context.fillStyle = pattern;
    context.fill();    
  }

  image.onload = function() {
    const radius = 20;
    context.clearRect(0, 0, radius, radius);
    drawImage(this, radius);
  };
  image.src = "./../../../image/github-404.png";


  function drawBorderRadius (ctx, x, y, w, h, r) {
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
  }

})();

