const IMG_LIMIT_SIZE = 2000 * 2000;
const PIECE_SIZE = 1000 * 1000;


export const compressCanvas = function(img, opts = { type: 'image/jpeg',  encoderOptions: 0.1 }) {
  const {type, encoderOptions } = opts;
  const w = img.width;
  const h = img.width;
  const outputW = w;
  const outputH = h;
  const imageSize = w * h;
  const ratio = Math.sqrt(Math.ceil(imageSize / IMG_LIMIT_SIZE));
  
  if ( ratio > 1) {
    outputW = w / ratio;
    outputH = h / ratio;
  } else {
    ratio = 1;
  }

  const canvas = document.createElement('canvas');
  const tempCanvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = outputW;
  canvas.height = outputH;
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const pieceCount = Math.ceil(imageSize / PIECE_SIZE);
  if (pieceCount > 1) {
    const pieceW = Math.ceil(canvas.width / pieceCount);
    const pieceH = Math.ceil(canvas.height / pieceCount);
    tempCanvas.width = pieceW;
    tempCanvas.height = pieceH;
    const tempContext = tempCanvas.getContext('2d');

    const sw = pieceW * ratio;
    const sh = pieceH * ratio;
    const dw = pieceW;
    const dh = pieceH;
    for(let i = 0; i < pieceCount; i++) {
      for(let j = 0; j < pieceCount; j++) {
        const sx = i * pieceW * ratio;
        const sy = j * pieceH * ratio;
        tempContext.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
        context.drawImage(tempContext, i * pieceW, j * pieceH, dw, dh);
      }
    }
  } else {
    context.drawImage(img, 0, 0, outputW, outputH);
  }

  tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
  tempCanvas.width = 0;
  tempCanvas.height = 0;
  tempCanvas = null;

  const base64 = canvas.toDataURL(type, encoderOptions);
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 0;
  canvas.height = 0;
  canvas = null;

  return base64;
}