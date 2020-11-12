(function() {

  let isPainting = false;
  let lastPoint = {};
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  canvas.onmousedown = function (e) {
    isPainting = true;
    let x = e.clientX;
    let y = e.clientY;
    lastPoint = {
      x: x,
      y: y
    };
  };

  canvas.onmousemove = function (e) {
    if (isPainting) {
      let x = e.clientX;
      let y = e.clientY;
      let newPoint = {
        x: x,
        y: y
      };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  };

  canvas.onmouseup = function () {
    isPainting = false;
  }



  function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }
})();