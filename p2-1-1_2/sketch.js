const tileCount = 20;
let actRandomSeed = 0;
let actStrokeCap;

let colorLeft;
let colorRight;
let alphaLeft = 255;
let alphaRight = 255;

function setup() {
  createCanvas(600, 600);
  actStrokeCap = ROUND;
  colorLeft = color(197, 0, 123, alphaLeft);
  colorRight = color(87, 35, 129, alphaRight);
}

function draw() {
  clear();
  strokeCap(actStrokeCap);
  randomSeed(actRandomSeed);

  for (let gridY = 0; gridY < tileCount; gridY += 1) {
    for (let gridX = 0; gridX < tileCount; gridX += 1) {
      const posX = width / tileCount * gridX;
      const posY = height / tileCount * gridY;
      const toggle = int(random(0, 2));

      if (toggle === 0) {
        stroke(colorLeft);
        strokeWeight(mouseX / 10);
        line(posX, posY, posX + width / tileCount, posY + height / tileCount);
      }
      if (toggle === 1) {
        stroke(colorRight);
        strokeWeight(mouseY / 10);
        line(posX, posY + width / tileCount, posX + height / tileCount, posY);
      }
    }
  }
}

function colorsEqual(col1, col2) {
  return col1.toString() === col2.toString();
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }

  if (key === '1') {
    actStrokeCap = ROUND;
  }
  if (key === '2') {
    actStrokeCap = SQUARE;
  }
  if (key === '3') {
    actStrokeCap = PROJECT;
  }

  var black = color(0, 0, 0, 255);
  if (key === '4') {
    if (colorsEqual(colorLeft, black)) {
      colorLeft = color(197, 0, 123, alphaLeft);
    } else {
      colorLeft = color(0, 0, 0, alphaLeft);
    }
  }
  if (key === '5') {
    if (colorsEqual(colorRight, black)) {
      colorRight = color(87, 35, 129, alphaRight);
    } else {
      colorRight = color(0, 0, 0, alphaRight);
    }
  }

  if (key === '6') {
    if (alphaLeft === 255) {
      alphaLeft = 127;
    } else {
      alphaLeft = 255;
    }
    colorLeft = color(red(colorLeft), green(colorLeft), blue(colorLeft), alphaLeft);
  }
  if (key === '7') {
    if (alphaRight === 255) {
      alphaRight = 127;
    } else {
      alphaRight = 255;
    }
    colorRight = color(red(colorRight), green(colorRight), blue(colorRight), alphaRight);
  }

  if (key === '0') {
    actStrokeCap = ROUND;
    alphaLeft = 255;
    alphaRight = 255;
    colorLeft = color(0, 0, 0, alphaLeft);
    colorRight = color(0, 0, 0, alphaRight);
  }
}