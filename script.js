const goat = document.getElementById('goat');
const leaf = document.getElementById('leaf');
const bike = document.getElementById('bike');
const scoreDisplay = document.getElementById('score');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

let score = 0;
let goatPosition = 125;
let gameInterval;
let gameSpeed = 5;

// Desktop keyboard control
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') moveGoat(-20);
  else if (event.key === 'ArrowRight') moveGoat(20);
});

// Mobile button control
leftBtn.addEventListener('click', () => moveGoat(-20));
rightBtn.addEventListener('click', () => moveGoat(20));

function moveGoat(offset) {
  goatPosition += offset;
  if (goatPosition < 0) goatPosition = 0;
  if (goatPosition > 250) goatPosition = 250;
  goat.style.left = `${goatPosition}px`;
}

function startGame() {
  resetObject(leaf);
  resetObject(bike);

  gameInterval = setInterval(() => {
    moveObject(leaf);
    moveObject(bike);
    checkCollision();
  }, 20);
}

function moveObject(obj) {
  let top = parseInt(window.getComputedStyle(obj).getPropertyValue('top'));

  if (top >= 600) {
    resetObject(obj);
  } else {
    obj.style.top = `${top + gameSpeed}px`;
  }
}

function resetObject(obj) {
  obj.style.top = '-50px';
  obj.style.left = `${Math.floor(Math.random() * 250)}px`;
}

function checkCollision() {
  let goatRect = goat.getBoundingClientRect();
  let leafRect = leaf.getBoundingClientRect();
  let bikeRect = bike.getBoundingClientRect();

  // Leaf pickup
  if (
    goatRect.left < leafRect.right &&
    goatRect.right > leafRect.left &&
    goatRect.top < leafRect.bottom &&
    goatRect.bottom > leafRect.top
  ) {
    score++;
    scoreDisplay.textContent = score;
    resetObject(leaf);
  }

  // Bike collision
  if (
    goatRect.left < bikeRect.right &&
    goatRect.right > bikeRect.left &&
    goatRect.top < bikeRect.bottom &&
    goatRect.bottom > bikeRect.top
  ) {
    clearInterval(gameInterval);
    alert('Game Over! Your Score: ' + score);
    window.location.reload();
  }
}

startGame();
