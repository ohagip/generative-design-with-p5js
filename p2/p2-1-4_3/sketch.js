let w = 600;
let h = 600;
let sliderCount;
let sliderWidth;
let sliderHeight = 17;
let padding = 10;

let sliderMin = 0;
let sliderMax = 100;

function setup() {
  createCanvas(800, 800);
  sliderWidth = w / 2;
  sliderCount = ceil(sliderWidth / sliderHeight);

  noLoop();
}

function draw() {
  background(48, 58, 118);

  // topleft - horizontal
  for (let i = 0; i <= sliderCount; i += 1) {
    const sval = map(i, sliderCount, 0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
    .position(padding, i * sliderHeight + padding)
    .style('width', sliderWidth + 'px');
  }

  // bottomright - horizontal
  for (let i = 0; i <= sliderCount; i += 1) {
    const sval = map(i, sliderCount, 0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
    .position(sliderWidth + padding * 3, sliderWidth + padding * 2 + i * sliderHeight)
    .style('width', sliderWidth + 'px');
  }

  // topright - vertical
  for (let i = 0; i <= sliderCount; i += 1) {
    const sval = map(i, 0, sliderCount, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
    .position(sliderWidth / 2 + padding * 2 + i * sliderHeight, sliderWidth / 2 + padding)
    .style('width', sliderWidth + 'px').style('transform', 'rotate(' + 90 + 'deg)');
  }

  // bottomleft - vertical
  for (let i = 0; i <= sliderCount; i += 1) {
    const sval = map(i, sliderCount, 0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
    .position(sliderWidth / 2 - i * sliderHeight + padding * 2, sliderWidth + sliderWidth / 2 + padding * 3)
    .style('width', sliderWidth + 'px').style('transform', 'rotate(' + 90 + 'deg)');
  }
}