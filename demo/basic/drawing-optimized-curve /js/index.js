(function() {

  function getPosition(e) {
    return {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop,
    }
  }
  
  let isDrawing = false;
  let points = [];
  let beginPoint = null;
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  canvas.addEventListener('mousedown', start, false);
  canvas.addEventListener('mousemove', move, false);
  canvas.addEventListener('mouseup', end, false);

  function start(e) {
    isDrawing = true;
    const { x, y } = getPosition(e);
    points.push({x, y});
    beginPoint = {x, y};
  }

  function move(e) {
    if (!isDrawing) return;

    const { x, y } = getPosition(e);
    points.push({x, y});

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = {
        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
      }
      drawLine(beginPoint, controlPoint, endPoint);
      beginPoint = endPoint;
    }
  }

  function end(e) {
    if (!isDrawing) {
      return;
    }
    const { x, y } = getPosition(e);
    points.push({x, y});

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = lastTwoPoints[1];
      drawLine(beginPoint, controlPoint, endPoint);
    }
    beginPoint = null;
    isDrawing = false;
    points = [];
  }

  function drawLine(beginPoint, controlPoint, endPoint) {
    ctx.beginPath();
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
  }

})()