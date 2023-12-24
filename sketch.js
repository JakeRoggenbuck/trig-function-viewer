const W = window.innerWidth - 20;
const H = window.innerHeight - 20;

const ORIGIN_X = W / 2;
const ORIGIN_Y = H / 2;

const MARGIN = 50;

const UNIT_D = 600;
const UNIT_R = UNIT_D / 2;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.origin_x = 0;
    this.origin_y = 0;
  }

  normalize() {
    var norm = Math.sqrt(this.x * this.x + this.y * this.y);

    this.x = (this.x * UNIT_R) / norm;
    this.y = (this.y * UNIT_R) / norm;
  }

  draw() {
    line(this.origin_x, this.origin_y, this.x, this.y);
  }

  draw_x_component() {
    line(this.origin_x, this.origin_y, this.x, 0);
  }

  draw_y_component() {
    line(this.origin_x, this.origin_y, 0, this.y);
  }

  to_point() {
    return new Point(this.x, this.y);
  }

  label() {
    text(`(${this.x}, ${this.y})`, 0, 0);
  }

  set_origin(x, y) {
    this.origin_x = x;
    this.origin_y = y;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    point(this.x, this.y);
  }
}

function setup() {
  createCanvas(W, H);
}

function convert_to_unit_origin(x, y) {
  return [x - ORIGIN_X, -(y - ORIGIN_Y)];
}

var show_unnormalized_vector = false;

function draw() {
  background(23, 32, 42);
  fill(23, 32, 42);
  stroke(245);
  strokeWeight(2);

  translate(ORIGIN_X, ORIGIN_Y);
  scale(1, -1);

  // Create the unit circle
  ellipse(0, 0, UNIT_D, UNIT_D);

  // Create the x-axis
  line(-W / 2 + 20, 0, W / 2 - 20, 0);

  // Create the y-axis
  line(0, -H / 2 + 20, 0, H / 2 - 20);

  var [translated_mouseX, translated_mouseY] = convert_to_unit_origin(
    mouseX,
    mouseY,
  );

  var follow_mouse_vector = new Vector(translated_mouseX, translated_mouseY);

  var mouse_point = follow_mouse_vector.to_point();

  strokeWeight(6);
  mouse_point.draw();

  if (show_unnormalized_vector) {
    strokeWeight(2);
    follow_mouse_vector.draw();

    // Cosine component
    stroke(241, 196, 15);
    follow_mouse_vector.draw_x_component();

    // Sine component
    stroke(231, 76, 60);
    follow_mouse_vector.draw_y_component();
  }

  strokeWeight(6);
  stroke(245);
  follow_mouse_vector.normalize();
  follow_mouse_vector.draw();

  var normal_mouse_point = follow_mouse_vector.to_point();

  // var tan_vector = new Vector(100, 0);
  // tan_vector.set_origin(normal_mouse_point.x, normal_mouse_point.y);

  // tan_vector.draw();

  // Cosine component
  stroke(241, 196, 15);
  follow_mouse_vector.draw_x_component();

  // Sine component
  stroke(231, 76, 60);
  follow_mouse_vector.draw_y_component();
}
