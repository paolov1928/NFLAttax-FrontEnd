import React, { Component } from "react"
import Login from "./Components/Login"
import EndPage from "./Components/EndPage"
import PickTeamOrOpponent from "./Components/PickTeamOrOpponent"
import Welcome from "./Components/Welcome"
import Menu from "./Components/Menu"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
// import 'semantic-ui-css/semantic.min.css'
import BattleContainer from "./Containers/BattleContainer"
import NewDataContainer from "./Containers/NewDataContainer"
import Game from "./Game-Logic/1game"
import Player from "./Game-Logic/1player"
import { SemanticToastContainer, toast } from "react-semantic-toasts"
import "react-semantic-toasts/styles/react-semantic-alert.css"

class App extends Component {
  state = {
    currentUser: false,
    currentGame: null
  }

  signin = (user, token) => {
    this.setState({
      currentUser: user
    })
    localStorage.setItem("token", token)
  }

  signOut = () => {
    this.setState({
      currentUser: false
    })
    localStorage.removeItem("token")
    localStorage.removeItem("Pick")
    localStorage.removeItem("Opponent")
  }

  createGame = playersSelected => {
    if (
      !playersSelected.selectedQB ||
      !playersSelected.selectedRB ||
      !playersSelected.selectedWR
    ) {
      window.alert("pick again")
    } else {
      let game = new Game()
      // Computer gets assigned its players randomly from the 5. Uses the code in 1player
      let computer = new Player("Computer")
      computer.team = localStorage.getItem("Opponent")
      computer.computerAssignPlayers(playersSelected.deckOfPlayerCards)
      let player = new Player("Player")
      player.team = localStorage.getItem("Pick")
      // The below is adding that players fantasy data object to the game instance
      player.qb = playersSelected.selectedQB
      player.wr = playersSelected.selectedWR
      player.rb = playersSelected.selectedRB
      game.addPlayer(computer)
      game.addPlayer(player)
      game.addDeck(playersSelected.deckOfPlayerCards)
      game.moveToNextRound()
      this.setState({ currentGame: game })
    }
  }

  compareStatistic = (clickStatistic, comparison) => {
    const whatClickedOn = clickStatistic
    const comparisonOperator = comparison
    const goodResult = "You won this matchup"
    const badResult = "Bad news... the computer won this matchup"
    let actualResult = false
    let totalDataArray = Array.from(document.querySelectorAll(".extra"))
      .map(n => n.innerText)
      .map(n => n.split(":"))
    let selectedComparison = totalDataArray.filter(miniArray =>
      miniArray.includes(whatClickedOn)
    )
    let makingComparison = selectedComparison.map(miniArray =>
      parseFloat(miniArray[1])
    )
    makingComparison[0] > makingComparison[1]
      ? (actualResult = true)
      : (actualResult = false)
    if (comparisonOperator === "down") {
      actualResult = !actualResult
    }
    actualResult === true
      ? toast({
          title: goodResult,
          icon: "winner",
          time: 5000,
          type: "success"
        })
      : toast({
          title: badResult,
          icon: "ban",
          time: 5000,
          type: "error"
        })
    let game = this.state.currentGame
    if (actualResult === true) {
      game.playerWonRound()
    }
  }

  render() {
    const { currentUser } = this.state
    const { currentGame } = this.state

    return (
      <Router>
        <React.Fragment>
          <Menu signOut={this.signOut} />

          <Switch>
            <Route
              path="/Battle"
              component={routerProps => (
                <BattleContainer
                  {...routerProps}
                  currentUser={currentUser}
                  currentGame={currentGame}
                  compareStatistic={this.compareStatistic}
                />
              )}
            />
            <Route
              path="/NewData"
              component={routerProps => (
                <NewDataContainer
                  {...routerProps}
                  createGame={this.createGame}
                />
              )}
            />
            <Route
              path="/Loss"
              component={routerProps => (
                <EndPage {...routerProps} currentGame={currentGame} />
              )}
            />
            <Route
              path="/Win"
              component={routerProps => (
                <EndPage {...routerProps} currentGame={currentGame} />
              )}
            />

            <Route
              path="/Login"
              component={routerProps => (
                <Login {...routerProps} signin={this.signin} />
              )}
            />
            <Route
              path="/Opponent"
              component={routerProps => (
                <PickTeamOrOpponent
                  {...routerProps}
                  currentUser={currentUser}
                />
              )}
            />
            <Route
              path="/Pick"
              component={routerProps => (
                <PickTeamOrOpponent
                  {...routerProps}
                  currentUser={currentUser}
                />
              )}
            />
            <Route
              path="/"
              component={routerProps => (
                <Welcome {...routerProps} currentUser={currentUser} />
              )}
            />
          </Switch>
          <SemanticToastContainer />
        </React.Fragment>
      </Router>
    )
  }
}

export default App

// import BackgroundImage from './Images/nfl-background-6.jpg'
// the below was in the render:
// const imgUrl = "https://gamesonthelawn.com.au/wp-content/uploads/2016/02/Grass-Background-image.jpg"
// <div style = {{ backgroundImage: 'url(' + imgUrl + ')'}}>

// populatePlayerPositionArrays = (position) => {
//   player.position = playersSelected.top5PlayersByTeamFantasyData.filter(
//     p => p.esbid === playersSelected.[`selected${position}`]
//   );
//   const GSIS = player.position[0].gsisPlayerId;
//   player.position.push(
//     this.filterAdditionalDataForThatCard(
//       GSIS,
//       playersSelected.additionalDataForTop5Players
//     )
//   );
// }
