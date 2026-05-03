// =============================================
// THE WALL - Experimental Music Discovery
// built with p5.js
// two pages - WAR and PEACE
// =============================================

let songs = []; // not actually used anymore since i split into warSongs and peaceSongs but scared to delete it
let covers = []; // same as above
let boxes = [];
let currentPlaying = null; // keeps track of whats playing so only one plays at a time

// current page - 1 = WAR, 2 = PEACE
let currentPage = 1;

// ---- WAR PAGE SONGS ----
let songFiles = [
  "assets/sounds/slime.mp3",      // slot 1
  "assets/sounds/cashjunko.mp3",  // slot 2
  "assets/sounds/happy.mp3",      // slot 3
  "assets/sounds/saga.mp3",       // slot 4
  "assets/sounds/ac640.mp3",      // slot 5
  "assets/sounds/sem.mp3",        // slot 6
  "assets/sounds/st6.mp3",        // slot 7
  "assets/sounds/liljay.mp3",     // slot 8
  "assets/sounds/tovi.mp3"        // slot 9
];

let imageFiles = [
  "assets/images/slime.jpg",      // slot 1
  "assets/images/cashjunko.jpg",  // slot 2
  "assets/images/happy.jpg",      // slot 3
  "assets/images/saga.jpg",       // slot 4
  "assets/images/ac6401.jpg",     // slot 5
  "assets/images/sem.jpg",        // slot 6
  "assets/images/st6.jpg",        // slot 7
  "assets/images/liljay.jpg",     // slot 8
  "assets/images/tovi.jpg"        // slot 9
];

// ---- PEACE PAGE SONGS ----
let peaceSongFiles = [
  "assets/sounds/smokedope.mp3",  // slot 1
  "assets/sounds/bladee.mp3",     // slot 2
  "assets/sounds/fullbody.mp3",   // slot 3
  "assets/sounds/soulja.mp3",     // slot 4
  "assets/sounds/kray.mp3",       // slot 5
  "assets/sounds/skullhead.mp3",  // slot 6
  "assets/sounds/lilb.mp3",       // slot 7
  "assets/sounds/xavier.mp3",     // slot 8
  "assets/sounds/vanilla.mp3"     // slot 9
];

let peaceImageFiles = [
  "assets/images/smokedope.jpg",  // slot 1
  "assets/images/bladee.jpg",     // slot 2
  "assets/images/fullbody.jpg",   // slot 3
  "assets/images/soulja.jpg",     // slot 4
  "assets/images/kray.jpg",       // slot 5
  "assets/images/skullhead.jpg",  // slot 6
  "assets/images/lilb.jpg",       // slot 7
  "assets/images/xavier.jpg",     // slot 8
  "assets/images/vanilla.jpg"     // slot 9
];

// labels for both pages
let warLabels = [
  "TRACK 01 ██████",
  "TRACK 02 ██████",
  "TRACK 03 ██████",
  "TRACK 04 ██████",
  "TRACK 05 ██████",
  "TRACK 06 ██████",
  "TRACK 07 ██████",
  "TRACK 08 ██████",
  "TRACK 09 ██████"
];

let peaceLabels = [
  "TRACK 01 ~~~~~~",
  "TRACK 02 ~~~~~~",
  "TRACK 03 ~~~~~~",
  "TRACK 04 ~~~~~~",
  "TRACK 05 ~~~~~~",
  "TRACK 06 ~~~~~~",
  "TRACK 07 ~~~~~~",
  "TRACK 08 ~~~~~~",
  "TRACK 09 ~~~~~~"
];

// separate arrays for each page
let warSongs = [];
let warCovers = [];
let peaceSongs = [];
let peaceCovers = [];

// blood drips for war page
let drips = [];

// floating particles for peace page
let particles = [];

// rays of light for peace page - like sun rays coming down
// i wanted something simple like the blood drips but opposite feeling
let rays = [];

function preload() {
  // loads everything before the sketch starts
  // had an issue here early on where images werent loading because
  // i had the wrong folder name - it was "image" not "images", took me ages to spot
  for (let i = 0; i < 9; i++) {
    warSongs.push(loadSound(songFiles[i]));
    warCovers.push(loadImage(imageFiles[i]));
    peaceSongs.push(loadSound(peaceSongFiles[i]));
    peaceCovers.push(loadImage(peaceImageFiles[i]));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight); // fills the whole screen
  textFont("monospace");

  buildBoxes();

  // spawn blood drips for war page
  for (let i = 0; i < 18; i++) {
    drips.push(new BloodDrip(random(width)));
  }

  // spawn particles for peace page
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
  }

  // spawn light rays for peace page
  // tried 10 first but looked too busy, 5 feels right
  for (let i = 0; i < 5; i++) {
    rays.push(new LightRay(random(width)));
  }
}

