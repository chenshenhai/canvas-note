export function drawBorder(ctx2d, opts) {
  const _opts = {...{
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    borderColor: '#000000',
    borderRadius: 0,
    borderWidth: 1,
  }, ...opts};
  const { x, y, width, height, borderColor, borderRadius, borderWidth } = _opts;
  let r = borderRadius;
  const w = width;
  const h = height;
  const lineWidth = borderWidth;
  if (r > Math.min(w, h) / 2) {
    r = Math.min(w, h) / 2;
  }


  const borderR = r + lineWidth / 2;
  const addW = lineWidth / 2
  ctx2d.beginPath();
  ctx2d.moveTo(x + r, y - addW);
  ctx2d.arcTo(x + w + addW, y - addW, x + w + addW, y + h, borderR);
  ctx2d.arcTo(x + w + addW, y + h + addW, x, y + h +addW, borderR);
  ctx2d.arcTo(x - addW, y + addW + h, x - addW, y, borderR);
  ctx2d.arcTo(x - addW, y - addW, x + w, y - addW, borderR);
  ctx2d.closePath();  
  ctx2d.lineWidth = lineWidth;
  ctx2d.strokeStyle = borderColor;
  ctx2d.stroke();

}