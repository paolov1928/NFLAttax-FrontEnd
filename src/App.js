import React, { Component } from "react"
import Login from "./Components/Login"
import EndPage from "./Components/EndPage"
import PickTeamOrOpponent from "./Components/PickTeamOrOpponent"
import Welcome from "./Components/Welcome"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom"
// import 'semantic-ui-css/semantic.min.css'
import PlayerSelectionContainer from "./Containers/PlayerSelectionContainer"
import QBBattleContainer from "./Containers/QBBattleContainer"
import WRBattleContainer from "./Containers/WRBattleContainer"
import RBBattleContainer from "./Containers/RBBattleContainer"
import Game from "./Game-Logic/1game"
import Player from "./Game-Logic/1player"
import { ToastContainer, toast, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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

  filterAdditionalDataForThatCard = (gsis, addData) => {
    // This filters down the additional data to that one player... JOSH GORDON IS missing
    return addData.filter(addPData => {
      if (addPData.references.find(o => o.origin === "gsis" && o.id === gsis)) {
        return true
      }
    })[0]
  }

  createGame = playerSelectionContainerState => {
    if (
      !playerSelectionContainerState.selectedQB ||
      !playerSelectionContainerState.selectedRB ||
      !playerSelectionContainerState.selectedWR
    ) {
      window.alert("pick again")
    } else {
      let game = new Game()
      // Computer gets assigned its players randomly from the 5. Uses the code in 1player
      let computer = new Player("Computer")
      computer.team = localStorage.getItem("Opponent")
      computer.computerAssignPlayers(
        playerSelectionContainerState.top5PlayersByTeamFantasyData,
        playerSelectionContainerState.additionalDataForTop5Players
      )

      let player = new Player("Player")
      player.team = localStorage.getItem("Pick")
      // The below is adding that players fantasy data object to the game instance
      player.qb = playerSelectionContainerState.top5PlayersByTeamFantasyData.filter(
        p => p.esbid === playerSelectionContainerState.selectedQB
      )
      const qbGSIS = player.qb[0].gsisPlayerId
      player.qb.push(
        this.filterAdditionalDataForThatCard(
          qbGSIS,
          playerSelectionContainerState.additionalDataForTop5Players
        )
      )
      player.wr = playerSelectionContainerState.top5PlayersByTeamFantasyData.filter(
        p => p.esbid === playerSelectionContainerState.selectedWR
      )
      const wrGSIS = player.wr[0].gsisPlayerId
      player.wr.push(
        this.filterAdditionalDataForThatCard(
          wrGSIS,
          playerSelectionContainerState.additionalDataForTop5Players
        )
      )
      player.rb = playerSelectionContainerState.top5PlayersByTeamFantasyData.filter(
        p => p.esbid === playerSelectionContainerState.selectedRB
      )
      const rbGSIS = player.rb[0].gsisPlayerId
      player.rb.push(
        this.filterAdditionalDataForThatCard(
          rbGSIS,
          playerSelectionContainerState.additionalDataForTop5Players
        )
      )
      game.addPlayer(computer)
      game.addPlayer(player)
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
      ? toast.success(goodResult, {
          position: "top-center"
        })
      : toast.error(badResult, {
          position: "top-center"
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
          <Link to="/Login">Login</Link>..
          <Link to="/">Dashboard</Link>..
          <Link to="/Pick">Pick your team!</Link>..
          <Link to="/Opponent">Pick your opponent!</Link>..
          <Link to="/Teams">Select your Players!</Link>..
          <Link to="/QBBattle">Battle your QBs!</Link>..
          <Link to="/WRBattle">Battle your WRs!</Link>..
          <Link to="/RBBattle">Battle your RBs!</Link>..
          <Link to="/Win">Winners</Link>..
          <Link to="/Loss">Losers</Link>..
          <button onClick={this.signOut}>SignOut</button>
          <hr />
          <Switch>
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
              path="/QBBattle"
              component={routerProps => (
                <QBBattleContainer
                  {...routerProps}
                  currentUser={currentUser}
                  currentGame={currentGame}
                  compareStatistic={this.compareStatistic}
                />
              )}
            />
            <Route
              path="/WRBattle"
              component={routerProps => (
                <WRBattleContainer
                  {...routerProps}
                  currentUser={currentUser}
                  currentGame={currentGame}
                  compareStatistic={this.compareStatistic}
                />
              )}
            />
            <Route
              path="/RBBattle"
              component={routerProps => (
                <RBBattleContainer
                  {...routerProps}
                  currentUser={currentUser}
                  currentGame={currentGame}
                  compareStatistic={this.compareStatistic}
                />
              )}
            />
            <Route
              path="/Teams"
              component={routerProps => (
                <PlayerSelectionContainer
                  {...routerProps}
                  createGame={this.createGame}
                />
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
          <ToastContainer
            newestOnTop
            autoClose={8000}
            draggable
            hideProgressBar
            transition={Zoom}
          />
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
//   player.position = playerSelectionContainerState.top5PlayersByTeamFantasyData.filter(
//     p => p.esbid === playerSelectionContainerState.[`selected${position}`]
//   );
//   const GSIS = player.position[0].gsisPlayerId;
//   player.position.push(
//     this.filterAdditionalDataForThatCard(
//       GSIS,
//       playerSelectionContainerState.additionalDataForTop5Players
//     )
//   );
// }
