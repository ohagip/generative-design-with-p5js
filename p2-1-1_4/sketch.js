let tileCount = 10;

let tileWidth;
let tileHeight;
let shapeSize = 50;
let newShapeSize = shapeSize;
let shapeAngle = 0;
let maxDist;
let currentShape;
let shapes;

let sizeMode = 0;

function preload() {
  shapes = [];
  shapes.push(loadImage('data/module_1.svg'));
  shapes.push(loadImage('data/module_2.svg'));
  shapes.push(loadImage('data/module_3.svg'));
  shapes.push(loadImage('data/module_4.svg'));
  shapes.push(loadImage('data/module_5.svg'));
  shapes.push(loadImage('data/module_6.svg'));
  shapes.push(loadImage('data/module_7.svg'));
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  currentShape = shapes[0];
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  maxDist = sqrt(pow(width, 2) + pow(height, 2));
}

function draw() {
  clear();

  for (let gridY = 0; gridY < tileCount; gridY += 1) {
    for (let gridX = 0; gridX < tileCount; gridX += 1) {
      const posX = tileWidth * gridX + tileWidth / 2;
      const posY = tileHeight * gridY + tileWidth / 2;
      const angle = atan2(mouseY - posY, mouseX - posX) + (shapeAngle * (PI / 180));

      if (sizeMode === 0) {
        newShapeSize = shapeSize;
      }
      if (sizeMode === 1) {
        newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
      }
      if (sizeMode === 2) {
        newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
      }

      push();
      translate(posX, posY);
      rotate(angle);
      noStroke();
      image(currentShape, 0, 0, newShapeSize, newShapeSize);
      pop();
    }
  }
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }

  if (key === 'd' || key === 'D') {
    sizeMode = (sizeMode + 1) % 3;
  }
  if (key === 'g' || key === 'G') {
    tileCount += 5;
    if (tileCount > 20) {
      tileCount = 10;
    }
    tileWidth = width / tileCount;
    tileHeight = height / tileCount;
  }

  if (key === '1') {
    currentShape = shapes[0];
  }
  if (key === '2') {
    currentShape = shapes[1];
  }
  if (key === '3') {
    currentShape = shapes[2];
  }
  if (key === '4') {
    currentShape = shapes[3];
  }
  if (key === '5') {
    currentShape = shapes[4];
  }
  if (key === '6') {
    currentShape = shapes[5];
  }
  if (key === '7') {
    currentShape = shapes[6];
  }

  if (keyCode === UP_ARROW) {
    shapeSize += 5;
  }
  if (keyCode === DOWN_ARROW) {
    shapeSize = max(shapeSize - 5, 5);
  }
  if (keyCode === LEFT_ARROW) {
    shapeAngle += 5;
  }
  if (keyCode === RIGHT_ARROW) {
    shapeAngle -= 5;
  }
}