(function() {
  // 绘制阴影 canvas-1
  const canvas = document.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  
  context.shadowColor = "blue";
  context.shadowBlur = 20;
  context.shadowOffsetX = 20;
  context.shadowOffsetY = 20;

  context.fillStyle = "#aaa";
  context.fillRect(50, 50, 100, 100);
})();
