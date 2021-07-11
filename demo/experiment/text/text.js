class Text {
  constructor(ctx, opts) {
    this._ctx = ctx;
    this._content = 'Text';
    this._opts = {...{
      color: '#666666',
      fontSize: 14,
      lineHeight: 20,
      fontFamliy: 'Arial',
      x: 20,
      y: 20,
      w: 300,
      h: 100
    }, ...opts}
    this._focus = false
  }

  setText(content) {
    this._content = content.replace(/\r\n/ig, '\n');
  }

  render() {
    const { color, fontSize, fontFamliy, lineHeight } = this._opts;
    const ctx = this._ctx;
    const strs = this._content.split('\n');
    let x = this._opts.x;
    let y = this._opts.y;
    const lines = [];
    ctx.font = `${parseInt(fontSize)}px ${fontFamliy}`;
    strs.forEach((str) => {
      let current = '';
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (ctx.measureText(current + char).width <= this._opts.w) {
          current = current + char;
        } else {
          lines.push(current);
          current = char;
        }
      }
      if (current.length > 0) {
        lines.push(current);
      }
      
    });

    ctx.fillStyle = color;
    ctx.textBaseLine = 'top';
    y = y + Math.max(0, (lineHeight - fontSize) / 2);
    lines.forEach((line, i) => {
      console.log(line, x, y + lineHeight * i)
      ctx.fillText(line, x, y + lineHeight * i);
    });
  }
}

export default Text;