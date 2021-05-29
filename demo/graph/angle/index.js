main();



function main() {
   const canvas = document.getElementById('canvas');
   canvas.width = 400;
   canvas.height = 400;
   const ctx = canvas.getContext('2d');

  const list = [
    { c: { x: 200, y: 200 }, s: { x: 200, y: 100 }, e: { x: 300, y: 100 }, color: '#c0c0c0' },
    { c: { x: 200, y: 200 }, s: { x: 300, y: 300 }, e: { x: 100, y: 300 }, color: '#000000' }
  ]

  list.forEach((item) => {
    const a = doAngle(ctx, item);
    console.log(a);
  })
  
}

function doAngle(ctx, params) {
  
  ctx.lineWidth = 2;
  ctx.strokeStyle = params.color || '#000000';

  ctx.beginPath();
  ctx.moveTo(params.c.x, params.c.y);
  ctx.lineTo(params.s.x, params.s.y);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(params.c.x, params.c.y);
  ctx.lineTo(params.e.x, params.e.y);
  ctx.stroke();
  ctx.closePath();

  const a = calcAngle(params.c, params.s, params.e);
  return a;
}


function calcAngle(center, start, end) {
  const startA = calcLineAngle(center, start);
  const endA = calcLineAngle(center, end);
  return endA - startA;
}

function calcLineAngle(center, p) {
  const x = p.x - center.x;
  const y = center.y - p.y
  if (x === 0) {
    if (y < 0) {
      return Math.PI / 2
    } else if (y > 0) {
      return Math.PI * ( 3 / 2 )
    }
  } else if (y === 0) {
    if (x < 0) {
      return Math.PI;
    } else if (x > 0) {
      return 0;
    }
  }
  if (x > 0 && y < 0) {
    return Math.atan(Math.abs(y) / Math.abs(x))
  } else if (x < 0 && y < 0) {
    return Math.PI - Math.atan(Math.abs(y) / Math.abs(x))
  } else if (x < 0 && y > 0) {
    return Math.PI + Math.atan(Math.abs(y) / Math.abs(x))
  } else if (x > 0 && y > 0) {
    return Math.PI * 2 - Math.atan(Math.abs(y) / Math.abs(x))
  }
  return null;
}


