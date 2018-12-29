let cam;
let icons;
let tree;
let recording = false;

function preload() {
  icons = {};
  for (let name in emojis) {
    icons[name] = loadImage('../p4-3-4/data/emojis/' + name + '.png');
  }
}


function setup() {
  createCanvas(80 * 16, 60 * 16);

  let colors = [];
  for (let name in emojis) {
    let col = emojis[name].averageColor;
    col.emoji = name;
    colors.push(col);
  }
  let distance = function(a, b){
    return Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2);
  };
  tree = new kdTree(colors, distance, ['r', 'g', 'b']);

  cam = createCapture(VIDEO);
  cam.size(80, 60);
  cam.hide();
}

function draw() {
  background(255);
  cam.loadPixels();

  let titleWidth = width / cam.width;
  let titleHeight = height / cam.height;
  for (let gridX = 0; gridX < cam.width; gridX += 1) {
    for (let gridY = 0; gridY < cam.height; gridY += 1) {
      let posX = titleWidth * gridX;
      let posY = titleHeight * gridY;
      let rgba = cam.get(min(gridX,cam.width - 1), gridY);
      let nearest = tree.nearest({r: rgba[0], g: rgba[1], b: rgba[2]}, 1)[0][0];
      image(icons[nearest.emoji], posX, posY, titleWidth, titleHeight);
      // fill(rgba);
      // ellipse(posX, posY, titleWidth, titleHeight);
    }
  }

  if (recording) saveCanvas(gd.timestamp(), 'png');
}

function keyReleased() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }
  if (key === 'f' || key === 'F') {
    recording = !recording;
  }
}