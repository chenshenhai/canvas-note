main();

function main() {
  // 旋转 canvas
  const canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  const rectList = [
    { x: 80, y: 80, w: 240, h: 240, a: Math.PI / 4, c: '#eee'},
    { x: 100, y: 100, w: 200, h: 200, a: 0, c: '#c0c0c0'},
    { x: 150, y: 150, w: 100, h: 100, a: Math.PI / 4, c: '#000'}
  ]
  rectList.forEach(rect => {
    rotate(context, rect, (ctx) => {
      ctx.fillStyle = rect.c;
      ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    })
  });
}


function rotate(ctx, params, callback) {
  const { a, x, y, w, h } = params;
  const _x = x + w / 2;
  const _y = y + h / 2;
  
  ctx.translate(_x, _y);
  ctx.rotate(a);
  ctx.translate(-_x, -_y);

  callback(ctx);

  ctx.translate(_x, _y);
  ctx.rotate(- a);
  ctx.translate(-_x, -_y);
}


