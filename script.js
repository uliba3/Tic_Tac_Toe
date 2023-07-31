const gameBoard = (() => {
    const board = [["", "", ""], ["", "", ""], ["", "", ""]];

    const getBoard = () => board;

    const resetBoard = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                board[r][c] = "";
            }
        }
    };

    const isCellEmpty = (row, column) => board[row][column] === "";

    const placeMarker = (row, column, marker) => {
        if (isCellEmpty(row, column)) {
            board[row][column] = marker;
            return true;
        }
        return false;
    };

    return { getBoard, resetBoard, placeMarker };
})();

// Player Factory
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol };
};

const displayController = (() => {
    const displayController = document.getElementById("board");

    displayController.addEventListener("click", (e) => {
        console.log(e.target);
        console.log(e.target.parentElement.getAttribute("row"))
        if (e.target.matches("div[column]")) {
            const row = parseInt(e.target.parentElement.getAttribute("row")) - 1;
            const column = parseInt(e.target.getAttribute("column")) - 1;
            console.log(e.target);
            const currentPlayer = Game.getCurrentPlayer();
            const markerPlaced = gameBoard.placeMarker(row, column, currentPlayer.getSymbol());
            if (markerPlaced) {
                displayBoard();
                if (Game.checkWinner()) {
                    alert(currentPlayer.getName() + " wins!");
                    Game.resetGame();
                } else if (Game.checkTie()) {
                    alert("It's a tie!");
                    Game.resetGame();
                } else {
                    Game.switchPlayers();
                }
            }
        }
    });

    const displayBoard = () => {
        const board = gameBoard.getBoard();
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                displayController.children[r].children[c].textContent = board[r][c];
            }
        }
    };

    return { displayBoard };
})();

const Game = (() => {
    let players = [Player("Player 1", "X"), Player("Player 2", "O")];
    let currentPlayerIndex = 0;

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayers = () => {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    };

    const checkWinner = () => {
        const board = gameBoard.getBoard();
        // Check rows
        for (let r = 0; r < 3; r++) {
            if (board[r][0] !== "" && board[r][0] === board[r][1] && board[r][1] === board[r][2]) {
                return true;
            }
        }

        // Check columns
        for (let c = 0; c < 3; c++) {
            if (board[0][c] !== "" && board[0][c] === board[1][c] && board[1][c] === board[2][c]) {
                return true;
            }
        }

        // Check diagonals
        if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return true;
        }
        if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return true;
        }

        return false;
    };

    const checkTie = () => {
        const board = gameBoard.getBoard();
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === "") {
                    return false;
                }
            }
        }
        return true;
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        currentPlayerIndex = 0;
        displayController.displayBoard();
    };

    return { getCurrentPlayer, switchPlayers, checkWinner, checkTie, resetGame };
})();
