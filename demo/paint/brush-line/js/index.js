import { Brush } from './brush.js';

const positions = [{"x":82,"y":361,"t":1614403428005},{"x":82,"y":360,"t":1614403428265},{"x":83,"y":355,"t":1614403428270},{"x":87,"y":350,"t":1614403428279},{"x":102,"y":325,"t":1614403428290},{"x":122,"y":299,"t":1614403428294},{"x":150,"y":264,"t":1614403428304},{"x":192,"y":217,"t":1614403428311},{"x":239,"y":172,"t":1614403428318},{"x":294,"y":125,"t":1614403428327},{"x":349,"y":85,"t":1614403428335}];


const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const brush = new Brush(ctx);

brush.draw(positions);
