document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2025-04-10T9:00:00"); 
  const daysElem = document.getElementById("days");
  const hoursElem = document.getElementById("hours");
  const minutesElem = document.getElementById("minutes");
  const secondsElem = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date();
    const timeDiff = targetDate - now;

    if (timeDiff < 0) {
      document.getElementById("countdown").innerHTML = "新サイトがオープンしました！さあ、アクセスだ!";
      clearInterval(interval);
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    daysElem.textContent = String(days).padStart(2, "0");
    hoursElem.textContent = String(hours).padStart(2, "0");
    minutesElem.textContent = String(minutes).padStart(2, "0");
    secondsElem.textContent = String(seconds).padStart(2, "0");
  }

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
});
