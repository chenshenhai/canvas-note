(function(doc) {
  // 绘制填充文本 canvas-1
  const canvas = doc.getElementById('canvas-1');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  context.font = '40px Microsoft YaHei'
  context.fillText('hello canvas-note!', 50, 200, 300)
})(document);


(function(doc) {
  // 绘制描边文本 canvas-2
  const canvas = doc.getElementById('canvas-2');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');

  context.font = '40px Microsoft YaHei'
  context.strokeText('hello canvas-note!', 50, 200, 300)
})(document);