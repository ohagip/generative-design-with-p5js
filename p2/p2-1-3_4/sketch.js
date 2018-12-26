let count = 0;
let tileCountX = 10;
let tileCountY = 10;
let drawMode = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  clear();
  noFill();

  count = mouseX / 10 + 10;

  const para = mouseY / height;
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
          stroke(0);
          for (let i = 0; i < count; i++) {
            rect(0, 0, tileWidth, tileHeight);
            scale(1 - 3 / count);
            rotate(para * 0.1);
          }
          break;
        case 2:
          noStroke();
          for (let i = 0; i < count; i++) {
            const gradient = lerpColor(color(0, 0), color(166, 141, 5), i / count);
            fill(gradient, i / count * 200);
            rotate(QUARTER_PI);
            rect(0, 0, tileWidth, tileHeight);
            scale(1 - 3 / count);
            rotate(para * 1.5);
          }
          break;
        case 3:
          noStroke();
          for (let i = 0; i < count; i++) {
            const gradient = lerpColor(color(0, 130, 164), color(255), i / count);
            fill(gradient, 170);

            push();
            translate(4 * i, 0);
            ellipse(0, 0, tileWidth / 4, tileHeight / 4);
            pop();

            push();
            translate(-4 * i, 0);
            ellipse(0, 0, tileWidth / 4, tileHeight / 4);
            pop();

            scale(1 - 1.5 / count);
            rotate(para * 1.5);
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