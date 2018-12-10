let tileCountX = 2;
let tileCountY = 10;

let colorsLeft = [];
let colorsRight = [];

let interpolateShortest = true;

function shakeColors() {
  for (let i = 0; i < tileCountY; i += 1) {
    colorsLeft[i] = color(random(0, 60), random(0, 100), 100);
    colorsRight[i] = color(random(160, 190), 100, random(0, 100));
  }
}

function setup() {
  createCanvas(800, 800);
  noStroke();
  colorMode(HSB);
  shakeColors();
}

function draw() {
  tileCountX = int(map(mouseX, 0, width, 2, 100));
  tileCountY = int(map(mouseY, 0, height, 2, 10));
  const tileWidth = width / tileCountX;
  const tileHeight = width / tileCountY;
  let interCol;

  for (let gridY = 0; gridY < tileCountY; gridY += 1) {
    const col1 = colorsLeft[gridY];
    const col2 = colorsRight[gridY];

    for (let gridX = 0; gridX < tileCountX; gridX += 1) {
      const amount = map(gridX, 0, tileCountX - 1, 0, 1);

      if (interpolateShortest === true) {
        colorMode(RGB);
        interCol = lerpColor(col1, col2, amount);
      } else {
        colorMode(HSB);
        interCol = lerpColor(col1, col2, amount);
      }

      fill(interCol);

      const posX = tileWidth * gridX;
      const posY = tileHeight * gridY;
      rect(posX, posY, tileWidth, tileHeight);
    }
  }
}

function mouseReleased() {
  shakeColors();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }
  if (key === '1') interpolateShortest = true;
  if (key === '2') interpolateShortest = false;
}