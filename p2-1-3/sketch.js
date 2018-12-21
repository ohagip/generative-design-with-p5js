let count = 0;
let tileCountX = 10;
let tileCountY = 10;
let tileWidth = 0;
let tileHeight = 0;

let colorStep = 15;

let circleCount = 0;
let endSize = 0;
let endOffset = 0;

let actRandomSeed = 0;

function setup() {
  createCanvas(800, 800);
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  noFill();
  stroke(0, 128);
}

function draw() {
  background(255);
  randomSeed(actRandomSeed);

  translate(tileWidth / 2, tileHeight / 2);

  circleCount = mouseX / 30 + 1;
  endSize = map(mouseX, 0, max(width, mouseX), tileWidth / 2, 0);
  endOffset = map(mouseY, 0, max(height, mouseY), 0, (tileWidth - endSize) / 2);


  for (let gridY = 0; gridY < tileCountY; gridY += 1) {
    for (let gridX = 0; gridX < tileCountX; gridX += 1) {
      push();
      translate(tileWidth * gridX, tileHeight * gridY);
      scale(1, tileHeight / tileWidth);

      const toggle = int(random(0, 4));
      if (toggle === 0) {
        rotate(-HALF_PI);
      }
      if (toggle === 1) {
        rotate(0);
      }
      if (toggle === 2) {
        rotate(HALF_PI);
      }
      if (toggle === 3) {
        rotate(PI);
      }

      // draw module
      for (let i = 0; i < circleCount; i += 1) {
        {
          const diameter = map(i, 0, circleCount, tileWidth, endSize);
          const offset = map(i, 0, circleCount, 0, endOffset);
          ellipse(offset, 0, diameter, diameter);
        }
      }
      pop();
    }
  }
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }
}