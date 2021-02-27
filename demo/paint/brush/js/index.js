(function() {

  let isPainting = false;
  let lastPoint = {};
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  let positions = [];

  function start(x, y) {
    isPainting = true;
    positions = [];
    lastPoint = {
      x: x - canvas.offsetLeft,
      y: y - canvas.offsetTop,
      t: Date.now(),
    };
    positions.push(lastPoint)
  }

  function move(x, y) {
    if (isPainting) {
      let newPoint = {
        x: x - canvas.offsetLeft,
        y: y - canvas.offsetTop,
        t: Date.now(),
      };
      lastPoint = newPoint;
      positions.push(newPoint);
      drawBrush(positions);
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



  let prevVelocity = 0;
  function drawBrush(positions) {
    if (positions.length < 2) {
      return;
    }
    const end = positions[positions.length - 1];
    const start = positions[positions.length - 2];
    const d = Math.sqrt(Math.abs(
      (end.x - start.x) * (end.x - start.x) - (end.y - start.y) * (end.y - start.y)
    ));
    const v = d / (end.t - start.t);

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0 0 0 / 20%)';
    ctx.strokeStyle = 'rgb(0 0 0 / 0%)';
    ctx.arc(end.x, end.y, 10, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    prevVelocity = v;
  }
})();