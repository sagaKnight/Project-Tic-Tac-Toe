function createGameboard() {
    return {
        gameboard: [["a","b","c"],["x","x","x"],["g","h","i"]],

        checkRowWinner: function () {
            for (let i = 0; i < 3; i++) {
                let found = 0;
                for (let j = 0; j < 3; j++) {
                    console.log(this.gameboard[i][j]);
                    if (this.gameboard[i][j] == "x") {
                        found++;
                    }
                    if (found === 3) {
                        console.log("found row win");
                    }
                }
            }
       }
    }

}

const testing = createGameboard();
testing.checkRowWinner()