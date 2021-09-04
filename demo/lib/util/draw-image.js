

export function drawImageCenter(ctx2d, image, opts = {}) {
  const _opts = {...{
    x: 0, y: 0, width: 0, height: 0,
  }, ...opts};
  const { x, y } = _opts;
  const maxHeight = _opts.height;
  const maxWidth = _opts.width;
  const { height, width } = image;
  const scale = Math.max(width / maxWidth, height / maxHeight);

  const sx = 0;
  const sy = 0;
  const sw = width;
  const sh = height;
  const dw = width / scale;
  const dh = height / scale;

  const dx = x + (maxWidth - dw) / 2;
  const dy = y + (maxHeight - dh) / 2;

  ctx2d.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
}

