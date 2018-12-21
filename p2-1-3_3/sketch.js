let count = 0;
let tileCountX = 6;
let tileCountY = 6;

let drawMode = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noFill();
}

function draw() {
  background(255);

  count = mouseX / 20 + 5;

  const para = min(height, mouseY) / height - 0.5;
  const tileWidth = width / tileCountX;
  const tileHeight = height / tileCountY;


  for (let gridY = 0; gridY < tileCountY; gridY += 1) {
    for (let gridX = 0; gridX < tileCountX; gridX += 1) {
      const posX = tileWidth * gridX + tileWidth / 2;
      const posY = tileHeight * gridY + tileHeight / 2;

      push();
      translate(posX, posY);

      switch (drawMode) {
        case 1:
          translate(-tileWidth / 2, -tileHeight / 2);
          for (let i = 0; i < count; i++) {
            line(0, (para + 0.5) * tileHeight, tileWidth, i * tileHeight / count);
            line(0, i * tileHeight / count, tileWidth, tileHeight - (para + 0.5) * tileHeight);
          }
          break;
        case 2:
          for (let i = 0; i <= count; i++) {
            line(para * tileWidth, para * tileHeight, tileWidth / 2, (i / count - 0.5) * tileHeight);
            line(para * tileWidth, para * tileHeight, -tileWidth / 2, (i / count - 0.5) * tileHeight);
            line(para * tileWidth, para * tileHeight, (i / count - 0.5) * tileWidth, tileHeight / 2);
            line(para * tileWidth, para * tileHeight, (i / count - 0.5) * tileWidth, -tileHeight / 2);
          }
          break;
        case 3:
          for (let i = 0; i <= count; i++) {
            line(0, para * tileHeight, tileWidth / 2, (i / count - 0.5) * tileHeight);
            line(0, para * tileHeight, -tileWidth / 2, (i / count - 0.5) * tileHeight);
            line(0, para * tileHeight, (i / count - 0.5) * tileWidth, tileHeight / 2);
            line(0, para * tileHeight, (i / count - 0.5) * tileWidth, -tileHeight / 2);
          }
          break;
      }

      pop();
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
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
  if (keyCode === DOWN_ARROW) {
    tileCountY = max(tileCountY - 1, 1);
  }
  if (keyCode === UP_ARROW) {
    tileCountY += 1;
  }
  if (keyCode === LEFT_ARROW) {
    tileCountX = max(tileCountX - 1, 1);
  }
  if (keyCode === RIGHT_ARROW) {
    tileCountX += 1;
  }
}