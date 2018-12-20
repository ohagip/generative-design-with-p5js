const tileCount = 20;
let actRandomSeed = 0;
let actStrokeCap;

function setup() {
  createCanvas(600, 600);
  actStrokeCap = ROUND;
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
        strokeWeight(mouseX / 20);
        line(posX, posY, posX + width / tileCount, posY + height / tileCount);
      }
      if (toggle === 1) {
        strokeWeight(mouseY / 20);
        line(posX, posY + width / tileCount, posX + height / tileCount, posY);
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

  if (key === '1') {
    actStrokeCap = ROUND;
  }
  if (key === '2') {
    actStrokeCap = SQUARE;
  }
  if (key === '3') {
    actStrokeCap = PROJECT;
  }
}