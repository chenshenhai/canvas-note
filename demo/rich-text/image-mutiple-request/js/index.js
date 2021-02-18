import { loadImage } from '../../../lib/util/loader.js';
import { drawBackgroundColor } from './../../../lib/util/draw-block.js';
import { drawImageCenter } from './../../../lib/util/draw-image.js';
import { MultipleImageLoader } from './../../../lib/util/multiple-loader.js';

(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas');
  canvas.width = 500;
  canvas.height = 500;
  const ctx2d = canvas.getContext('2d');

  const urls = []
  const xNum = 10;
  const yNum = 10;
  const images = [];
  for (let i = 0; i < xNum; i ++) {
    for (let j = 0; j < yNum; j ++) {
      urls.push(`./../../../image/pexels-photo-00${j % 5 + 1}.jpg?v=${i}-${j}`);
      images.push(null);
    }
  }



  const multipleLoader = new MultipleImageLoader(urls);
  multipleLoader.on('loaded', (image, idx) => {
    draw(image, idx)
  });
  multipleLoader.on('error', console.log);
  multipleLoader.fetch().then(console.log).catch(console.log);

  function draw(image, i) {
    const width = 50;
    const height = 50;
    const x = (i % xNum)  * width;
    const y = (Math.floor(i / yNum)) * height;
    drawImageCenter(ctx2d, image, { x, y, width, height })
  }

  // loadImage('./../../../image/pexels-photo-001.jpg').then((image) => {
  //   const opts = { x: 0, y: 0, width: 150, height: 150 }
  //   drawBackgroundColor(ctx2d, { ...opts, ...{backgroundColor: '#f0f0f0'}})
  //   drawImageCenter(ctx2d, image, opts)
  // }).catch(console.log);

  // loadImage('./../../../image/pexels-photo-002.jpg').then((image) => {
  //   const opts = { x: 200, y: 0, width: 150, height: 150 }
  //   drawBackgroundColor(ctx2d, { ...opts, ...{backgroundColor: '#cccccc'}})
  //   drawImageCenter(ctx2d, image, opts)
  // }).catch(console.log);

  // loadImage('./../../../image/pexels-photo-003.jpg').then((image) => {
  //   const opts = { x: 200, y: 200, width: 150, height: 150 }
  //   drawBackgroundColor(ctx2d, { ...opts, ...{backgroundColor: '#cccccc'}})
  //   drawImageCenter(ctx2d, image, opts)
  // }).catch(console.log);

  // loadImage('./../../../image/pexels-photo-004.jpg').then((image) => {
  //   const opts = { x: 0, y: 200, width: 150, height: 150 }
  //   drawBackgroundColor(ctx2d, { ...opts, ...{backgroundColor: '#cccccc'}})
  //   drawImageCenter(ctx2d, image, opts)
  // }).catch(console.log);

})();

