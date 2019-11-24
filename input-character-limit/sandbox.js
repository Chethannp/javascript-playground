const output = document.querySelector(".output");
const text = document.querySelector("textarea");
const maxLength = 10;
const warnLength = 5;

["change", "keyup", "keydown"].forEach(e => {
  text.addEventListener(e, textCounter);
});

function textCounter(e) {
  let count = text.value.length;
  if (count > maxLength) {
    text.value = text.value.substring(0, maxLength);
  } else if (count > warnLength) {
    output.innerHTML = maxLength - count + " characters left";
    output.style.color = "red";
  } else {
    output.innerHTML = "";
    output.style.color = "inherit";
  }
  console.log(count);
}
