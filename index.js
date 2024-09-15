//basic to understand- game is running in the update loop

//every frame it is passes going to call a function-this function going to update all the logic pieces of game.
// it is going to update all position/paints everything on the screen inside of the update loop

//everything in the game are going to be seperate classes for easier to work with.

import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball")); //selectiog the ball html element and creating new class for ball.

const playerPaddle = new Paddle(document.getElementById("player-paddle"));

const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

const playerScoreElem = document.getElementById("player-score");

const computerScoreElem = document.getElementById("computer-score");

// we can use this ball inside the update loop
let lastTime;
function update(time) {
  //update loop -takeing time variable of how much time  has passed since the start of the program.
  if (lastTime != null) {
    const delta = time - lastTime;

    //update funtion of the ball
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    const hue = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + 1); //hue+delta*0.01

    if (isLose()) {
      handleLose();
    }
  }

  lastTime = time;

  window.requestAnimationFrame(update);
  //it creates infinite loop every time , new frame painted, its going to call again.
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (event) => {
  playerPaddle.position = (event.y / window.innerHeight) * 100;
});

// In order to call this

window.requestAnimationFrame(update);
// Whenever browser going to refresh , before that, we will call update funtion

//method tells the browser you wish to perform an animation. It requests the browser to call a user-supplied callback function before the next repaint.

/*

Understanding Frames Per Second (FPS):
Frame Rate Concept:

Frames Per Second (FPS): This measures how many frames (or updates) your application or game displays per second. A frame is a single image or state of the game that is shown on the screen.
60 FPS:

60 Frames per Second: This means that the screen is updated 60 times in one second. In other words, every second, your game or animation is drawing and displaying 60 new images (frames).
*/
