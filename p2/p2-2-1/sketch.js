const NORTH = 0;
const NORTHEAST = 1;
const EAST = 2;
const SOUTHEAST = 3;
const SOUTH = 4;
const SOUTHWEST = 5;
const WEST = 6;
const NORTHWEST = 7;

let direction;
let stepSize = 1;
let diameter = 1;
let posX;
let posY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(0, 40);

  posX = width / 2;
  posY = height / 2;
}

function overlay() {
  const w = width - 100;
  const h = height - 100;

  if (drawMode === 1) {
    for (let i = -w / 2; i < w / 2; i += 5) {
      line(i, -h / 2, i, h / 2);
    }
  } else if (drawMode === 2) {
    for (let i = 0; i < w; i += 10) {
      ellipse(0, 0, i);
    }
  }
}

function draw() {
  for (let i = 0; i <= mouseX; i++) {
    direction = int(random(0, 8));

    if (direction === NORTH) {
      posY -= stepSize;
    } else if (direction === NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
    } else if (direction === EAST) {
      posX += stepSize;
    } else if (direction === SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    } else if (direction === SOUTH) {
      posY += stepSize;
    } else if (direction === SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    } else if (direction === WEST) {
      posX -= stepSize;
    } else if (direction === NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if (posX > width) posX = 0;
    if (posX < 0) posX = width;
    if (posY < 0) posY = height;
    if (posY > height) posY = 0;

    ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter, diameter);
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    clear();
  }
}