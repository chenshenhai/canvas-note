import { drawBorder } from '../../../lib/util/draw-line.js';
import { drawImage } from '../../../lib/util/draw-block.js';
import { loadImage } from './../../../lib/util/loader.js';

(function() {
  const { Image } = window;
  const canvas = document.querySelector("#canvas");
  const ctx2d = canvas.getContext("2d");
  const image = new Image();
  // const x = 40;
  // const y = 40;
  const x = 40;
  const y = 40;
  const radius = 40;
  const lineWidth = 10;
  const limitWidth = 200;
  const limitHeight = 200;
  const color = '#666666';
  const imageSrc = './../../../image/lena.png';
  
  loadImage(imageSrc).then((img) => {
    const { width, height } = img;
    drawBorder(ctx2d, {
      x: x,
      y: y,
      width: limitHeight,
      height: limitWidth,
      borderColor: color,
      borderRadius: radius,
      borderWidth: lineWidth,
    });

    drawImage(ctx2d, img, { x, y, width: limitWidth, height: limitWidth, radius: radius });

    
  }).catch(console.log)


})();



