let sliders;

function SliderRose(_x, _y) {
  this.x1 = _x;
  this.y1 = _y;

  const sliders = [];
  let sinAngle = 0;
  let counter = 0;
  const roseRadius = random(20, 100);
  const skip = 20;

  for (let i = 0; i < 360; i += skip) {
    const sliderAngle = radians(i);
    const x2 = cos(sliderAngle) * roseRadius;
    const y2 = sin(sliderAngle) * roseRadius;

    sliders[counter] = createSlider(0, 255, 50);
    sliders[counter].position(this.x1 + x2, this.y1 + y2);
    sliders[counter].style('width', roseRadius + 'px');
    sliders[counter].style('transform', 'rotate(' + i + 'deg)');
    counter += 1;
  }

  this.update = function() {
    let offset = 0;
    for (let i = 0; i < sliders.length; i += 1) {
      const x = map(sin(sinAngle + offset), -1, 1, 0, 255);
      sliders[i].value(x);
      offset += 0.050;
    }
    sinAngle += 0.1;
  };

}

function setup() {
  sliders = [];
  createCanvas(windowWidth, windowHeight);
  // init canvas with slider rose to the middle
  sliders.push(new SliderRose(width / 2, height / 2));
}

function draw() {
  background(101, 179, 109);

  sliders.forEach(function(d) {
    d.update();
  });
}

function mousePressed() {
  sliders.push(new SliderRose(mouseX, mouseY));
}
