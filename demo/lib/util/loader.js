
export function loadImage(src) {
  const image = new Image();
  return new Promise((resolve, reject) => {
    image.src = src;
    image.crossOrigin = 'Anonymous';
    image.onload = function() {
      resolve(image);
    }
    image.onabort = function(err) {
      reject(err);
    }
    image.onerror = function(err) {
      reject(err);
    }
  });
}



export function loadPattern(imageSource, opts = {}) {
  const _opts = {
    ...{
      x: 0, y: 0, width: imageSource.width, height: imageSource.height
    },
    ...opts,
  };
  const { x, y, width, height } = _opts;

  const img = imageSource;
  const canvas = document.createElement('canvas');
  const ctx2d = canvas.getContext('2d');
  canvas.width = width + x;
  canvas.height = height + y;
  ctx2d.drawImage(img, x, y, img.width, img.height);
  const pattern = ctx2d.createPattern(canvas, 'no-repeat');
  return pattern;
}