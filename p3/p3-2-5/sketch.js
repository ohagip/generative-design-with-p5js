let font;

let textTyped = 'TYPE & CODE';
let drawMode = 1;
let fontSize = 250;
let padding = 10;
let nOff = 0;
let pointDensity = 8;

let colors;

let paths;
let textImg;

function preload() {
  font = loadFont('data/FiraSansCompressed-Bold.otf');
}

function setupText() {
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textTyped, 100, fontSize + 50);
  textImg.loadPixels();
}

function setup() {
  createCanvas(1600, 800);
  frameRate(25);
  rectMode(CENTER);

  colors = [color(65, 105, 185), color(245, 95, 80), color(15, 233, 118)];
  pixelDensity(1);

  setupText();
}

function draw() {
  background(255);

  nOff += 1;

  for (let x = 0; x < textImg.width; x += pointDensity) {
    for (let y = 0; y < textImg.height; y += pointDensity) {
      let index = (x + y * textImg.width) * 4;
      let r = textImg.pixels[index];

      if (r < 128) {
        if (drawMode === 1) {
          strokeWeight(1);

          let noiseFac = map(mouseX, 0, width, 0, 1);
          let lengthFac = map(mouseY, 0, height, 0.01, 1);

          let num = noise((x + nOff) * noiseFac, y * noiseFac);
          if (num < 0.6) {
            stroke(colors[0]);
          } else if (num < 0.7) {
            stroke(colors[1]);
          } else {
            stroke(colors[2]);
          }

          push();
          translate(x, y);
          rotate(radians(frameCount));
          line(0, 0, fontSize * lengthFac, 0);
          pop();
        }

        if (drawMode === 2) {
          stroke(0, 0, 0);
          strokeWeight(1);
          noStroke();
          push();
          translate(x, y);

          let num = noise((x + nOff) / 10, y / 10);

          if (num < 0.6) {
            fill(colors[0]);
          } else if (num < 0.7) {
            fill(colors[1]);
          } else {
            fill(colors[2]);
          }

          let w = noise((x - nOff) / 10, (y + nOff * 0.1) / 10) * 20;
          let h = noise((x - nOff) / 10, (y + nOff * 0.1) / 10) * 10;
          ellipse(0, 0, w, h); // rect() is cool too
          pop();
        }

        if (drawMode === 3) {
          stroke(0, 0, 0);
          strokeWeight(1);
          noStroke();

          let num = random(1);

          if (num < 0.6) {
            fill(colors[0]);
          } else if (num < 0.7) {
            fill(colors[1]);
          } else {
            fill(colors[2]);
          }

          push();
          beginShape();
          for (let i = 0; i < 3; i += 1) {
            let ox = (noise((i * 1000 + x - nOff) / 30, (i * 3000 + y + nOff) / 30) - 0.5) * pointDensity * 6;
            let oy = (noise((i * 2000 + x - nOff) / 30, (i * 4000 + y + nOff) / 30) - 0.5) * pointDensity * 6;
            vertex(x + ox, y + oy);
          }
          endShape(CLOSE);
          pop();
        }

        if (drawMode === 4) {
          stroke(colors[0]);
          strokeWeight(3);

          point(x - 10, y - 10);
          point(x, y);
          point(x + 10, y + 10);

          for (let i = 0; i < 5; i += 1) {
            if (i === 1) {
              stroke(colors[1]);
            } else if (i === 3) {
              stroke(colors[2]);
            }

            if (i % 2 === 0) {
              let ox = noise((10000 + i * 100 + x - nOff) / 10) * 10;
              let oy = noise((20000 + i * 100 + x - nOff) / 10) * 10;
              point(x + ox, y + oy);
            } else {
              let ox = noise((30000 + i * 100 + x - nOff) / 10) * 10;
              let oy = noise((40000 + i * 100 + x - nOff) / 10) * 10;
              point(x - ox, y - oy);
            }
          }
        }
      }
    }
  }
}

function keyReleased() {
  if (keyCode === CONTROL) {
    saveCanvas('canvas', 'png');
  }

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    textTyped = textTyped.substring(0,max(0,textTyped.length - 1));
    setupText();
  }
  if (keyCode === ENTER || keyCode === RETURN) {
    textTyped += '\n';
    setupText();
  }
  if (keyCode === LEFT_ARROW) {
    drawMode -= 1;
    if (drawMode < 1) {
      drawMode = 4;
    }
  }
  if (keyCode === RIGHT_ARROW) {
    drawMode += 1;
    if (drawMode > 4) {
      drawMode = 1;
    }
  }
  if (keyCode === DOWN_ARROW) {
    pointDensity -= 1;
    if (pointDensity < 4) {
      pointDensity = 4;
    }
  }
  if (keyCode === UP_ARROW) {
    pointDensity += 1;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    setupText();
  }
}