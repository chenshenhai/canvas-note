(function() {
  // 绘制填充颜色 canvas-1
  const canvas = document.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  context.fillStyle = '#125394';
  context.fillRect(100, 100, 200, 200);
})();

(function() {
  // 绘制填充颜色透明度 canvas-2
  const canvas = document.getElementById('canvas-2');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  context.fillStyle = '#125394';
  context.globalAlpha = 0.5;
  context.fillRect(100, 100, 200, 200);
})();


(function() {
  // 线性渐变 canvas-3
  const canvas = document.getElementById('canvas-3');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  const linearGradient1 = context.createLinearGradient(50, 100, 350, 100);
  linearGradient1.addColorStop(0, '#0c3d6d');
  linearGradient1.addColorStop(1, '#c8dcf1');
  context.fillStyle = linearGradient1;
  context.fillRect(50, 50, 300, 100);

  const linearGradient2 = context.createLinearGradient(200, 200, 350, 350);
  linearGradient2.addColorStop(0, '#0c3d6d');
  linearGradient2.addColorStop(1, '#c8dcf1');
  context.fillStyle = linearGradient2;
  context.fillRect(200, 200, 150, 150);

})();



(function() {
  // 径向渐变 canvas-4
  const canvas = document.getElementById('canvas-4');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  const radialGradient1 = context.createRadialGradient(200, 200, 50, 200, 200, 100);
  radialGradient1.addColorStop(0, '#0c3d6d');
  radialGradient1.addColorStop(1, '#c8dcf1');
  context.globalAlpha = 0.8;
  context.fillStyle = radialGradient1;
  context.fillRect(50, 50, 300, 300);
})();