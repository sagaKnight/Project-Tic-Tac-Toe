const gameboard = (function () {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
})();

function createPlayer(playerName, tokenPicked) {
  const name = playerName;
  const token = tokenPicked;
  return {
    getName: function () {
      return name;
    },
    getToken: function () {
      return token;
    },
  };
}

function turnSystem() {
  let turn = "X";
  return {
    getTurn: function () {
      return turn;
    },
    changeTurn: function () {
      turn = turn === "X" ? "O" : "X";
    },
  };
}

function createBoard(gameboard, turnSystem) {
  console.log(gameboard);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const newDiv = document.createElement("div");
      newDiv.setAttribute("col", j);
      newDiv.setAttribute("row", i);
      newDiv.addEventListener("click", () => clickedBox(i, j, turnSystem));

      const boardSelector = document.getElementById("board");

      boardSelector.appendChild(newDiv);
    }
  }
}

function clickedBox(row, col, turnSystem) {
  const box = document.querySelector(`div[row="${row}"][col="${col}"]`);
  if (box.textContent === "") {
    updateGameboard(row, col, turnSystem.getTurn());
    box.textContent = turnSystem.getTurn();
    turnSystem.changeTurn();
    winnerLogic().activateChecks(gameboard);
  }
}

function updateGameboard(row, col, token) {
  gameboard[row][col] = token;
  console.log(gameboard);
}

function winnerLogic() {
  return {
    didPlayerWin: function (count1, count2) {
      if (count1 === 3) {
        console.log("found player1 win");
      } else if (count2 === 3) {
        console.log("found player2 win");
      }
    },
    checkRowWinner: function (gameboard) {
      for (let i = 0; i < 3; i++) {
        let count1 = 0;
        let count2 = 0;
        for (let j = 0; j < 3; j++) {
          if (gameboard[i][j] === "X") {
            count1++;
          } else if (gameboard[i][j] === "O") {
            count2++;
          }
          this.didPlayerWin(count1, count2);
        }
      }
    },
    checkColWinner: function () {
      for (let i = 0; i < 3; i++) {
        let count1 = 0;
        let count2 = 0;
        for (let j = 0; j < 3; j++) {
          if (gameboard[j][i] === "X") {
            count1++;
          } else if (gameboard[j][i] === "O") {
            count2++;
          }
          this.didPlayerWin(count1, count2);
        }
      }
    },
    checkPrimary: function () {
      let count1 = 0;
      let count2 = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i == j && gameboard[i][j] === "X") {
            count1++;
          } else if (i == j && gameboard[i][j] === "O") {
            count2++;
          }
          this.didPlayerWin(count1, count2);
        }
      }
    },
    checkSecondary: function (gameboard) {
      let count1 = 0;
      let count2 = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i + j === 2 && gameboard[j][i] === "X") {
            count1++;
          } else if (i + j === 2 && gameboard[j][i] === "O") {
            count2++;
          }
        }
        this.didPlayerWin(count1, count2);
      }
    },
    activateChecks: function (gameboard) {
      this.checkRowWinner(gameboard);
      this.checkColWinner(gameboard);
      this.checkPrimary(gameboard);
      this.checkSecondary(gameboard);
    },
  };
}

function playGame(player1, player2) {
  const turnManager = turnSystem();
  createBoard(gameboard, turnManager);
}

//const win = winnerLogic();
//win.activateChecks(gameboard);

const player1 = createPlayer("John", "X");
const player2 = createPlayer("Smith", "O");

playGame(player1, player2);
