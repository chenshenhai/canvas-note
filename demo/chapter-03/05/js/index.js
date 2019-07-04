import { getImageBySrc } from './../../../lib/util/file.js';
import { compressImage } from './../../../lib/util/compress.js';
 
(async function() {
  const canvas1 = document.getElementById('canvas-1');
  const canvas2 = document.getElementById('canvas-2');

  const ctx1 = canvas1.getContext('2d');
  const ctx2 = canvas2.getContext('2d');
  
  const img = await getImageBySrc('./../../image/pexels-photo-001.jpg');
  canvas1.width = img.width;
  canvas1.height = img.height;
  const originSize = img.width * img.height;

  ctx1.drawImage(img, 0, 0);

  const compressedImgSrc = compressImage(img);
  const compressedImg = await getImageBySrc(compressedImgSrc);
  const compressedSize = compressedImg.width * compressedImg.height;
  canvas2.width = compressedImg.width;
  canvas2.height = compressedImg.height;
  ctx2.drawImage(compressedImg, 0, 0);

  console.log('originSize = ', originSize);
  console.log('compressedSize = ', compressedSize);
})();
