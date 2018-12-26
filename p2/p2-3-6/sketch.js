let modules;

let tileSize = 30;
let gridResolutionX;
let gridResolutionY;
let tiles = [];

let doDrawGrid = true;
let isDebugMode = false;

function preload() {
  modules = [];
  modules[0] = loadImage('data/00.svg');
  modules[1] = loadImage('data/01.svg');
  modules[2] = loadImage('data/02.svg');
  modules[3] = loadImage('data/03.svg');
  modules[4] = loadImage('data/04.svg');
  modules[5] = loadImage('data/05.svg');
  modules[6] = loadImage('data/06.svg');
  modules[7] = loadImage('data/07.svg');
  modules[8] = loadImage('data/08.svg');
  modules[9] = loadImage('data/09.svg');
  modules[10] = loadImage('data/10.svg');
  modules[11] = loadImage('data/11.svg');
  modules[12] = loadImage('data/12.svg');
  modules[13] = loadImage('data/13.svg');
  modules[14] = loadImage('data/14.svg');
  modules[15] = loadImage('data/15.svg');
}

function initTiles() {
  for (let gridX = 0; gridX < gridResolutionX; gridX += 1) {
    tiles[gridX] = [];
    for (let gridY = 0; gridY < gridResolutionY; gridY += 1) {
      tiles[gridX][gridY] = 0;
    }
  }
}

function setTile() {
  let gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  let gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 1;
}

function unsetTile() {
  let gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  let gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cursor(CROSS);
  rectMode(CENTER);
  imageMode(CENTER);
  strokeWeight(0.15);
  textSize(8);
  textAlign(CENTER, CENTER);

  gridResolutionX = round(width / tileSize) + 2;
  gridResolutionY = round(height / tileSize) + 2;

  initTiles();
}

function drawGrid() {
  for (let gridX = 0; gridX < gridResolutionX; gridX++) {
    for (let gridY = 0; gridY < gridResolutionY; gridY++) {
      let posX = tileSize * gridX - tileSize / 2;
      let posY = tileSize * gridY - tileSize / 2;
      fill(255);
      if (isDebugMode === true) {
        if (tiles[gridX][gridY] === 1) {
          fill(220);
        }
      }
      rect(posX, posY, tileSize, tileSize);
    }
  }
}

function drawModules() {
  for (let gridX = 0; gridX < gridResolutionX - 1; gridX++) {
    for (let gridY = 0; gridY < gridResolutionY - 1; gridY++) {
      // use only active tiles
      if (tiles[gridX][gridY] === 1) {
        let NORTH = str(tiles[gridX][gridY - 1]);
        let WEST = str(tiles[gridX - 1][gridY]);
        let SOUTH = str(tiles[gridX][gridY + 1]);
        let EAST = str(tiles[gridX + 1][gridY]);
        let binaryResult = NORTH + WEST + SOUTH + EAST;

        let decimalResult = parseInt(binaryResult, 2);

        let posX = tileSize * gridX - tileSize / 2;
        let posY = tileSize * gridY - tileSize / 2;

        image(modules[decimalResult], posX, posY, tileSize, tileSize);

        if (isDebugMode === true) {
          fill(150);
          text(decimalResult + '\n' + binaryResult, posX, posY);
        }
      }
    }
  }
}


function draw() {
  background(255);

  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      setTile();
    }
    if (mouseButton === RIGHT) {
      unsetTile();
    }
  }

  if (doDrawGrid === true) {
    drawGrid();
  }
  drawModules();
}

function keyReleased() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    background(255);
  }

  if (key === 'g' || key === 'G') {
    doDrawGrid = !doDrawGrid;
  }
  if (key === 'd' || key === 'D') {
    isDebugMode = !isDebugMode;
  }
}