// builds the 3x3 grid of boxes depending on which page we are on
function buildBoxes() {
  boxes = []; // clear old boxes first - forgot this the first time and boxes were stacking on top of each other
  let cols = 3;
  let boxW = width / cols;
  let boxH = height / cols;

  for (let i = 0; i < 9; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = col * boxW;
    let y = row * boxH;

    if (currentPage === 1) {
      boxes.push(new WallBox(x, y, boxW, boxH, warCovers[i], warSongs[i], warLabels[i]));
    } else {
      boxes.push(new PeaceBox(x, y, boxW, boxH, peaceCovers[i], peaceSongs[i], peaceLabels[i]));
    }
  }
}

function draw() {
  if (currentPage === 1) {
    drawWarPage();
  } else {
    drawPeacePage();
  }

  drawSwitchButton(); // always draw the switch button on top
  drawResetButton();  // always draw reset button too
}

// =============================================
// WAR PAGE
// =============================================
function drawWarPage() {
  background(10, 0, 0); // very dark red/black

  // blood drips behind everything (visible if you pay attention but not how I wanted it to be boxes are too big)
  for (let d of drips) {
    d.update();
    d.show();
  }

  for (let b of boxes) {
    b.show();
  }

  fill(180, 0, 0, 150);
  noStroke();
  textSize(11);
  textAlign(CENTER);
  text("// Expand your Taste //", width / 2, height - 10);
}

// =============================================
// PEACE PAGE
// =============================================
function drawPeacePage() {
  background(230, 240, 255); // soft light blue/white

  // light rays drifting down from the top, like sunlight (not visible due to boxes and colour gave up on this)
  for (let r of rays) {
    r.update();
    r.show();
  }

  // floating particles on top of rays (not visible due to boxes and colour gave up on this)
  for (let p of particles) {
    p.update();
    p.show();
  }

  for (let b of boxes) {
    b.show();
  }

  // gold text at the bottom - was really hard to read before
  fill(212, 175, 55, 200); // gold colour
  noStroke();
  textSize(11);
  textAlign(CENTER);
  text("// Expand your Taste //", width / 2, height - 10);
}

function mousePressed() {
  userStartAudio(); // browsers block audio until user clicks something, this unlocks it

  // check switch button
  let sx = 10;
  let sy = height - 40;
  let sw = 150;
  let sh = 30;

  if (mouseX > sx && mouseX < sx + sw &&
      mouseY > sy && mouseY < sy + sh) {
    switchPage();
    return; // stop here so it doesnt also trigger a box click
  }

  // check reset button
  let bx = width - 160;
  let by = height - 40;
  let bw = 150;
  let bh = 30;

  if (mouseX > bx && mouseX < bx + bw &&
      mouseY > by && mouseY < by + bh) {
    if (currentPlaying && currentPlaying.isPlaying()) {
      currentPlaying.stop();
      currentPlaying = null;
    }
    for (let b of boxes) {
      b.revealed = false;
    }
    return;
  }

  // otherwise check if a box was clicked
  for (let b of boxes) {
    b.clicked(mouseX, mouseY);
  }
}

// switches between war and peace pages
function switchPage() {
  // stop music when switching pages otherwise it keeps playing in background
  if (currentPlaying && currentPlaying.isPlaying()) {
    currentPlaying.stop();
    currentPlaying = null;
  }

  if (currentPage === 1) {
    currentPage = 2;
  } else {
    currentPage = 1;
  }

  buildBoxes(); // rebuild boxes for the new page
}

