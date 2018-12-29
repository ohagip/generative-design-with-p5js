let tileCountX = 9;
let tileCountY = 12;
let tileWidth;
let tileHeight;
let imageCount = tileCountX * tileCountY;
let currentImage = 0;
let gridX = 0;
let gridY = 0;

let movie;

function preload() {
  movie = createVideo(['data/video.mp4']);
  movie.hide();
}

function setup() {
  createCanvas(1024, 1024);
  background(0);

  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  print(movie.width + ' • ' + movie.height);
}

function draw() {
  if (movie.elt.readyState === 4) {
    let posX = tileWidth * gridX;
    let posY = tileHeight * gridY;

    image(movie, posX, posY, tileWidth, tileHeight);

    currentImage += 1;

    let nextTime = map(currentImage, 0, imageCount, 0, movie.duration());
    print('seek to: ' + movie.time());
    movie.time(nextTime);

    gridX += 1;
    if (gridX >= tileCountX) {
      gridX = 0;
      gridY += 1;
    }

    if (currentImage >= imageCount) {
      noLoop();
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }
}