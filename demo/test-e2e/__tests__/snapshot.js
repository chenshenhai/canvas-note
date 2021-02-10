const jimp = require('jimp');
const path = require('path');
const { createScreenshotBuffer } = require('./screenshot');

const snapshotPicPath = path.join(__dirname, 'snapshot', 'page.png');

async function main() {
  const buf = await createScreenshotBuffer('/index.html');
  (await jimp.read(buf)).scale(1).quality(100).write(snapshotPicPath);
  console.log('create snapshot of screen scuccess!')
}

main();