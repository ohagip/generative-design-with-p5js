let count = 10;

let colorStep = 20;
let lineWeight = 0;
let strokeColor = 0;
let backgroundColor = 0;

let drawMode = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(backgroundColor);

  const tileCountX = mouseX / 30 + 1;
  const tileCountY = mouseY / 30 + 1;
  const tileWidth = width / tileCountX;
  const tileHeight = height / tileCountY;


  for (let gridY = 0; gridY < tileCountY; gridY += 1) {
    for (let gridX = 0; gridX < tileCountX; gridX += 1) {
      const posX = tileWidth * gridX;
      const posY = tileHeight * gridY;

      const x1 = tileWidth / 2;
      const y1 = tileHeight / 2;
      let x2 = 0;
      let y2 = 0;

      push();
      translate(posX, posY);

      for (let side = 0; side < 4; side += 1) {
        for (let i = 0; i < count; i += 1) {
          switch (side) {
            case 0:
              x2 += tileWidth / count;
              y2 = 0;
              break;
            case 1:
              x2 = tileWidth;
              y2 += tileHeight / count;
              break;
            case 2:
              x2 -= tileWidth / count;
              y2 = tileHeight;
              break;
            case 3:
              x2 = 0;
              y2 -= tileHeight / count;
              break;
          }

          if (i < count / 2) {
            lineWeight += 1;
            strokeColor += 60;
          } else {
            lineWeight -= 1;
            strokeColor -= 60;
          }

          // set colors depending on draw mode
          switch (drawMode) {
            case 1:
              backgroundColor = 255;
              stroke(0);
              break;
            case 2:
              backgroundColor = 255;
              stroke(0);
              strokeWeight(lineWeight);
              break;
            case 3:
              backgroundColor = 0;
              stroke(strokeColor);
              strokeWeight(mouseX / 100);
              break;
          }

          // draw the line
          line(x1, y1, x2, y2);
        }
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
}