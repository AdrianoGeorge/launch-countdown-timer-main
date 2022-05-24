const daysHTML = document.getElementById("days");
const hoursHTML = document.getElementById("hours");
const minutesHTML = document.getElementById("minutes");
const secondsHTML = document.getElementById("seconds");
var timer = { days: 14, hours: 0, minutes: 0, seconds: 0 },
  finished = false; //
var count = setInterval(() => {
  updateScreenTime();
  updateTime();

  if (finished) clearInterval(count);
}, 1000);

function updateTime() {
  if (timer.seconds > 0) timer.seconds--;
  else {
    timer.seconds = 59;
    if (timer.minutes > 0) timer.minutes--;
    else {
      timer.minutes = 59;
      if (timer.hours > 0) timer.hours--;
      else {
        timer.hours = 23;
        if (timer.days > 0) timer.days--;
        else finished = true;
      }
    }
  }
}

function updateScreenTime() {
  document.querySelectorAll(".time-box").forEach((e) => {
    const bottomTxt = e.querySelector(".sheet.bottom p"),
      value = timer[e.id] + 1;
    if (value == bottomTxt.innerText) return;
    const front = e.querySelector(".sheet.front"),
      frontTxt = front.querySelector("p");
    const topTxt = e.querySelector(".sheet.top p");
    (topTxt.innerText = value - 1),
      (frontTxt.innerText = value),
      (bottomTxt.innerText = value);
    turnAnimation(front, value, frontTxt, 0.5);
  });
}
function turnAnimation(local, value, txt, duration) {
  (local.style.animation = ""), (txt.classList = "");
  setTimeout(() => (local.style.animation = `turn ${duration}s forwards`), 30);
  setTimeout(() => {
    (txt.innerText = value - 1), (txt.classList = "flip");
  }, (duration * 1000) / 3);
}
