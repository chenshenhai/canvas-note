
export function drawImage(ctx2d, image, opts) {
  const _opts = {...{
    x: 0, y: 0, width: 1, height: 1, radius: 0,
  }, ...opts}
  const { src, x, y, width, height, radius } = _opts;
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = ctx2d.canvas.width;
  tempCanvas.height = ctx2d.canvas.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(image, x, y, width, height);
  const pattern = ctx2d.createPattern(tempCanvas, 'no-repeat');

  const w = width;
  const h = height;
  const r = radius;

  ctx2d.beginPath();
  ctx2d.moveTo(x + r, y);
  ctx2d.arcTo(x + w, y, x + w, y + h, r);
  ctx2d.arcTo(x + w, y + h, x, y + h, r);
  ctx2d.arcTo(x, y + h, x, y, r);
  ctx2d.arcTo(x, y, x + w, y, r);
  ctx2d.closePath();  
  ctx2d.fillStyle = pattern;
  ctx2d.fill(); 
  
  ctx2d.fillStyle = 'transparent';
}



export function drawBackgroundColor(ctx2d, opts) {
  const _opts = {...{
    x: 0, y: 0, width: 1, height: 1, borderRadius: 0, backgroundColor: 'transparent'
  }, ...opts}
  const { x, y, width, height, borderRadius, backgroundColor } = _opts;

  const w = width;
  const h = height;
  const r = borderRadius;

  ctx2d.beginPath();
  ctx2d.moveTo(x + r, y);
  ctx2d.arcTo(x + w, y, x + w, y + h, r);
  ctx2d.arcTo(x + w, y + h, x, y + h, r);
  ctx2d.arcTo(x, y + h, x, y, r);
  ctx2d.arcTo(x, y, x + w, y, r);
  ctx2d.closePath();  
  ctx2d.fillStyle = backgroundColor;
  ctx2d.fill(); 
}