function mouseMoved() {
  for (let b of boxes) {
    b.checkHover(mouseX, mouseY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // note: boxes dont rebuild when resized so layout can look slightly off
  // didnt have time to fix this properly
}

// =============================================
// WallBox class - WAR page blocks
// =============================================
class WallBox {
  constructor(x, y, w, h, img, sound, label) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.sound = sound;
    this.label = label;
    this.revealed = false;
    this.hovered = false;
    this.glitchTimer = 0; // never got around to using this properly
  }

  show() {
    if (this.revealed) {
      image(this.img, this.x, this.y, this.w, this.h);

      // dark red grime overlay
      fill(120, 0, 0, 30);
      noStroke();
      rect(this.x, this.y, this.w, this.h);

      // scanline effect - draws horizontal lines across the image
      stroke(0, 0, 0, 50);
      for (let i = this.y; i < this.y + this.h; i += 3) {
        line(this.x, i, this.x + this.w, i);
      }

      // song label at bottom
      noStroke();
      fill(180, 0, 0);
      textSize(12);
      textAlign(CENTER);
      text(this.label, this.x + this.w / 2, this.y + this.h - 10);

    } else {
      // no hover flicker anymore - removed it because it looked bad (didnt fit the vibe)
      // just a solid rusty colour now
     // subtle hover effect - just makes it slightly more red when you mouse over it
if (this.hovered) {
  fill(130, 25, 5); // brighter red when hovered
} else {
  fill(90, 20, 5); // normal dark rusty brown-red
}

      noStroke();
      rect(this.x + 4, this.y + 4, this.w - 8, this.h - 8);

       
      

      // label stamped on
      fill(30, 5, 0);
      textSize(13);
      textAlign(CENTER, CENTER);
      text(this.label, this.x + this.w / 2, this.y + this.h / 2);

      // rough border
      noFill();
      stroke(160, 30, 0);
      strokeWeight(2);
      rect(this.x + 3, this.y + 3, this.w - 6, this.h - 6);

      // corner brackets - makes it look like a classified document
      stroke(180, 40, 0);
      strokeWeight(2);
      let bs = 15;
      // top left
      line(this.x + 8, this.y + 8, this.x + 8 + bs, this.y + 8);
      line(this.x + 8, this.y + 8, this.x + 8, this.y + 8 + bs);
      // top right
      line(this.x + this.w - 8, this.y + 8, this.x + this.w - 8 - bs, this.y + 8);
      line(this.x + this.w - 8, this.y + 8, this.x + this.w - 8, this.y + 8 + bs);
      // bottom left
      line(this.x + 8, this.y + this.h - 8, this.x + 8 + bs, this.y + this.h - 8);
      line(this.x + 8, this.y + this.h - 8, this.x + 8, this.y + this.h - 8 - bs);
      // bottom right
      line(this.x + this.w - 8, this.y + this.h - 8, this.x + this.w - 8 - bs, this.y + this.h - 8);
      line(this.x + this.w - 8, this.y + this.h - 8, this.x + this.w - 8, this.y + this.h - 8 - bs);
    }
  }

  checkHover(mx, my) {
    this.hovered = (mx > this.x && mx < this.x + this.w &&
                    my > this.y && my < this.y + this.h);
  }

  clicked(mx, my) {
    if (mx > this.x && mx < this.x + this.w &&
        my > this.y && my < this.y + this.h) {
      if (!this.revealed) {
        this.revealed = true;
        if (currentPlaying && currentPlaying.isPlaying()) {
          currentPlaying.stop();
        }
        this.sound.play();
        currentPlaying = this.sound;
      }
    }
  }
}

// =============================================
// PeaceBox class - PEACE page blocks
// =============================================
class PeaceBox {
  constructor(x, y, w, h, img, sound, label) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.sound = sound;
    this.label = label;
    this.revealed = false;
    this.hovered = false;
  }

  show() {
    if (this.revealed) {
      image(this.img, this.x, this.y, this.w, this.h);

      // soft white overlay
      fill(255, 255, 255, 20);
      noStroke();
      rect(this.x, this.y, this.w, this.h);

      // very faint scanlines
      stroke(255, 255, 255, 30);
      for (let i = this.y; i < this.y + this.h; i += 5) {
        line(this.x, i, this.x + this.w, i);
      }

      // gold label - changed from blue because it wasnt visible before (hard to see)
      noStroke();
      fill(212, 175, 55);
      textSize(12);
      textAlign(CENTER);
      text(this.label, this.x + this.w / 2, this.y + this.h - 10);

    } else {
      // slightly brighter when hovered
      if (this.hovered) {
        fill(210, 228, 255);
      } else {
        fill(180, 200, 240); // soft blue/white
      }

      noStroke();
      rect(this.x + 4, this.y + 4, this.w - 8, this.h - 8);

      // gold label text - was using light blue before and couldnt read it at all
      fill(180, 140, 30);
      textSize(13);
      textAlign(CENTER, CENTER);
      text(this.label, this.x + this.w / 2, this.y + this.h / 2);

      // thin soft border
      noFill();
      stroke(200, 215, 240);
      strokeWeight(1);
      rect(this.x + 2, this.y + 2, this.w - 4, this.h - 4);

      // corner brackets
      stroke(180, 200, 230);
      strokeWeight(1);
      let bs = 15;
      // top left
      line(this.x + 8, this.y + 8, this.x + 8 + bs, this.y + 8);
      line(this.x + 8, this.y + 8, this.x + 8, this.y + 8 + bs);
      // top right
      line(this.x + this.w - 8, this.y + 8, this.x + this.w - 8 - bs, this.y + 8);
      line(this.x + this.w - 8, this.y + 8, this.x + this.w - 8, this.y + 8 + bs);
      // bottom left
      line(this.x + 8, this.y + this.h - 8, this.x + 8 + bs, this.y + this.h - 8);
      line(this.x + 8, this.y + this.h - 8, this.x + 8, this.y + this.h - 8 - bs);
      // bottom right
      line(this.x + this.w - 8, this.y + this.h - 8, this.x + this.w - 8 - bs, this.y + this.h - 8);
      line(this.x + this.w - 8, this.y + this.h - 8, this.x + this.w - 8, this.y + this.h - 8 - bs);
    }
  }

  checkHover(mx, my) {
    this.hovered = (mx > this.x && mx < this.x + this.w &&
                    my > this.y && my < this.y + this.h);
  }

  clicked(mx, my) {
    if (mx > this.x && mx < this.x + this.w &&
        my > this.y && my < this.y + this.h) {
      if (!this.revealed) {
        this.revealed = true;
        if (currentPlaying && currentPlaying.isPlaying()) {
          currentPlaying.stop();
        }
        this.sound.play();
        currentPlaying = this.sound;
      }
    }
  }
}

