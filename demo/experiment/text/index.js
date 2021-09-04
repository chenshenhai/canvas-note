import Text from './text.js';

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const text = new Text(context, {
  fontSize: 20
});
text.setText('生活就像海洋，\r\n只有意志坚定的能才能到达彼岸。');
text.render();

