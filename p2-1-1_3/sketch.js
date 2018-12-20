let tileCount = 1;
let actRandomSeed = 0;
let actStrokeCap;

let colorLeft;
let colorRight;
let alphaLeft = 0;
let alphaRight = 100;

let transparentLeft = false;
let transparentRight = false;


function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  colorRight = color(0, 0, 0, alphaRight);
  colorLeft = color(323, 100, 77, alphaLeft);
}

function draw() {
  clear();
  strokeWeight(mouseX / 15);
  randomSeed(actRandomSeed);
  tileCount = mouseY / 15;

  for (let gridY = 0; gridY < tileCount; gridY += 1) {
    for (let gridX = 0; gridX < tileCount; gridX += 1) {
      const posX = width / tileCount * gridX;
      const posY = height / tileCount * gridY;
      const toggle = int(random(0, 2));

      alphaLeft = transparentLeft ? gridY * 10 : 100;
      colorLeft = color(hue(colorLeft), saturation(colorLeft), brightness(colorLeft), alphaLeft);
      alphaRight = transparentRight ? 100 - gridY * 10 : 100;
      colorRight = color(hue(colorRight), saturation(colorRight), brightness(colorRight), alphaRight);

      if (toggle === 0) {
        stroke(colorLeft);
        line(posX, posY, posX + (width / tileCount) / 2, posY + height / tileCount);
        line(posX + (width / tileCount) / 2, posY, posX + (width / tileCount), posY + height / tileCount);
      }
      if (toggle === 1) {
        stroke(colorRight);
        line(posX, posY + width / tileCount, posX + (height / tileCount) / 2, posY);
        line(posX + (height / tileCount) / 2, posY + width / tileCount, posX + (height / tileCount), posY);
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
    if (colorsEqual(colorLeft, color(273, 73, 51, alphaLeft))) {
      colorLeft = color(323, 100, 77, alphaLeft);
    } else {
      colorLeft = color(273, 73, 51, alphaLeft);
    }
  }
  if (key === '2') {
    if (colorsEqual(colorRight, color(0, 0, 0, alphaRight))) {
      colorRight = color(192, 100, 64, alphaRight);
    } else {
      colorRight = color(0, 0, 0, alphaRight);
    }
  }
  if (key === '3') {
    transparentLeft = !transparentLeft;
  }
  if (key === '4') {
    transparentRight = !transparentRight;
  }

  if (key === '0') {
    transparentLeft = false;
    transparentRight = false;
    colorLeft = color(323, 100, 77, alphaLeft);
    colorRight = color(0, 0, 0, alphaRight);
  }
}