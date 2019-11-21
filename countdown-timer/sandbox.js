const endDate = document.querySelector("input[name='endDate']");
const clock = document.querySelector(".clock");
let timeInterval;

endDate.addEventListener("change", e => {
  e.preventDefault();
  let tmp = new Date(endDate.value); //e.target.value
  startClock(tmp);
});

function startClock(d) {
  function updateCounter() {
    let tl = timeLeft(d);
    for (var prop in tl) {
      let el = document.querySelector("." + prop);
      if (el) {
        el.innerHTML = tl[prop];
      }
    }
  }
  updateCounter();
  timeInterval = setInterval(updateCounter, 1000);
}

function timeLeft(d) {
  let currentDate = new Date();
  let t = Date.parse(d) - Date.parse(currentDate);
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
