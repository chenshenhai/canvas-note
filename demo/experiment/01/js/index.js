import Effect from './lib/effect.js'

const effect = new Effect({
  size: 10,
  width: 400,
  height: 200,
  colors: [
    '#2196f3',
    '#3f51b5'
  ]
});

const canvas = effect.getCanvas();
document.querySelector('body').appendChild(canvas);

console.log(effect);