const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let player = {
  speed: 5,
  score: 0
};
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrorRight: false,
  ArrowLeft: false
};

startScreen.addEventListener("click", start);

document.addEventListener("keydown", pressOn);

document.addEventListener("keyup", pressOff);

function moveLines() {
  let lines = document.querySelectorAll(".line");
  lines.forEach(line => {
    if (line.y > 1550) {
      line.y -= 1550;
    }
    line.y += player.speed;
    line.style.top = line.y + "px";
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveEnemy(car) {
  let ele = document.querySelectorAll(".enemy");
  ele.forEach(item => {
    if (isCollide(car, item)) {
      endGame();
    }
    if (item.y > 1550) {
      item.y -= 1550;
      item.style.left = Math.floor(Math.random() * 150) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function playGame() {
  let car = document.querySelector(".car");
  moveLines();
  moveEnemy(car);
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    if (keys.ArrowUp && player.y > road.top) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 150) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x <= road.width - 50) {
      player.x += player.speed;
    }

    car.style.left = player.x + "px";
    car.style.top = player.y + "px";

    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerText = "Score: " + player.score;
  }
}

function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function endGame() {
  player.start = false;
  score.innerHTML = "Game over <br/> score was " + player.score;
  startScreen.classList.remove("hide");
  startScreen.innerHTML = "Start Again";
}

function start() {
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  gameArea.innerHTML = "";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(playGame);

  for (let x = 0; x < 15; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.y = x * 150;
    div.style.top = x * 150 + "px";
    gameArea.appendChild(div);
  }

  let car = document.createElement("div");
  car.innerText = "Car";
  car.classList.add("car");
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  gameArea.appendChild(car);

  for (let x = 0; x < 3; x++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = (x + 1) * 600 * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * 150) + "px";
    enemy.style.backgroundColor = "red";
    gameArea.appendChild(enemy);
  }
}
