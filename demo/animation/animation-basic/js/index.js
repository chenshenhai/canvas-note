(function() {

  // 绘制移动效果动画 canvas-1
  const canvas = document.getElementById('canvas-1');
  const requestAnimationFrame = window.requestAnimationFrame;
  canvas.width = 500;
  canvas.height = 500;
  const context = canvas.getContext('2d');

  let moveDistance = 100; // 移动距离
  let moveDirection = 1;  // 移动方向，1为向右，-1为向左

  // 绘制函数
  function draw(timestamp) {
    // 约间隔16.67ms, 每次浏览器执行重绘就移动 1px
    moveDistance = moveDistance + moveDirection * 1;
    context.fillStyle = 'red';
    // 清除画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 重绘图案
    context.fillRect(moveDistance, 200, 50, 50);
    // 控制距离，如果超出距离范围，就往反方向移动
    if (moveDistance > 400 || moveDistance < 100) {
      moveDirection = 0 - moveDirection;
    }
    // 重复执行移动
    requestAnimationFrame(draw);
  }

  // 开始执行移动
  requestAnimationFrame(draw);
  
})();