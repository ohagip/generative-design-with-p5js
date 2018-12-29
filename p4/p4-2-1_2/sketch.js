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
  this.a = 0;
  this.l = 0;
  this.rotation = 0;
  this.scaling = 1;
  this.image = image;
}

function generateCollageItems(layerImages, count, angle, length, rangeA, rangeL, scaleStart, scaleEnd, rotationStart, rotationEnd) {
  let layerItems = [];
  for (let i = 0; i < layerImages.length; i += 1) {
    for (let j = 0; j < count; j++) {
      let collageItem = new CollageItem(layerImages[i]);
      collageItem.a = angle + random(-rangeA / 2, rangeA / 2);
      collageItem.l = length + random(-rangeL / 2, rangeL / 2);
      collageItem.scaling = random(scaleStart, scaleEnd);
      collageItem.rotation = collageItem.a + HALF_PI + random(rotationStart, rotationEnd);
      layerItems.push(collageItem);
    }
  }
  return layerItems;
}

function drawCollageitems(layerItems) {
  for (let i = 0; i < layerItems.length; i += 1) {
    push();
    translate(
      width / 2 + cos(layerItems[i].a) * layerItems[i].l,
      height / 2 + sin(layerItems[i].a) * layerItems[i].l
    );
    rotate(layerItems[i].rotation);
    scale(layerItems[i].scaling);
    image(layerItems[i].image, 0, 0);
    pop();
  }
}

function setup() {
  createCanvas(1024, 768);
  imageMode(CENTER);

  layer1Items = generateCollageItems(layer1Images, 10, 0, height / 2, TAU, height, 0.1, 0.5, 0, 0);
  layer2Items = generateCollageItems(layer2Images, 15, 0, height / 2, TAU, height, 0.1, 0.3, -PI / 6, PI / 6);
  layer3Items = generateCollageItems(layer3Images, 11, 0, height / 2, TAU, height, 0.1, 0.2, 0, 0);

  drawCollageitems(layer1Items);
  drawCollageitems(layer2Items);
  drawCollageitems(layer3Items);
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }

  if (key === '1') {
    layer1Items = generateCollageItems(layer1Images, random(2, 10), 0, height / 2, PI * 5, height, 0.1, 0.5, 0, 0);
  }
  if (key === '2') {
    layer2Items = generateCollageItems(layer2Images, random(10, 25), 0, height * 0.15, PI * 5, 150, 0.1, random(0.3, 0.8), -PI / 6, PI / 6);
  }
  if (key === '3') {
    layer3Items = generateCollageItems(layer3Images, random(10, 25), 0, height * 0.66, PI * 5, height * 0.66, 0.1, random(0.2, 0.5), -0.05, 0.05);
  }

  clear();

  drawCollageitems(layer1Items);
  drawCollageitems(layer2Items);
  drawCollageitems(layer3Items);
}