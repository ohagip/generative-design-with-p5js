let layer1Images = [];
let layer2Images = [];
let layer3Images = [];

let layer1Items = [];
let layer2Items = [];
let layer3Items = [];

function preload() {
  layer1Images.push(loadImage('data/layer1_01.png'));
  layer1Images.push(loadImage('data/layer1_02.png'));
  layer1Images.push(loadImage('data/layer1_03.png'));
  layer1Images.push(loadImage('data/layer1_04.png'));
  layer1Images.push(loadImage('data/layer1_05.png'));
  layer1Images.push(loadImage('data/layer1_06.png'));
  layer1Images.push(loadImage('data/layer1_07.png'));
  layer1Images.push(loadImage('data/layer1_08.png'));
  layer1Images.push(loadImage('data/layer1_09.png'));
  layer1Images.push(loadImage('data/layer1_10.png'));
  layer1Images.push(loadImage('data/layer1_11.png'));

  layer2Images.push(loadImage('data/layer2_01.png'));
  layer2Images.push(loadImage('data/layer2_02.png'));
  layer2Images.push(loadImage('data/layer2_03.png'));
  layer2Images.push(loadImage('data/layer2_04.png'));
  layer2Images.push(loadImage('data/layer2_05.png'));

  layer3Images.push(loadImage('data/layer3_01.png'));
  layer3Images.push(loadImage('data/layer3_02.png'));
  layer3Images.push(loadImage('data/layer3_03.png'));
  layer3Images.push(loadImage('data/layer3_04.png'));
  layer3Images.push(loadImage('data/layer3_05.png'));
  layer3Images.push(loadImage('data/layer3_06.png'));
  layer3Images.push(loadImage('data/layer3_07.png'));
  layer3Images.push(loadImage('data/layer3_08.png'));
  layer3Images.push(loadImage('data/layer3_09.png'));
  layer3Images.push(loadImage('data/layer3_10.png'));
  layer3Images.push(loadImage('data/layer3_11.png'));
  layer3Images.push(loadImage('data/layer3_12.png'));
  layer3Images.push(loadImage('data/layer3_13.png'));
  layer3Images.push(loadImage('data/layer3_14.png'));
  layer3Images.push(loadImage('data/layer3_15.png'));
  layer3Images.push(loadImage('data/layer3_16.png'));
  layer3Images.push(loadImage('data/layer3_17.png'));
  layer3Images.push(loadImage('data/layer3_18.png'));
  layer3Images.push(loadImage('data/layer3_19.png'));
  layer3Images.push(loadImage('data/layer3_20.png'));
  layer3Images.push(loadImage('data/layer3_21.png'));
  layer3Images.push(loadImage('data/layer3_22.png'));
}

function CollageItem(image) {
  this.image = image;
  this.x = 0;
  this.y = 0;
  this.rotation = 0;
  this.scaling = 1;
}

function generateCollageItems(layerImages, count, posX, posY, rangeX, rangeY, scaleStart, scaleEnd, rotationStart, rotationEnd) {
  let layerItems = [];
  for (let i = 0; i < count; i += 1) {
    let index = i % layerImages.length;
    let item = new CollageItem(layerImages[index]);
    item.x = posX + random(-rangeX / 2, rangeX / 2);
    item.y = posY + random(-rangeY / 2, rangeY / 2);
    item.scaling = random(scaleStart, scaleEnd);
    item.rotation = random(rotationStart, rotationEnd);
    layerItems.push(item);
  }
  return layerItems;
}

function setup() {
  createCanvas(1024, 768);
  imageMode(CENTER);

  layer1Items = generateCollageItems(layer1Images, 100, width / 2, height / 2, width, height, 0.1, 0.5, 0, 0);
  layer2Items = generateCollageItems(layer2Images, 150, width / 2, height / 2, width, height, 0.1, 0.3, -HALF_PI, HALF_PI);
  layer3Items = generateCollageItems(layer3Images, 110, width / 2, height / 2, width, height, 0.1, 0.4, 0, 0);

  drawCollageItems(layer1Items);
  drawCollageItems(layer2Items);
  drawCollageItems(layer3Items);
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

function drawCollageItems(layerItems) {
  for (let i = 0; i < layerItems.length; i += 1) {
    push();
    translate(layerItems[i].x, layerItems[i].y);
    rotate(layerItems[i].rotation);
    scale(layerItems[i].scaling);
    image(layerItems[i].image, 0, 0);
    pop();
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }

  if (key === '1') {
    layer1Items = generateCollageItems(layer1Images, random(50, 200), width / 2, height / 2, width, height, 0.1, 0.5, 0, 0);
  }
  if (key === '2') {
    layer2Items = generateCollageItems(layer2Images, random(25, 300), width / 2, height / 2, width, height, 0.1, random(0.3, 0.8), -HALF_PI, HALF_PI);
  }
  if (key === '3') {
    layer3Items = generateCollageItems(layer3Images, random(50, 300), width / 2, height / 2, width, height, 0.1, random(0.2, 0.6), -0.05, 0.05);
  }

  clear();

  drawCollageItems(layer1Items);
  drawCollageItems(layer2Items);
  drawCollageItems(layer3Items);
}