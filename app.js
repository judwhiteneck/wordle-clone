const SQUIRREL_WORDS = [
  // squirrel body & features
  "bushy", "furry", "claws", "teeth", "cheek", "fluff", "fuzzy", "lithe",
  // behavior
  "climb", "gnaws", "leaps", "perch", "chase", "dodge", "alert", "hoard", "stash",
  // food
  "acorn", "beech", "hazel", "pecan", "maple", "seeds", "berry", "pinon", "cedar",
  "birch", "alder", "elder",
  // habitat
  "trees", "woods", "grove", "bough", "trunk", "limbs", "leafy", "mossy", "rocky", "nests",
  // seasons & survival
  "frost", "snowy", "brisk", "crisp", "chill", "awake",
  // woodland
  "trail", "creek", "brook", "glade", "ferns", "mulch", "loamy"
];

const WORDS = SQUIRREL_WORDS.filter(w => w.length === 5);

let VALID_WORDS = new Set();

async function loadWords() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/tabatkins/wordle-list/main/words");
    const text = await res.text();
    const all = text.trim().split("\n").map(w => w.trim().toLowerCase()).filter(w => w.length === 5);
    VALID_WORDS = new Set(all);
  } catch(e) {
    VALID_WORDS = new Set(WORDS);
  }
  init();
}

const ROWS = 6;
const COLS = 5;
const KB_ROWS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["Enter","z","x","c","v","b","n","m","Backspace"]
];

let answer = "";
let currentRow = 0;
let currentCol = 0;
let currentGuess = [];
let gameOver = false;
let tiles = [];

function init() {
  answer = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
  buildBoard();
  buildKeyboard();
  document.addEventListener("keydown", handleKey);
}

function buildBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  tiles = [];
  for (let r = 0; r < ROWS; r++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.id = "row-" + r;
    const rowTiles = [];
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      row.appendChild(tile);
      rowTiles.push(tile);
    }
    board.appendChild(row);
    tiles.push(rowTiles);
  }
}

function buildKeyboard() {
  const kb = document.getElementById("keyboard");
  kb.innerHTML = "";
  KB_ROWS.forEach(keys => {
    const row = document.createElement("div");
    row.classList.add("kb-row");
    keys.forEach(k => {
      const btn = document.createElement("button");
      btn.classList.add("key");
      btn.textContent = k === "Backspace" ? "⌫" : k;
      btn.dataset.key = k;
      if (k === "Enter" || k === "Backspace") btn.classList.add("wide");
      btn.addEventListener("click", () => handleKey({ key: k }));
      row.appendChild(btn);
    });
    kb.appendChild(row);
  });
}

function handleKey(e) {
  if (gameOver) return;
  const key = e.key;
  if (key === "Enter") {
    submitGuess();
  } else if (key === "Backspace") {
    deleteLetter();
  } else if (/^[a-zA-Z]$/.test(key)) {
    addLetter(key.toUpperCase());
  }
}

function addLetter(letter) {
  if (currentCol >= COLS) return;
  const tile = tiles[currentRow][currentCol];
  tile.textContent = letter;
  tile.classList.add("filled");
  tile.classList.add("pop");
  tile.addEventListener("animationend", () => tile.classList.remove("pop"), { once: true });
  currentGuess.push(letter);
  currentCol++;
}

function deleteLetter() {
  if (currentCol <= 0) return;
  currentCol--;
  currentGuess.pop();
  const tile = tiles[currentRow][currentCol];
  tile.textContent = "";
  tile.classList.remove("filled");
}

function submitGuess() {
  if (currentCol < COLS) {
    showMessage("Not enough letters");
    shakeRow(currentRow);
    return;
  }

  const guess = currentGuess.join("").toLowerCase();

  if (!VALID_WORDS.has(guess)) {
    showMessage("Not in word list");
    shakeRow(currentRow);
    return;
  }

  const guessUpper = guess.toUpperCase();
  const result = evaluate(guessUpper, answer);
  const rowIdx = currentRow;

  revealRow(rowIdx, result, () => {
    updateKeyboard(guessUpper, result);

    if (guessUpper === answer) {
      gameOver = true;
      const msgs = ["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"];
      showMessage(msgs[rowIdx] || "Nice!");
      setTimeout(() => showWin(msgs[rowIdx] || "Nice!", answer), 800);
    } else if (rowIdx === ROWS - 1) {
      gameOver = true;
      showMessage(answer, 0);
    } else {
      currentRow++;
      currentCol = 0;
      currentGuess = [];
    }
  });
}

function evaluate(guess, answer) {
  const result = Array(COLS).fill("absent");
  const answerArr = answer.split("");
  const guessArr = guess.split("");
  const used = Array(COLS).fill(false);

  for (let i = 0; i < COLS; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < COLS; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < COLS; j++) {
      if (!used[j] && guessArr[i] === answerArr[j]) {
        result[i] = "present";
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

function revealRow(rowIdx, result, callback) {
  const rowTiles = tiles[rowIdx];
  rowTiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add(result[i]);
    }, i * 300);
  });
  setTimeout(callback, rowTiles.length * 300);
}

function updateKeyboard(guess, result) {
  const priority = { correct: 3, present: 2, absent: 1 };
  guess.split("").forEach((letter, i) => {
    const btn = document.querySelector(`.key[data-key="${letter.toLowerCase()}"]`);
    if (!btn) return;
    const current = btn.dataset.state || "";
    const newState = result[i];
    if ((priority[newState] || 0) > (priority[current] || 0)) {
      if (current) btn.classList.remove(current);
      btn.classList.add(newState);
      btn.dataset.state = newState;
    }
  });
}

function shakeRow(rowIdx) {
  const row = document.getElementById("row-" + rowIdx);
  row.classList.add("shake");
  row.addEventListener("animationend", () => row.classList.remove("shake"), { once: true });
}

function showMessage(text, duration = 2000) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.classList.add("show");
  if (duration > 0) {
    setTimeout(() => msg.classList.remove("show"), duration);
  }
}

loadWords();


function showWin(msg, word) {
  const art = [
    "    \\_/\\ ",
    "   ( o.o)",
    "   > ^ < ",
    "  /|   |\\ ",
    " (_|   |_)"
  ].join("\n");

  document.getElementById("squirrel-art").textContent = art;
  document.getElementById("win-msg").textContent = msg;
  document.getElementById("win-word").textContent = word;
  document.getElementById("win-overlay").classList.add("show");
}
