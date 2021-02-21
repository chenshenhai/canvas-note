import Snow from './snow.js';

const canvas = document.querySelector('#canvas');
canvas.width = 400;
canvas.height = 400;
const snow = new Snow(canvas, { count: 100 });
snow.start();