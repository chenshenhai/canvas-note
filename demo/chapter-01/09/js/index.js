(function() {

  let isPainting = false;
  let lastPoint = {};
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');


  function start(x, y) {
    isPainting = true;
    lastPoint = {
      x: x - canvas.offsetLeft,
      y: y - canvas.offsetTop
    };
  }

  function move(x, y) {
    if (isPainting) {
      let newPoint = {
        x: x - canvas.offsetLeft,
        y: y - canvas.offsetTop
      };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  }

  function end() {
    isPainting = false;
  }

  canvas.addEventListener('mousedown', (e) => {
    start(e.clientX, e.clientY);
  });

  canvas.addEventListener('mousemove', (e) => {
    move(e.clientX, e.clientY)
  });

  canvas.addEventListener('mouseup', (e) => {
    end();
  })


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