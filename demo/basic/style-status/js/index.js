(function() {
  // 样式状态 canvas-1
  const canvas = document.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  // 按顺序red, yellow, blue, green 填充色彩压入堆栈
  context.fillStyle = 'red';
  context.save();

  context.fillStyle = 'yellow';
  context.save();

  context.fillStyle = 'blue';
  context.save();

  context.fillStyle = 'green';
  context.save();

   // 出栈的颜色渲染按顺序green, blue, yellow, red, 色彩出栈渲染
  context.restore();
  context.fillRect(0, 100, 50, 50);
  
  context.restore();
  context.fillRect(100, 100, 50, 50);

  context.restore();
  context.fillRect(200, 100, 50, 50);

  context.restore();
  context.fillRect(300, 100, 50, 50);
  
})();
