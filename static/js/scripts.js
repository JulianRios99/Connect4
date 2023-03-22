const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const columns = 7;
const rows = 6;
const board = Array.from({ length: rows }, () => Array(columns).fill(0));
let currentPlayer = 1;

gameBoard.innerHTML = board
	.map(
		(row, rowIndex) =>
			row
				.map(
					(cell, colIndex) =>
						`<div class="cell" data-row="${rowIndex}" data-col="${colIndex}"></div>`
				)
				.join('')
	)
	.join('');

const cells = Array.from(document.querySelectorAll('.cell'));

cells.forEach((cell) => {
	cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
  
    if (board[row][col] === 0) {
      board[row][col] = currentPlayer;
      event.target.classList.add(`player${currentPlayer}`);
  
      if (checkWin(currentPlayer)) {
        message.textContent = `¡Jugador ${currentPlayer} gana!`;
        cells.forEach((cell) => cell.removeEventListener('click', handleClick));
      } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        message.textContent = `Turno del Jugador ${currentPlayer}`;
      }
    }
  }
  
  function checkWin(player) {
    // Comprobar filas
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns - 3; col++) {
        if (
          board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player
        ) {
          return true;
        }
      }
    }
  
    // Comprobar columnas
    for (let row = 0; row < rows - 3; row++) {
      for (let col = 0; col < columns; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player
        ) {
          return true;
        }
      }
    }
  
    // Comprobar diagonales ascendentes
    for (let row = 3; row < rows; row++) {
      for (let col = 0; col < columns - 3; col++) {
        if (
          board[row][col] === player &&
          board[row - 1][col + 1] === player &&
          board[row - 2][col + 2] === player &&
          board[row - 3][col + 3] === player
        ) {
          return true;
        }
      }
    }
  
    // Comprobar diagonales descendentes
    for (let row = 0; row < rows - 3; row++) {
      for (let col = 0; col < columns - 3; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col + 1] === player &&
          board[row + 2][col + 2] === player &&
          board[row + 3][col + 3] === player
        ) {
          return true;
        }
      }
    }
  
    return false;
  }
  