import { drawText } from '../../../lib/util/draw-text.js'; 
import { drawImage } from '../../../lib/util/draw-block.js';

(function() {
  // 绘制文本 canvas-1
  const canvas = document.getElementById('canvas');

  canvas.width = 501;
  canvas.height = 501;
  const context = canvas.getContext('2d');

  const textEn = 'To be or not to be: that is a question. (Hamlet)';
  const textCn = '生存还是毁灭，这是个值得思考的问题。——莎士比亚《哈姆雷特》'

  drawText(context, textEn, {
    x: 10,
    y: 10,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0', 
    // ellipsisLine: 1,
    backgroundColor: '#74ebf7',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1884e0'
  });
  drawText(context, textCn, {
    x: 10,
    y: 50,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0', 
    ellipsisLine: 1,
    backgroundColor: '#74ebf7',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1884e0'
  });

  drawText(context, textEn, {
    x: 10,
    y: 120,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0', 
    // ellipsisLine: 2,
    backgroundColor: '#74ebf7',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1884e0',
    wordBreak: 'break-all'
  });
  drawText(context, '这件物品的编号是aaaa000000123456789', {
    x: 280,
    y: 100,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0',
    wordBreak: 'break-all', // break-all, break-word 
  });


  drawText(context, textEn, {
    x: 0,
    y: 280,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0',
    wordBreak: 'break-word', // break-all, break-word 
  });

  drawText(context, '这件物品的编号是aaaa000000123456789', {
    x: 250,
    y: 250,
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 200,
    color: '#1884e0',
    wordBreak: 'break-word', // break-all, break-word
    ellipsisLine: 2,
  });

 
})();

