let tileCountX = 10;
let tileCountY = 10;
let tileWidth = 0;
let tileHeight = 0;

let colorStep = 6;

let endSize = 0;
let stepSize = 30;

let actRandomSeed = 0;

function setup() {
  createCanvas(600, 600);
  noStroke();
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
}

function draw() {
  background(255);
  randomSeed(actRandomSeed);

  stepSize = min(mouseX, width) / 10;
  endSize = min(mouseY, height) / 10;

  for (let gridY = 0; gridY < tileCountY; gridY += 1) {
    for (let gridX = 0; gridX < tileCountX; gridX += 1) {
      const posX = tileWidth * gridX;
      const posY = tileHeight * gridY;

      const heading = int(random(4));
      for (let i = 0; i < stepSize; i++) {
        const diameter = map(i, 0, stepSize, tileWidth, endSize);
        fill(255 - i * colorStep);
        switch (heading) {
          case 0: ellipse(posX + i, posY, diameter, diameter); break;
          case 1: ellipse(posX, posY + i, diameter, diameter); break;
          case 2: ellipse(posX - i, posY, diameter, diameter); break;
          case 3: ellipse(posX, posY - i, diameter, diameter); break;
        }
      }
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