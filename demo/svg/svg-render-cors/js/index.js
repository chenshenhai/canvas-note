(function() {

  const { Image, Blob, FileReader } = window;
  const canvas = document.querySelector('#canvas');
  const context = canvas.getContext('2d');

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="320" height = "200">
    <foreignObject width="100%" height="100%">
      <div xmlns = "http://www.w3.org/1999/xhtml" style="font-size: 80px;color: #000000">
        <span>Hello World</span>
      </div>
    </foreignObject>
  </svg>
  `;
  
  const image = new Image();
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8'});
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function(event) {
    const base64 = event.target.result;
    image.onload = function() {
      context.drawImage(image, 0, 0);
    }
    image.src = base64;
  }
})();