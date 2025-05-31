const symbolsEasy = ['♣', '♦', '♥', '♠', '⚽', '🏀', '🌷', '🌹'];
const symbolsMedium = ['♣', '♦', '♥', '♠', '🎵', '✈', '⚽', '🏀', '🌷', '🌹', '🙂', '😡'];
const symbolsHard = ['♣', '♦', '♥', '♠', '🎵', '✈', '⚽', '🏀', '🌷', '🌹', '☘', '👍', '✌', '🙂', '😡'];

let mode = 'easy';
let symbols = [];
let shuffledSymbols = [];
let flippedCards = [];
let matchedCount = 0;
let timerInterval = null;
let timeElapsed = 0;
let gameStarted = false;
let boardSize = 0;

const board = document.getElementById("gameBoard");
const messageEl = document.getElementById("message");
const timerEl = document.getElementById("timer");
const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");
const restartBtn = document.getElementById("restartBtn");

const modes = {
  easy: { symbols: symbolsEasy, columns: 4 },
  medium: { symbols: symbolsMedium, columns: 6 },
  hard: { symbols: symbolsHard, columns: 6 }
};

easyBtn.addEventListener("click", () => {
  mode = 'easy';
  setupGame();
});

mediumBtn.addEventListener("click", () => {
  mode = 'medium';
  setupGame();
});

hardBtn.addEventListener("click", () => {
  mode = 'hard';
  setupGame();
});

restartBtn.addEventListener("click", setupGame);

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timeElapsed++;
    timerEl.textContent = `Time: ${timeElapsed}s`;

    if (mode === 'hard' && timeElapsed >= 60) {
      messageEl.textContent = "Time's up! Try again.";
      stopTimer();
      disableBoard();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  timeElapsed = 0;
  timerEl.textContent = `Time: 0s`;
}

function disableBoard() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.pointerEvents = "none";
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupGame() {
  gameStarted = false;
  resetTimer();
  board.innerHTML = '';
  messageEl.textContent = '';
  flippedCards = [];
  matchedCount = 0;

  const { symbols: modeSymbols, columns } = modes[mode];
  symbols = [...modeSymbols, ...modeSymbols];
  board.style.gridTemplateColumns = `repeat(${columns}, auto)`;
  shuffledSymbols = shuffle(symbols);
  boardSize = shuffledSymbols.length;

  shuffledSymbols.forEach((symbol, index) => {
    createCard(symbol, index);
  });
}

function createCard(symbol, index) {
  const card = document.createElement("div");
  card.classList.add("card", mode);
  card.dataset.symbol = symbol;
  card.dataset.index = index;

  card.addEventListener("click", () => {
    if (!gameStarted) {
      gameStarted = true;
      startTimer();
    }

    if (
      card.classList.contains("flipped") ||
      card.classList.contains("matched") ||
      flippedCards.length === 2
    ) {
      return;
    }

    card.classList.add("flipped");
    card.textContent = symbol;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 700);
    }
  });

  board.appendChild(card);
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount += 2;

    if (matchedCount === boardSize) {
      messageEl.textContent = `You won in ${timeElapsed} seconds!`;
      stopTimer();
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.textContent = '';
    card2.textContent = '';
  }

  flippedCards = [];
}

setupGame();
