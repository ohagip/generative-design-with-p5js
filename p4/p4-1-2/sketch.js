let img;

function preload() {
  img = loadImage('data/pic.png');
}

function setup() {
  createCanvas(1024, 780);
  image(img, 0, 100);
}

function cropTiles() {
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;
  imgTiles = [];

  for (let gridY = 0; gridY < tileCountY; gridY += 1) {
    for (let gridX = 0; gridX < tileCountX; gridX += 1) {
      if (randomMode === true) {
        cropX = int(random(mouseX - tileWidth / 2, mouseX + tileWidth / 2));
        cropY = int(random(mouseY - tileHeight / 2, mouseY + tileHeight / 2));
      }
      cropX = constrain(cropX, 0, width - tileWidth);
      cropY = constrain(cropY, 0, height - tileHeight);
      imgTiles.push(img.get(cropX, cropY, tileWidth, tileHeight));
    }
  }
}

function draw() {
  let x1 = floor(random(width));
  let y1 = 50;

  let x2 = round(x1 + random(-7, 7));
  let y2 = round(y1 + random(-5, 5));

  let w = floor(random(10, 40));
  let h = height - 100;

  set(x2, y2, get(x1, y1, w, h));

  // let x1 = random(width);
  // let y1 = random(height);
  //
  // let x2 = round(x1 + random(-10, 10));
  // let y2 = round(y1 + random(-10, 10));
  //
  // let w = 150;
  // let h = 50;
  //
  // set(x2, y2, get(x1, y1, w, h));
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    clear();
    image(img, 0, 100);
  }
}