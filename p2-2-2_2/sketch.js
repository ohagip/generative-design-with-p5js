const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;
var direction = SOUTH;

let stepSize = 3;
let minLength = 10;
let diameter = 1;
let angleCount = 7;
let angle;
let reachedBorder = false;

let posX;
let posY;
let posXcross;
let posYcross;

let dWeight = 50;
let dStroke = 4;
let drawMode = 1;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  background(360);

  angle = getRandomAngle(direction);
  posX = floor(random(width));
  posY = 5;
  posXcross = posX;
  posYcross = posY;
}

function getRandomAngle(currentDirection) {
  const a = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
  if (currentDirection === NORTH) {
    return a - 90;
  }
  if (currentDirection === EAST) {
    return a;
  }
  if (currentDirection === SOUTH) {
    return a + 90;
  }
  if (currentDirection === WEST) {
    return a + 180;
  }
  return 0;
}

function draw() {
  const speed = int(map(mouseX, 0, width, 0, 20));
  for (let i = 0; i <= speed; i += 1) {
    strokeWeight(1);
    stroke(180, 0, 0);
    point(posX, posY);

    posX += cos(radians(angle)) * stepSize;
    posY += sin(radians(angle)) * stepSize;

    reachedBorder = false;

    if (posY <= 5) {
      direction = SOUTH;
      reachedBorder = true;
    } else if (posX >= width - 5) {
      direction = WEST;
      reachedBorder = true;
    } else if (posY >= height - 5) {
      direction = NORTH;
      reachedBorder = true;
    } else if (posX <= 5) {
      direction = EAST;
      reachedBorder = true;
    }

    loadPixels();
    const currentPixel = get(floor(posX), floor(posY));
    if (
      reachedBorder ||
      (currentPixel[0] !== 255 && currentPixel[1] !== 255 && currentPixel[2] !== 255)
    ) {
      angle = getRandomAngle(direction);

      const distance = dist(posX, posY, posXcross, posYcross);
      if (distance >= minLength) {
        strokeWeight(distance / dWeight);
        if (drawMode === 1) {
          stroke(0);
        }
        if (drawMode === 2) {
          stroke(52, 100, distance / dStroke);
        }
        if (drawMode === 3) {
          stroke(192, 100, 64, distance / dStroke);
        }
        line(posX, posY, posXcross, posYcross);
      }

      posXcross = posX;
      posYcross = posY;
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    background(360);
  }

  if (key === '1') {
    drawMode = 1;
  }
  if (key === '2') {
    drawMode = 2;
  }
  if (key === '3') {
    drawMode = 3;
  }
}