// =============================================
// BloodDrip class - war page only
// =============================================
class BloodDrip {
  constructor(x) {
    this.x = x;
    this.y = random(-200, 0); // start above the screen so they drift in
 this.speed = random(0.3, 1.2); // drips slowly
    this.len = random(40, 150); // length of the drip
    this.thickness = random(2, 6);
    this.col = color(random(140, 200), 0, 0); // dark red
  }

  update() {
    this.y += this.speed;
    // reset drip back to top when it goes off the bottom
 if (this.y > height + 200) {
      this.y = random(-200, 0);
      this.x = random(width);
      this.len = random(40, 150);
    }
  }

  show() {
    stroke(this.col);
    strokeWeight(this.thickness);
line(this.x, this.y, this.x, this.y + this.len);
    // little blob at the end of the drip
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y + this.len, this.thickness + 2, this.thickness + 4);
  }
}

// =============================================
// Particle class - peace page only
// =============================================
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(3, 10);
    this.speedX = random(-0.3, 0.3);
  this.speedY = random(-0.5, -0.1); // drift upward slowly
 this.opacity = random(100, 200);
    this.col = color(random(180, 220), random(200, 230), 255, this.opacity);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y < -10) {
      this.reset();
      this.y = height + 10; // bring back from the bottom
    }
  }

  show() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// =============================================
// LightRay class - peace page only
// like the blood drips but going down and golden/white
// wanted something that felt like sunlight coming through
// =============================================
class LightRay {
  constructor(x) {
    this.x = x;
    this.y = random(-300, 0); // start above screen
    this.speed = random(0.2, 0.6); // slower than blood drips, more peaceful
    this.len = random(100, 300); // longer than drips
    this.thickness = random(8, 25); // wide and soft
    this.opacity = random(15, 35); // very faint so it doesnt overpower everything
  }

  update() {
    this.y += this.speed;
    if (this.y > height + 300) {
      this.y = random(-300, 0);
      this.x = random(width);
     this.len = random(100, 300);
    }
  }

  show() {
    // no stroke, just a soft wide semi transparent beam
    noStroke();
    fill(255, 240, 180, this.opacity); // warm golden white
    // draw as a thin tall rectangle instead of a line so it has width
    rect(this.x - this.thickness / 2, this.y, this.thickness, this.len);
  }
}

// =============================================
// buttons
// =============================================

// switch button bottom left
function drawSwitchButton() {
  let sx = 10;
  let sy = height - 40;
  let sw = 150;
  let sh = 30;

  if (currentPage === 1) {
    // war page - button says PEACE
    fill(10, 0, 0);
    stroke(200, 0, 0);
    strokeWeight(1);
    rect(sx, sy, sw, sh);
    fill(200, 0, 0);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text("[ PEACE ]", sx + sw / 2, sy + sh / 2);
  } else {
    // peace page - button says WAR
    fill(240, 245, 255);
    stroke(150, 180, 220);
    strokeWeight(1);
    rect(sx, sy, sw, sh);
    fill(120, 150, 200);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text("[ WAR ]", sx + sw / 2, sy + sh / 2);
  }
}

// reset button bottom right
function drawResetButton() {
  let bx = width - 160;
  let by = height - 40;
  let bw = 150;
  let bh = 30;

  if (currentPage === 1) {
    fill(10, 0, 0);
    stroke(200, 0, 0);
    strokeWeight(1);
    rect(bx, by, bw, bh);
    fill(200, 0, 0);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text("[ RESET ]", bx + bw / 2, by + bh / 2);   
  } else {
    fill(240, 245, 255);
    stroke(212, 175, 55); // gold border on peace page
    strokeWeight(1);
    rect(bx, by, bw, bh);
    fill(180, 140, 30); // gold text
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text("[ RESET ]", bx + bw / 2, by + bh / 2);
  }
}