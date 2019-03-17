(function(doc) {

  function drawCircle(context, x, y, r) {
    // context.save();
    context.beginPath();
    context.lineWidth = 12;
    context.strokeStyle = '#000';
    context.arc(x, y, r, Math.PI * 0, Math.PI * 2, true);
    context.closePath();
    // context.restore();
  }

  // 重复绘制方法1 canvas-1
  const canvas = doc.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  
  drawCircle(context, 100, 100, 50);
  drawCircle(context, 200, 100, 50);
  context.stroke();
})(document);