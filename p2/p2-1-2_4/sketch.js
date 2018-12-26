const tileCount = 20;
let actRandomSeed = 0;
let rectSize = 30;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  fill(192, 100, 64, 60);
}

function draw() {
  clear();
  randomSeed(actRandomSeed);

  for (let gridY = 0; gridY < tileCount; gridY += 1) {
    for (let gridX = 0; gridX < tileCount; gridX += 1) {
      const posX = width / tileCount * gridX;
      const posY = height / tileCount * gridY;

      const shiftX1 = mouseX / 20 * random(-1, 1);
      const shiftY1 = mouseY / 20 * random(-1, 1);
      const shiftX2 = mouseX / 20 * random(-1, 1);
      const shiftY2 = mouseY / 20 * random(-1, 1);
      const shiftX3 = mouseX / 20 * random(-1, 1);
      const shiftY3 = mouseY / 20 * random(-1, 1);
      const shiftX4 = mouseX / 20 * random(-1, 1);
      const shiftY4 = mouseY / 20 * random(-1, 1);

      push();
      translate(posX, posY);
      beginShape();
      vertex(shiftX1, shiftY1);
      vertex(rectSize + shiftX2, shiftY2);
      vertex(rectSize + shiftX3, rectSize + shiftY3);
      vertex(shiftX4, rectSize + shiftY4);
      endShape();
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