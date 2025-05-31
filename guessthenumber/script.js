document.addEventListener("DOMContentLoaded", () => {
  let targetNumber, attempts;
  const modeSelect = document.getElementById("modeSelect");
  const guessForm = document.getElementById("guessForm");
  const guessField = document.getElementById("guessField");
  const attemptsDisplay = document.getElementById("attempts");

  function setTargetNumber() {
    const mode = modeSelect.value;
    let max;
    switch (mode) {
      case "easy":
        max = 10;
        break;
      case "medium":
        max = 50;
        break;
      case "hard":
        max = 100;
        break;
    }
    targetNumber = Math.floor(Math.random() * max) + 1;
    attempts = 0;
    attemptsDisplay.textContent = "Attempts: 0";
    console.log("New target number:", targetNumber); // For testing
  }

  modeSelect.addEventListener("change", setTargetNumber);
  setTargetNumber();

  guessForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const guess = parseInt(guessField.value);
    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;

    if (guess === targetNumber) {
      alert(`🎉 Congratulations! You guessed the number in ${attempts} attempts.`);
      setTargetNumber();
    } else if (guess < targetNumber) {
      alert("Too low! Try a higher number.");
    } else {
      alert("Too high! Try a lower number.");
    }

    guessField.value = "";
    guessField.focus(); // 👈 optional improvement added here
  });
});
