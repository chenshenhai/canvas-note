(function(doc) {

  // 绘制运动 canvas-1
  const canvas = doc.getElementById('canvas-1');
  const requestAnimationFrame = window.requestAnimationFrame;
  canvas.width = 500;
  canvas.height = 500;
  const context = canvas.getContext('2d');
  let moveDistance = 100;
  let moveTimestamp = 0;
  let moveDirection = 1;

  function draw(timestamp) {
    if (!(moveTimestamp > 0)) {
      moveTimestamp = timestamp;
    }
    moveDistance = moveDistance + moveDirection * (timestamp - moveTimestamp) / 10;
    context.fillStyle = 'red';
    // TODO
    console.log('moveDistance =', moveDistance,' timestamp =', timestamp, ' moveTimestamp = ', moveTimestamp);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(moveDistance, 200, 50, 50);
    if (moveDistance > 400 || moveDistance < 100) {
      moveDirection = 0 - moveDirection;
    }
    requestAnimationFrame(draw);
    moveTimestamp = timestamp;
  }

  requestAnimationFrame(draw);
  
})(document);