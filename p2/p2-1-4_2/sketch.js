let video;
let slider;
let cols = 40;
let rows = 40;
let boxes;
let boxHolder;

function preload() {
  video = createVideo('data/ball.mov');
}

function setup() {
  noCanvas();
  pixelDensity(1);
  boxHolder = createDiv('');
  boxHolder.id('mirror');

  boxes = [];

  video.size(cols, rows);
  slider = createSlider(0, 255, 200);

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

  video.loop();
}

function draw() {
  video.loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.height; x++) {
      const index = (x + (y * video.height)) * 4;
      const r = video.pixels[index];
      const g = video.pixels[index + 1];
      const b = video.pixels[index + 2];

      const bright = (r + g + b) / 3;
      const threshold = slider.value();
      const checkIndex = x + y * cols;

      if (bright > threshold - 1) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
}