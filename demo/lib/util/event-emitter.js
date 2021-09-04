export class EventEmitter {
  constructor() {
    this._listeners = new Map();
  }

  on(name, callback) {
    if (!this._listeners.has(name)) {
      this._listeners.set(name, []);
    }
    const callbacks = this._listeners.get(name);
    callbacks.push(callback);
  }

  trigger() {
    const args = Array.from(arguments);
    const name = args.shift();
    if (!this._listeners.has(name)) {
      return;
    }
    const callbacks = this._listeners.get(name);
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i](...args);
    }
  }

  off(name, callback) {
    if (!this._listeners.has(name)) {
      return;
    }
    const callbacks = this._listeners.get(name);
    let index = -1;
    for (let i = 0; i < callbacks.length; i++) {
      if (callback === callbacks[i]) {
        index = i;
        break;
      }
    }
    callbacks.splice(i, 1);
    this._listeners.set(name, callbacks);
  }
}