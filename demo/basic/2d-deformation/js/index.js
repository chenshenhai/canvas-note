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
  
  // 以原点坐标为(100, 100)
  context.translate(100, 100);
  // 旋转角度为PI/4，即度数为 45°，
  context.rotate(Math.PI / 4);
  // 画出一个旋转了的正方形
  context.fillStyle = '#ccc';
  context.fillRect(0, 0, 100, 100);

  // 清除旋转影响
  context.rotate(0 - Math.PI / 4);
  context.translate(-100, -100);
  
  context.fillStyle = '#000';
  context.fillRect(100, 100, 100, 100);
})();


(function() {
  // 缩放 canvas-3
  const canvas = document.getElementById('canvas-3');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  // 默认一个黑色正方形
  context.fillStyle = '#000';
  context.fillRect(100, 100, 100, 100);
  
  context.scale(0.5,0.5);
  // 画出一个缩放0.5倍的灰色正方形
  context.fillStyle = '#ccc';
  context.fillRect(100, 100, 100, 100);
  // 会发现(x, y)偏移原点的长度也缩放了0.5倍
})();


(function() {
  // 变形 canvas-4
  const canvas = document.getElementById('canvas-4');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  context.globalAlpha = 0.5;

  // 默认一个黑色正方形
  context.fillStyle = '#000';
  context.fillRect(100, 100, 100, 100);
  
  context.transform(1, Math.sin(Math.PI/4), 0, 1, 0, 0)
  // 画出一个变形的正方形
  context.fillStyle = 'red';
  context.fillRect(100, 100, 100, 100);

  context.resetTransform();
  context.transform(1, 0, Math.sin(Math.PI/4), 1, 0, 0)
  // 画出一个变形的正方形
  context.fillStyle = 'blue';
  context.fillRect(100, 100, 100, 100);
})();


(function() {
  // 变形 canvas-5
  const canvas = document.getElementById('canvas-5');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  context.globalAlpha = 0.5;
  
  let transformX = Math.PI * 0;
  let transformRate = 1/180;
  let transformDirect = 1;

  // 绘制函数
  function draw(timestamp) {
    // 约间隔16.67ms, 每次浏览器执行重绘
    // 清除画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.resetTransform();
    context.transform(1, Math.sin(transformX), 0, 1, 0, 0)
    // 画出一个变形的正方形
    context.fillStyle = 'red';
    context.fillRect(100, 100, 100, 100);
    // 控制水平倾斜范围，如果超出范围，就往反方向移动
    if (transformX <= 0) {
      transformX = 0;
      transformDirect = 1
    } else if (transformX >= Math.PI/2) {
      transformX = Math.PI/2;
      transformDirect = -1;
    }
    transformX = transformX + Math.PI * transformRate * transformDirect;
    // 重复执行移动
    requestAnimationFrame(draw);
  }

  // 开始执行移动
  requestAnimationFrame(draw);
})();



(function() {
  // 变形 canvas-6
  const canvas = document.getElementById('canvas-6');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  context.globalAlpha = 0.5;
  
  let transformY = Math.PI / 2;
  let transformRate = 1/180;
  let transformDirect = 1;

  // 绘制函数
  function draw(timestamp) {
    // 约间隔16.67ms, 每次浏览器执行重绘
    // 清除画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.resetTransform();
    context.transform(1, 0, Math.cos(transformY), 1, 0, 0)
    // 画出一个变形的正方形
    context.fillStyle = 'blue';
    context.fillRect(100, 100, 100, 100);
    // 控制水平倾斜范围，如果超出范围，就往反方向移动
    if (transformY <= 0) {
      transformY = 0;
      transformDirect = 1
    } else if (transformY >= Math.PI/2) {
      transformY = Math.PI/2;
      transformDirect = -1;
    }
    transformY = transformY + Math.PI * transformRate * transformDirect;
    // 重复执行移动
    requestAnimationFrame(draw);
  }

  // 开始执行移动
  requestAnimationFrame(draw);
})();
