import { getImageBySrc } from './../../../lib/util/file.js';
import { compressImage } from './../../../lib/util/compress.js';
 
(async function() {

  // 绘制原始图像
  const canvas1 = document.getElementById('canvas-1');
  const ctx1 = canvas1.getContext('2d');
  const img = await getImageBySrc('./../../image/pexels-photo-001.jpg');
  canvas1.width = img.width;
  canvas1.height = img.height;
  ctx1.drawImage(img, 0, 0);


  // 绘制压缩后图像
  const canvas2 = document.getElementById('canvas-2');
  const ctx2 = canvas2.getContext('2d');
  const compressedImgSrc = compressImage(img);
  const timeBefore = new Date().getTime();
  const compressedImg = await getImageBySrc(compressedImgSrc);
  const timeAfter = new Date().getTime();
  canvas2.width = compressedImg.width;
  canvas2.height = compressedImg.height;
  ctx2.drawImage(compressedImg, 0, 0);

  // 前后尺寸结果
  const originSize = img.width * img.height;
  const compressedSize = compressedImg.width * compressedImg.height;
  const infoText = `
   原始尺寸大小: ${img.width} * ${img.height} = ${originSize} 像素
   <br>
   压缩后尺寸大小: ${compressedImg.width} * ${compressedImg.height} = ${compressedSize} 像素
   <br/>
   压缩过程耗时: ${timeAfter - timeBefore} ms
  `
  document.getElementById('info').innerHTML = infoText;
  // console.log('originSize = ', originSize);
  // console.log('compressedSize = ', compressedSize);
})();
