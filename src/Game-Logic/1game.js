class Game {
  constructor() {
    this.players = [];
    this.table = [];
    this.isGameWon = false;
    this.p1roundCount = 0;
  }

  playerCount = () => {
    return this.players.length;
  };
  addPlayer = newPlayer => {
    this.players.push(newPlayer);
  };
  populateTable = () => {
    this.roundCount++;
    this.table.unshift(this.currentPlayer.removeCard());
    this.updateTurn();
    this.table.unshift(this.currentPlayer.removeCard());
    this.updateTurn();
  };
  compareAbility = ability => {
    var firstCard = this.table[1].abilities[ability];
    var secondCard = this.table[0].abilities[ability];
    if (firstCard === secondCard) {
      this.winningCard = null;
      this.losingCard = null;
    } else if (firstCard > secondCard) {
      this.winningCard = this.table[1];
      this.losingCard = this.table[0];
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    } else {
      this.winningCard = this.table[0];
      this.losingCard = this.table[1];
      this.updateTurn();
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    }
    this.gameOverCheck();
  };
  playRound = ability => {
    this.table.unshift(this.currentPlayer.removeCard());
    this.updateTurn();
    this.table.unshift(this.currentPlayer.removeCard());
    var firstCard = this.table[1].abilities[ability];
    var secondCard = this.table[0].abilities[ability];
    if (firstCard === secondCard) {
      this.winningCard = null;
      this.losingCard = null;
      return;
    } else if (firstCard > secondCard) {
      this.winningCard = this.table[1];
      this.losingCard = this.table[0];
      this.updateTurn();
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    } else {
      this.winningCard = this.table[0];
      this.losingCard = this.table[1];
      while (this.table.length > 0) {
        this.currentPlayer.addCard(this.table.pop());
      }
    }
    this.gameOverCheck();
  };
  updateTurn = () => {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  };
  roundWinner = () => {
    return this.currentPlayer;
  };
  gameOverCheck = () => {
    if (
      this.players[0].hand.length === 0 ||
      this.players[1].hand.length === 0
    ) {
      this.isGameWon = true;
    }
  };
}

export default Game;

// This gets an array of all of the stats shown on the page
// totalDataArray = Array.from(document.querySelectorAll('.extra')).map(n => n.innerText).map(n => n.split(":"))
// selectedComparison = totalDataArray.filter( miniArray=> miniArray.includes("Age"))
// fumblesComparison = selectedComparison.map(miniArray => miniArray[1])
// fumblesComparison[0]>fumblesComparison[1]? "You won this matchup": "Bad news... the computer won this matchup"
