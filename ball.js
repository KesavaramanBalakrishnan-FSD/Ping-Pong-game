const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;
export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  //before that, think about what we are going to update like positions, velocity, directions, add it on
  //   to our current postions, do all calculations like whether bouncing off the wall or paddle
  //we need to get all information inside the update funtion. so we need helpper function

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    //going to get position of the ball
    return this.ballElem.getBoundingClientRect();
  }
  //   how to get velocity and direction with this x, y

  //helper function. this reset funtion going to set velocity and direction properties of the ball.

  reset() {
    // after ball/game starts, initial position
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    // then, we have to find direction is, the direction decide only direction, velecity decids how fast ball moves
    // In order to calculate our direction we need to create value for x and y .

    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      //to get where we are heading in a rotation in 0 to 360. Creating heading var in terms of radians.

      const heading = randonNumberBetween(0, 2 * Math.PI);
      // this gives us results in radians, we can use cosine and sine to determine the x and y direction.
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
    // if (rect.right >= window.innerWidth || rect.left <= 0) {
    //   this.direction.x *= -1;
    // }

    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randonNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
