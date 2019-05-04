(function() {

  function createCircle(x, y, r) {
    const circle = new Path2D();
    circle.arc(x, y, r, 0, Math.PI * 2);
    return circle;
  }

  // Path2D重复绘制 
  const canvas = document.getElementById('canvas-path2d');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  
  const c1 = createCircle(100, 100, 50);
  const c2 = createCircle(200, 100, 30);
  const c3 = createCircle(140, 240, 60);
  const c4 = createCircle(300, 280, 80);
  context.strokeStyle = '#125394';
  context.lineWidth = 10;
  context.stroke(c1);
  context.stroke(c2);
  context.stroke(c3);
  context.stroke(c4);
})();