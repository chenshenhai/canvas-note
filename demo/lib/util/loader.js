
export function loadImage(src) {
  const image = new Image();
  return new Promise((resolve, reject) => {
    image.src = src;
    image.onload = function() {
      resolve(image);
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

  // const canvas = document.createElement('canvas');
  // canvas.width = x + width;
  // canvas.height = y + height;
  // const context = canvas.getContext('2d');
  // context.drawImage(imageSource, x, y, width, height);
  // // context.drawImage(imageSource, 0, 0, width, height);
  // return canvas;

  const img = imageSource;
  const cvs = document.createElement('canvas');
  const ctx2d = cvs.getContext('2d');
  cvs.width = width + x;
  cvs.height = height + y;
  ctx2d.drawImage(img, x, y, img.width, img.height);
  const pat = ctx2d.createPattern(cvs, 'no-repeat');
  return pat;
}