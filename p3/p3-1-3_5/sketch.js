let joinedText;
let textPOSTags = [];

let allPOSTags = [
  'cc',
  'cd',
  'dt',
  'ex',
  'fw',
  'in',
  'jj',
  'jjr',
  'jjs',
  'ls',
  'md',
  'nn',
  'nns',
  'nnp',
  'nnps',
  'pdt',
  'pos',
  'prp',
  'prp$',
  'rb',
  'rbr',
  'rbs',
  'rp',
  'sym',
  'to',
  'uh',
  'vb',
  'vbd',
  'vbg',
  'vbn',
  'vbp',
  'vbz',
  'wdt',
  'wp',
  'wp$',
  'wrb'
];
let allPOSTagsFull = [
  'Coordinating conjunction',
  'Cardinal number',
  'Determiner',
  'Existential there',
  'Foreign word',
  'Preposition or subordinating conjunction',
  'Adjective',
  'Adjective, comparative',
  'Adjective, superlative',
  'List item marker',
  'Modal',
  'Noun, singular or mass',
  'Noun, plural',
  'Proper noun, singular',
  'Proper noun, plural',
  'Predeterminer',
  'Possessive ending',
  'Personal pronoun',
  'Possessive pronoun',
  'Adverb',
  'Adverb, comparative',
  'Adverb, superlative',
  'Particle',
  'Symbol',
  'to',
  'Interjection',
  'Verb, base form',
  'Verb, past tense',
  'Verb, gerund or present participle',
  'Verb, past participle',
  'Verb, non-3rd person singular present',
  'Verb, 3rd person singular present',
  'Wh-determiner',
  'Wh-pronoun',
  'Possessive wh-pronoun',
  'Wh-adverb'
];

let counters = [];

let posX;
let posY;

let drawGreyLines = true;
let drawColoredLines = true;
let drawText = true;

function preload() {
  joinedText = loadStrings('data/AllTheWorldsAStage.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  textFont('monospace', 18);
  fill(0);

  for (let i = 0; i < allPOSTags.length; i += 1) {
    counters.push(0);
  }

  joinedText = joinedText.join(' ');
  joinedText = joinedText.split(/\s+/);
  for (let i = 0; i < joinedText.length; i += 1) {

    let wordPOSTag = RiTa.getPosTags(RiTa.stripPunctuation(joinedText[i]))[0];

    textPOSTags.push(wordPOSTag);

    let tagIndex = allPOSTags.indexOf(wordPOSTag);
    if (tagIndex >= 0) {
      counters[tagIndex]++;
    }

    joinedText[i] += ' ';

  }
}

function draw() {
  background(360);

  translate(50, 0);

  noStroke();

  posX = 0;
  posY = 50;
  let sortPositionsX = [];
  let oldPositionsX = [];
  let oldPositionsY = [];
  for (let i = 0; i < joinedText.length; i += 1) {
    sortPositionsX[i] = 0;
    oldPositionsX[i] = 0;
    oldPositionsY[i] = 0;
  }
  let oldX = 0;
  let oldY = 0;

  if (mouseX >= width - 50) {
    textSize(10);
    for (let i = 0; i < allPOSTags.length; i++) {
      textAlign(LEFT);
      text(allPOSTags[i] + ' (' + allPOSTagsFull[i] + ')', -20, i * 20 + 40);
      textAlign(RIGHT);
      text(counters[i], -25, i * 20 + 40);
    }
    textAlign(LEFT);
    textSize(18);
  }

  translate(256, 0);

  for (let i = 0; i < joinedText.length; i += 1) {
    let wordPOSTag = textPOSTags[i];
    let index = allPOSTags.indexOf(wordPOSTag);
    if (index < 0) {
      continue;
    }

    let m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);

    let sortX = sortPositionsX[index];
    let interX = lerp(posX, sortX, m);

    let sortY = index * 20 + 40;
    let interY = lerp(posY, sortY, m);

    if (drawGreyLines === true) {
      if (oldX !== 0 && oldY !== 0) {
        stroke(0, 10);
        line(oldX, oldY, interX, interY);
      }
      oldX = interX;
      oldY = interY;
    }

    if (drawColoredLines === true) {
      if (oldPositionsX[index] !== 0 && oldPositionsY[index] !== 0) {
        stroke(index * 10, 80, 60, 50);
        line(oldPositionsX[index], oldPositionsY[index], interX, interY);
      }
      oldPositionsX[index] = interX;
      oldPositionsY[index] = interY;
    }

    if (drawText === true) {
      text(joinedText[i], interX, interY);
    }

    sortPositionsX[index] += textWidth(joinedText[i]);
    posX += textWidth(joinedText[i]);
    if (posX >= min(width, 1000)) {
      posY += 40;
      posX = 0;
    }
  }
}

function keyReleased() {
  if (keyCode === CONTROL) {
    saveCanvas('canvas', 'png');
  }

  if (key === '1') {
    drawGreyLines = !drawGreyLines;
  }
  if (key === '2') {
    drawColoredLines = !drawColoredLines;
  }
  if (key === '3') {
    drawText = !drawText;
  }
}