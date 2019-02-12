class Game {
  constructor() {
    this.players = []
    this.table = []
    this.currentRound = 0
    this.p1roundCount = 0
    this.deck = []
  }

  moveToNextRound = () => {
    this.currentRound++
  }

  playerWonRound = () => {
    this.p1roundCount++
  }

  playerCount = () => {
    return this.players.length
  }
  addPlayer = newPlayer => {
    this.players.push(newPlayer)
  }
  addDeck = newDeck => {
    this.deck = newDeck
  }
}

export default Game

// This gets an array of all of the stats shown on the page
// totalDataArray = Array.from(document.querySelectorAll('.extra')).map(n => n.innerText).map(n => n.split(":"))
// selectedComparison = totalDataArray.filter( miniArray=> miniArray.includes("Age"))
// fumblesComparison = selectedComparison.map(miniArray => miniArray[1])
// fumblesComparison[0]>fumblesComparison[1]? "You won this matchup": "Bad news... the computer won this matchup"
