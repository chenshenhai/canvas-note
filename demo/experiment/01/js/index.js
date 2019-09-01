import Effect from './lib/effect.js'

const effect = new Effect();

const canvas = effect.getCanvas();
document.querySelector('body').appendChild(canvas);
console.log(Effect);