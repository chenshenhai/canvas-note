(function(doc) {
  // 绘制矩形 canvas-1
  const canvas = doc.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  
  // 绘制矩形边框
  context.rect(50, 50, 100, 80);
  context.lineWidth = 10;
  context.strokeStyle = '#000';
  // context.stroke();

  // 绘制填充颜色的矩形
  context.fillStyle = "#125394";
  context.fillRect(50, 150, 100, 80);
  

  // 绘制填充颜色的矩形
  // 再清除矩形内部的区域
  context.fillStyle = "#009688";
  context.fillRect(50, 250, 200, 120);
  context.clearRect(100, 300, 80, 40);

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
  // 绘制圆弧形 canvas-3
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

})(document);


(function(doc) {
  // 绘制二次曲线 canvas-4
  const canvas = doc.getElementById('canvas-4');
  canvas.width = 400;
  canvas.height = 400;

  const context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(50, 350);
  context.quadraticCurveTo(200, 0, 350, 350);
  context.lineWidth = 10;
  context.strokeStyle = "#000";
  context.stroke();
})(document);


(function(doc) {
  // 绘制三次曲线 canvas-5
  const canvas = doc.getElementById('canvas-5');
  canvas.width = 400;
  canvas.height = 400;

  const context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(50, 200);
  context.bezierCurveTo(150, 0, 200, 350, 350, 200);
  context.lineWidth = 10;
  context.strokeStyle = "#000";
  context.stroke();
})(document);


