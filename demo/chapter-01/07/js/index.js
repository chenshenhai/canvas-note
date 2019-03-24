(function() {
  // 位移 canvas-1
  const canvas = document.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  context.fillRect(0, 0, 100, 100);
  // 将原点移动到 坐标(200, 200)
  context.translate(200, 200);
  // 此时原点坐标为(200, 200)，画图坐标为(0, 0)是以(200, 200)为相对原点
  context.fillRect(0, 0, 100, 100);
})();


(function() {
  // 旋转 canvas-2
  const canvas = document.getElementById('canvas-2');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  // 默认一个黑色正方形
  context.fillStyle = '#000';
  context.fillRect(100, 100, 100, 100);
  
  // 以原点坐标为(100, 100)
  context.translate(100, 100);
  // 旋转角度为PI/4，即度数为 45°，
  context.rotate(Math.PI / 4);
  // 画出一个旋转了的正方形
  context.fillStyle = '#ccc';
  context.fillRect(0, 0, 100, 100);
})();


(function() {
  // 旋转 canvas-3
  const canvas = document.getElementById('canvas-3');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  // 默认一个黑色正方形
  context.fillStyle = '#000';
  context.fillRect(100, 100, 100, 100);
  
  context.scale(0.5,0.5);
  // 画出一个缩放0.5倍的正方形
  context.fillStyle = '#ccc';
  context.fillRect(100, 100, 100, 100);
  // 会发现(x, y)偏移原点的长度也缩放了0.5倍
})();
