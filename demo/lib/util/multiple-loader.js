import { EventEmitter } from './event-emitter.js';
import { loadImage } from './loader.js'

export class MultipleImageLoader extends EventEmitter {

  constructor(urls, opts = { limitRequest: 2 }) {
    super();
    this._urls = urls;
    this._opts = opts;
    this._urlMap = {};
    this._fetchUrls = [];
    this._result = [];
    this._queue = this._urls.map((url, i) => {
      this._urlMap[url] = i;
      this._result.push({
        image: null,
        status: 'pending',
      });
      return url;
    });
  }

  fetch() {
    return new Promise((resolve) => {
      
      const _request = () => {
        if (this._fetchUrls.length >= this._opts.limitRequest) {
          return false;
        }
        if (this._urls.length === 0) {
          return true;
        }

        for (let i = this._fetchUrls.length; i < this._opts.limitRequest; i++) {
          const url = this._urls.shift();
          this._fetchUrls.push(url);
          loadImage(url).then((img) => {
            const idx = this._urlMap[url];
            this._result[idx] = {
              image: img,
              status: 'loaded',
            };
            this._fetchUrls.splice(this._fetchUrls.indexOf(url), 1);
            this.trigger('loaded', img, idx);

            const reqStatus = _request();
            if (this._fetchUrls.length === 0 && this._urls.length === 0 && reqStatus === true) {
              resolve(this._result);
            }
          }).catch((err) => {
            const idx = this._urlMap[url];
            this._result[idx] = {
              image: null,
              status: 'error',
            };
            this.trigger('error', err, idx);
            this._fetchUrls.splice(this._fetchUrls.indexOf(url), 1);

            const reqStatus = _request();
            if (this._fetchUrls.length === 0 && this._urls.length === 0 && reqStatus === true) {
              resolve(this._result);
            }
            console.error(err);
          });
        }
        return false;
      }
      _request();
    });
  }

  _createPromise(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = reject;
      image.onabort = reject;
      image.src = url;
    })
  }
}

