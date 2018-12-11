let img;
let colors = [];
let sortMode = null;

function preload() {
  img = loadImage('./pic1.jpg');
}

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  const tileCount = floor(width / max(mouseX, 5));
  const rectSize = width / tileCount;

  img.loadPixels();
  colors = [];

  for (let gridY = 0; gridY < tileCount; gridY += 1) {
    for (let gridX = 0; gridX < tileCount; gridX += 1) {
      const px = int(gridX * rectSize);
      const py = int(gridY * rectSize);
      const i = (py * img.width + px) * 4;
      var c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
      colors.push(c);
    }
  }

  gd.sortColors(colors, sortMode);

  let i = 0;
  for (let gridY = 0; gridY < tileCount; gridY += 1) {
    for (let gridX = 0; gridX < tileCount; gridX += 1) {
      fill(colors[i]);
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      i += 1;
    }
  }
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }

  if (key === '5') { sortMode = null; }
  if (key === '6') { sortMode = gd.HUE; }
  if (key === '7') { sortMode = gd.SATURATION; }
  if (key === '8') { sortMode = gd.BRIGHTNESS; }
  if (key === '9') { sortMode = gd.GRAYSCALE; }
}