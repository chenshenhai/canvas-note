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
  const end = positions[positions.length - 1];
  brush.drawLine(start, end);
});
watcher.onDrawEnd((positions) => {
  console.log('positions =', JSON.stringify(positions))
});

