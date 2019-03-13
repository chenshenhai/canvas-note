(function(doc) {
  const canvas = doc.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const ctx = canvas.getContext('2d');
  ctx.moveTo(100, 100);
  ctx.lineTo(300, 100);
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#000';
  ctx.stroke();
})(document);


(function(doc) {
  const canvas = doc.getElementById('canvas-2');
  canvas.width = 400;
  canvas.height = 400;
  canvas.style = 'border: 1px solid #ccc;';

  const ctx = canvas.getContext('2d');
  ctx.moveTo(100, 100);
  ctx.lineTo(300, 100);
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#000';
  ctx.stroke();
})(document);