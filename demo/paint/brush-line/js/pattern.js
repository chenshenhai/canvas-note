export function createCircle(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = 'rgb(0 0 0 / 20%)';
  ctx.strokeStyle = 'rgb(0 0 0 / 0%)';
  ctx.beginPath();
  ctx.arc(size, size, size, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();

  return canvas;
}