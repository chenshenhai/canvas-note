const path = require('path');
const http = require('http');
const fs = require('fs');
const puppeteer = require('puppeteer');
const serveHandler = require('serve-handler');

const port = 3001;
const width = 400;
const height = 200;

module.exports = {
  createScreenshotBuffer,
  width,
  height,
}

async function createScreenshotBuffer(pagePath) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => serveHandler(req, res, {
      public: path.join(__dirname, '..', 'src'),
    }));
    server.listen(port, async () => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport( { width: width, height: height } );
        await page.goto(`http://127.0.0.1:${port}/${pagePath || ''}`);
        const buf = await page.screenshot();
        await browser.close();
        server.close();
        resolve(buf);
      } catch (err) {
        server.close();
        console.error(err);
        process.exit(-1);
      }
    });
    server.on('SIGINT', () => process.exit(1) );
  })
}