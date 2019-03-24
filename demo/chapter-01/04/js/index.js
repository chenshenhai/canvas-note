(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  context.font = '40px Microsoft YaHei';

  // 填充文本
  context.fillText('hello canvas-note!', 50, 100, 300)
  // 描边文本
  context.strokeText('hello canvas-note!', 50, 200, 300)
})();


(function() {
  // 文本对齐方式 canvas-2
  const canvas = document.getElementById('canvas-2');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  context.font = '20px Microsoft YaHei';

  context.textAlign = 'start';
  context.fillText('hello canvas-note!', 100, 50, 200);

  context.textAlign = 'end';
  context.fillText('hello canvas-note!', 100, 100, 200);

  context.textAlign = 'left';
  context.fillText('hello canvas-note!', 100, 150, 200);

  context.textAlign = 'right';
  context.fillText('hello canvas-note!', 100, 200, 200);

  context.textAlign = 'center';
  context.fillText('hello canvas-note!', 100, 250, 200);
})();


(function() {
  // 基线对齐方式 canvas-3
  const canvas = document.getElementById('canvas-3');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  context.font = '20px Microsoft YaHei';

  context.textBaseline = 'top';
  context.fillText('hello canvas-note!', 100, 50, 200);

  context.textBaseline = 'hanging';
  context.fillText('hello canvas-note!', 100, 100, 200);

  context.textBaseline = 'middle';
  context.fillText('hello canvas-note!', 100, 150, 200);

  context.textBaseline = 'alphabetic';
  context.fillText('hello canvas-note!', 100, 200, 200);

  context.textBaseline = 'ideographic';
  context.fillText('hello canvas-note!', 100, 250, 200);

  context.textBaseline = 'bottom';
  context.fillText('hello canvas-note!', 100, 300, 200);
})();


(function() {
  // 文本方向方式 canvas-4
  const canvas = document.getElementById('canvas-4');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  context.font = '20px Microsoft YaHei';

  context.direction = 'ltr';
  context.fillText('hello canvas-note!', 100, 150, 200);

  context.direction = 'rtl';
  context.fillText('hello canvas-note!', 100, 200, 200);

  context.direction = 'inherit';
  context.fillText('hello canvas-note!', 100, 250, 200);
})();


(function() {
  // 文本宽度预测量 canvas-5
  const canvas = document.getElementById('canvas-5');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  context.font = '20px Microsoft YaHei';

  const textContent = 'hello canvas-note!'
  context.fillText(textContent, 100, 100, 200);
  const text = context.measureText(textContent);
  console.log(text.width);
})();