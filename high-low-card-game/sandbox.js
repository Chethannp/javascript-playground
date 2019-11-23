const possibilities = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12"
];

const score = document.querySelector(".score");
const message = document.querySelector(".message");
const start = document.querySelector(".start");
const guessBlock = document.querySelector(".guess");
const gameArea = document.querySelector(".gameArea");
const form = document.querySelector("form");
let prediction = {
  score: 0,
  oldPrediction: undefined,
  currentPrediction: undefined,
  guessedPrediction: undefined
};
let tmp;
// oldPrediction, currentPrediction, guessedPrediction;

start.addEventListener("click", e => {
  e.preventDefault();
  guessBlock.classList.remove("hide");
  gameArea.classList.remove("hide");
  generateCard();
});

function generateCard() {
  prediction.oldPrediction = tmp;
  tmp = Math.floor(Math.random() * possibilities.length);
  let html = `
    <span>${possibilities[tmp]}</span>
  `;
  prediction.currentPrediction = tmp;

  gameArea.innerHTML += html;

  if (!prediction.oldPrediction) return;

  if (gameStatus()) {
    prediction.score++;
  } else {
    prediction.score--;
  }

  if (prediction.score < 0) {
    message.textContent = "sorry you lost!!!";
    guessBlock.classList.add("hide");
    gameArea.classList.add("hide");
  } else {
    score.innerHTML = prediction.score;
    console.log("Congrats that was right guess!!!");
  }
}

function gameStatus() {
  if (prediction.guessedPrediction === "lower") {
    return Number(prediction.oldPrediction) <
      Number(prediction.currentPrediction)
      ? true
      : false;
  } else {
    return Number(prediction.oldPrediction) >
      Number(prediction.currentPrediction)
      ? true
      : false;
  }
}

form.addEventListener("click", e => {
  e.preventDefault();
  prediction.guessedPrediction = e.target.value;
  generateCard();
});
