const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const resultScreen = document.getElementById("resultScreen");
const gameScreen = document.getElementById("gameScreen");
const resultMessage = document.getElementById("resultMessage");
const newGameBtn = document.getElementById("newGame");

let currentPlayer = "X";
let cells = Array(9).fill(null);
let gameOver = false;

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => makeMove(index));
    board.appendChild(cellDiv);
  });
}

function makeMove(index) {
  if (cells[index] || gameOver) return;
  cells[index] = currentPlayer;
  drawBoard();
  if (checkWinner(currentPlayer)) {
    showResult(`${currentPlayer} wins! 🎉`);
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    showResult("It's a draw!");
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function showResult(message) {
  resultMessage.textContent = message;
  gameScreen.style.display = "none";
  resultScreen.style.display = "block";
}

function resetGame() {
  currentPlayer = "X";
  cells = Array(9).fill(null);
  gameOver = false;
  statusText.textContent = `${currentPlayer}'s turn`;
  drawBoard();
}

resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", () => {
  resetGame();
  resultScreen.style.display = "none";
  gameScreen.style.display = "block";
});

resetGame(); // initial load
