let img;
let img1;
let img2;
let img3;
let slider;
let cols = 40;
let rows = 40;
let boxes;
let boxHolder;

function preload() {
  img1 = loadImage('data/shapes.png');
  img2 = loadImage('data/draw.png');
  img3 = loadImage('data/toner.png');
}

function setup() {
  noCanvas();
  pixelDensity(1);
  boxHolder = createDiv('');
  boxHolder.id('mirror');

  boxes = [];

  // set the current img
  img = img1;
  img.resize(cols, rows);
  img.loadPixels();

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    const linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }

  slider = createSlider(0, 255, 0);
}

function draw() {
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.height; x++) {
      const c = color(img.get(x, y));
      const bright = (red(c) + green(c) + blue(c)) / 3;

      const threshold = slider.value();

      const checkIndex = x + y * cols;

      if (bright > threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
}

function keyPressed() {
  if (key === '1') {
    img = img1;
  }
  if (key === '2') {
    img = img2;
  }
  if (key === '3') {
    img = img3;
  }

  img.resize(cols, rows);
  img.loadPixels();
}