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

