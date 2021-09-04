
export function createBlockCanvas(opts) {
  const _opts = {...{
    width: 1, height: 1, borderRadius: 0, backgroundColor: 'transparent', borderWidth: 1,
  }, ...opts}
  const { width, height, borderRadius, backgroundColor } = _opts;

  const canvas = document.createElement('canvas');
  const ctx2d = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  const x = 0;
  const y = 0;
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
  return canvas;
}