window.addEventListener("load", init);
const words = ["javascript", "html", "css", "react", "angular"];
let currentWord = 0;

function init() {
  let div = document.createElement("div");
  div.setAttribute("class", "message");
  div.innerText = "press start button";
  document.body.appendChild(div);

  let button = document.createElement("button");
  button.innerText = "Start Game";
  button.addEventListener("click", start);
  document.body.appendChild(button);

  let div1 = document.createElement("div");
  div1.classList.add("game");
  document.body.appendChild(div1);
}

function start() {
  currentWord = 0;
  this.style.display = "none";
  words.sort((a, b) => 0.5 - Math.random());

  const game = document.querySelector(".game");
  words.forEach(item => {
    let tmp = item.split("");
    tmp.sort((a, b) => 0.5 - Math.random());
    let tmp1 = tmp.join("");
    console.log(tmp1);

    let div = document.createElement("div");
    div.innerText = "select";
    div.classList.add("box");
    div.style.backgroundColor = "red";
    div.word = item;

    div.addEventListener("mouseenter", () => {
      div.style.backgroundColor = "white";
      div.innerText = tmp1;
    });

    div.addEventListener("mouseleave", () => {
      div.style.backgroundColor = "red";
      div.innerText = "select";
    });

    div.addEventListener("click", e => {
      if (div.word === words[currentWord]) {
        currentWord++;
        div.classList.add("hidden");

        nexWord();
      }
    });

    game.appendChild(div);
  });

  nexWord();
}

function nexWord() {
  if (currentWord >= words.length) {
    message("Game Over");
  } else {
    message("Select this word: " + words[currentWord]);
  }
}

function message(output) {
  document.querySelector(".message").innerHTML = output;
}
