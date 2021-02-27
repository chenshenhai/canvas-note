import { Brush } from './brush.js';
import { Watcher } from './watcher.js';

// let isPainting = false;
// let lastPoint = {};

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const brush = new Brush(ctx);
const watcher = new Watcher(canvas);
watcher.onDraw((positions) => {
  if (!(positions.length >= 2)) {
    return;
  }
  const start = positions[positions.length - 2];
  const end = positions[positions.length - 1]
  brush.drawLine(start, end)
});
watcher.onDrawEnd((positions) => {
  console.log('positions =', JSON.stringify(positions))
});


// let positions = [];

// function onStart(e) {
//   const x = e.clientX;
//   const y = e.clientY;
//   isPainting = true;
//   positions = [];
//   lastPoint = {
//     x: x - canvas.offsetLeft,
//     y: y - canvas.offsetTop,
//     t: Date.now(),
//   };
//   positions.push(lastPoint)
// }

// function onMove(e) {
//   const x = e.clientX;
//   const y = e.clientY;
//   if (isPainting) {
//     let newPoint = {
//       x: x - canvas.offsetLeft,
//       y: y - canvas.offsetTop,
//       t: Date.now(),
//     };
//     lastPoint = newPoint;
//     positions.push(newPoint);
//     drawBrush(positions);
//   }
// }

// function onEnd() {
//   isPainting = false;
// }

// canvas.addEventListener('mousedown', onStart);
// canvas.addEventListener('mousemove', onMove);
// canvas.addEventListener('mouseup', onEnd);

// const mouseupEvent = new MouseEvent('mouseup');
// document.querySelector('body').addEventListener('mousemove', (e) => {
//   if (e.path[0] !== canvas) {
//     canvas.dispatchEvent(mouseupEvent);
//   }
// }, false)


// let prevVelocity = 0;
// function drawBrush(positions) {
//   if (!(positions.length >= 2)) {
//     return;
//   }
//   const start = positions[positions.length - 2];
//   const end = positions[positions.length - 1]
//   brush.drawLine(start, end)
// }