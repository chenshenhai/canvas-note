(function(doc) {
  // 绘制矩形 canvas-1
  const canvas = doc.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const context = canvas.getContext('2d');
  context.rect(40, 40, 200, 300);
  context.lineWidth = 12;
  context.strokeStyle = '#000';
  context.stroke();
})(document);


(function(doc) {
  // 绘制矩形 canvas-1
  const canvas = doc.getElementById('canvas-2');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const context = canvas.getContext('2d');
  context.rect(40, 40, 200, 300);
  context.lineWidth = 12;
  context.strokeStyle = '#000';
  context.stroke();
})(document);
