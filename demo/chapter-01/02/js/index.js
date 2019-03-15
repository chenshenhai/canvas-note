(function(doc) {
  // 绘制矩形 canvas-1
  const canvas = doc.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  
  context.rect(40, 40, 200, 300);
  context.lineWidth = 10;
  context.strokeStyle = '#000';
  context.stroke();
})(document);


(function(doc) {
  // 绘制圆形 canvas-2
  const canvas = doc.getElementById('canvas-2');
  canvas.width = 400;
  canvas.height = 400;

  const context = canvas.getContext('2d');
  context.beginPath();
  context.arc(200, 200, 100, Math.PI * 0, Math.PI * 2, true)
  context.lineWidth = 10;
  context.strokeStyle = '#000';
  context.stroke();

})(document);



(function(doc) {
  // 绘制弧形 canvas-3
  const canvas = doc.getElementById('canvas-3');
  canvas.width = 400;
  canvas.height = 400;

  const context = canvas.getContext('2d');

  context.beginPath();
  context.moveTo(100, 100);
  context.arcTo(300, 100, 300, 300, 200);
  context.lineWidth = 10;
  context.strokeStyle = "#000";
  context.stroke();

  // context.beginPath();
  // context.moveTo(50, 100);
  // context.lineTo(250, 100);
  // context.lineWidth = 10;
  // context.strokeStyle = '#000';
  // context.stroke();
  // // arcTo(x1,y1,x2,y2,radius);

  // context.beginPath();
  // context.moveTo(250, 100);
  // context.arcTo(250, 100, 250, 250, Math.PI * 0.5);
  // // context.lineTo(250, 250);
  // context.lineWidth = 10;
  // context.strokeStyle = '#000';
  // context.stroke();
  // // context.moveTo(300, 100);
  // // context.lineTo(100, 300);

  
  context.stroke();

})(document);

