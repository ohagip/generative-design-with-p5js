let tileCountX = 50;
let tileCountY = 10;

let hueValues = [];
let saturationValues = [];
let brightnessValues = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  for (let i = 0; i < tileCountX; i += 1) {
    hueValues[i] = random(360);
    saturationValues[i] = random(100);
    brightnessValues[i] = random(100);
  }
}

function draw() {
  background(0, 0, 100);

  const mX = constrain(mouseX, 0, width);
  const mY = constrain(mouseY, 0, height);

  let counter = 0;

  const currentTileCountX = int(map(mX, 0, width, 1, tileCountX));
  const currentTileCountY = int(map(mY, 0, height, 1, tileCountY));
  const tileWidth = width / currentTileCountX;
  const tileHeight = height / currentTileCountY;

  for (let gridY = 0; gridY < tileCountY; gridY += 1) {
    for (let gridX = 0; gridX < tileCountX; gridX += 1) {
      const posX = tileWidth * gridX;
      const posY = tileHeight * gridY;
      const index = counter % currentTileCountX;

      fill(hueValues[index], saturationValues[index], brightnessValues[index]);
      rect(posX, posY, tileWidth, tileHeight);
      counter += 1;
    }
  }
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }

  if (key === '1') {
    for (let i = 0; i < tileCountX; i += 1) {
      hueValues[i] = random(360);
      saturationValues[i] = random(100);
      brightnessValues[i] = random(100);
    }
  }

  if (key === '2') {
    for (let i = 0; i < tileCountX; i += 1) {
      hueValues[i] = random(360);
      saturationValues[i] = random(100);
      brightnessValues[i] = 100;
    }
  }

  if (key === '3') {
    for (let i = 0; i < tileCountX; i += 1) {
      hueValues[i] = random(360);
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    }
  }

  if (key === '4') {
    for (let i = 0; i < tileCountX; i += 1) {
      hueValues[i] = 0;
      saturationValues[i] = 0;
      brightnessValues[i] = random(100);
    }
  }

  if (key === '5') {
    for (let i = 0; i < tileCountX; i += 1) {
      hueValues[i] = 195;
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    }
  }

  if (key === '6') {
    for (let i = 0; i < tileCountX; i += 1) {
      hueValues[i] = 195;
      saturationValues[i] = random(100);
      brightnessValues[i] = 100;
    }
  }

  if (key === '7') {
    for (let i = 0; i < tileCountX; i += 1) {
      hueValues[i] = random(180);
      saturationValues[i] = random(80, 100);
      brightnessValues[i] = random(50, 90);
    }
  }

  if (key === '8') {
    for (let i = 0; i < tileCountX; i += 1) {
      hueValues[i] = random(180, 360);
      saturationValues[i] = random(80, 100);
      brightnessValues[i] = random(50, 90);
    }
  }

  if (key === '9') {
    for (let i = 0; i < tileCountX; i += 1) {
      if (i % 2 === 0) {
        hueValues[i] = random(360);
        saturationValues[i] = 100;
        brightnessValues[i] = random(100);
      } else {
        hueValues[i] = 195;
        saturationValues[i] = random(100);
        brightnessValues[i] = 100;
      }
    }
  }

  if (key === '0') {
    for (let i = 0; i < tileCountX; i += 1) {
      if (i % 2 === 0) {
        hueValues[i] = 140;
        saturationValues[i] = random(30, 100);
        brightnessValues[i] = random(40, 100);
      } else {
        hueValues[i] = 210;
        saturationValues[i] = random(40, 100);
        brightnessValues[i] = random(50, 100);
      }
    }
  }
}