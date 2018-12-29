let img;

function preload() {
  img = loadImage('data/image.jpg');
}

function setup() {
  createCanvas(650, 450);
}

function draw() {
  let tileCountX = mouseX / 3 + 1;
  let tileCountY = mouseY / 3 + 1;
  let stepX = width / tileCountX;
  let stepY = height / tileCountY;
  for (let gridY = 0; gridY < height; gridY += stepY) {
    for (let gridX = 0; gridX < width; gridX += stepX) {
      image(img, gridX, gridY, stepX, stepY);
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }
}