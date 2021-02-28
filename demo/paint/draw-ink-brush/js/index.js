import { Brush } from './brush.js';
import { Watcher } from './watcher.js';

// let isPainting = false;
// let lastPoint = {};

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const brush = new Brush(ctx);
const watcher = new Watcher(canvas);
watcher.onDrawStart((start) => {
  brush.drawStart(start)
});
watcher.onDraw((start, end) => {
  brush.pushPosition(end);
  brush.drawLine(start, end);
});
watcher.onDrawEnd((positions) => {
  brush.drawEnd();
  console.log('positions =', JSON.stringify(positions))
});

