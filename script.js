const gameboard = (function () {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
})();

function createPlayer(name) {
  return {
    name: name,
  };
}

function createBoard(gameboard) {
    console.log(gameboard);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const newDiv = document.createElement("div");
            const boardSelector = document.querySelector("#board");
            console.log(boardSelector);
            boardSelector.appendChild(newDiv);
        }
    } 
}

function gameLogic() {
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
          if ((i + j) === 2 && gameboard[j][i] === "X") {
            count1++;
          } else if ((i + j) === 2 && gameboard[j][i] === "O") {
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
  }
}

const game = gameLogic();
createBoard(gameboard);
game.activateChecks(gameboard);




