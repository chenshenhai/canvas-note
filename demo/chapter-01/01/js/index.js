(function(doc) {
  // 绘制线段 canvas-1
  const canvas = doc.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const context = canvas.getContext('2d');
  context.moveTo(100, 100);
  context.lineTo(300, 100);
  context.lineWidth = 12;
  context.strokeStyle = '#000';
  context.stroke();
})(document);


(function(doc) {
  // 绘制折线 canvas-2
  const canvas = doc.getElementById('canvas-2');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(300, 100);
  context.lineTo(100, 200);
  context.lineWidth = 12;
  context.strokeStyle = '#000';
  context.stroke();
})(document);


(function(doc) {
  // 绘制两个独立线段 canvas-3
  const canvas = doc.getElementById('canvas-3');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(300, 100);
  context.lineWidth = 12;
  context.strokeStyle = '#000';
  context.stroke();

  context.beginPath();
  context.moveTo(300, 100);
  context.lineTo(100, 200);
  context.lineWidth = 12;
  context.strokeStyle = '#ccc';
  context.stroke();
})(document);


(function(doc) {
  // 绘制折线 canvas-4
  const canvas = doc.getElementById('canvas-4');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(300, 100);
  context.lineTo(100, 200);
  context.lineWidth = 12;
  context.strokeStyle = '#000';
  // 折线自闭合
  context.closePath();
  context.stroke();
})(document);


(function(doc) {
  // 绘制线段样式 canvas-05
  const canvas = doc.getElementById('canvas-5');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(300, 100);
  context.lineCap = 'miter';
  context.lineWidth = 40;
  context.strokeStyle = '#000';
  context.stroke();

  context.beginPath();
  context.moveTo(100, 200);
  context.lineTo(300, 200);
  context.lineCap = 'round';
  context.lineWidth = 40;
  context.strokeStyle = '#000';
  context.stroke();

  context.beginPath();
  context.moveTo(100, 300);
  context.lineTo(300, 300);
  context.lineCap = 'square';
  context.lineWidth = 40;
  context.strokeStyle = '#000';
  context.stroke();

})(document);


(function(doc) {
  // 绘制折线 canvas-6
  const canvas = doc.getElementById('canvas-6');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(20, 40);
  context.lineTo(300, 40);
  context.lineTo(300, 100);
  context.lineJoin = 'miter';
  context.lineWidth = 40;
  context.strokeStyle = '#000';
  context.stroke();

  context.beginPath();
  context.moveTo(20, 160);
  context.lineTo(300, 160);
  context.lineTo(300, 220);
  context.lineJoin = 'bevel';
  context.lineWidth = 40;
  context.strokeStyle = '#000';
  context.stroke();

  context.beginPath();
  context.moveTo(20, 280);
  context.lineTo(300, 280);
  context.lineTo(300, 340);
  context.lineJoin = 'round';
  context.lineWidth = 40;
  context.strokeStyle = '#000';
  context.stroke();

})(document);
