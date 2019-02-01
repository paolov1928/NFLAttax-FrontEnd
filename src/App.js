import React, { Component } from "react";
import Login from "./Components/Login";
import PickTeamOrOpponent from "./Components/PickTeamOrOpponent";
import Welcome from "./Components/Welcome";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import 'semantic-ui-css/semantic.min.css'
import DataContainer from "./Containers/DataContainer";
import BattleContainer from "./Containers/BattleContainer";
import Game from "./Game-Logic/1game";
import Player from "./Game-Logic/1player";

class App extends Component {
  state = {
    currentUser: false,
    currentGame: null
  };

  signin = (user, token) => {
    this.setState({
      currentUser: user
    });
    localStorage.setItem("token", token);
  };

  signOut = () => {
    this.setState({
      currentUser: false
    });
    localStorage.removeItem("token");
    localStorage.removeItem("Pick");
    localStorage.removeItem("Opponent");
  };

  createGame = props => {
    console.log(props);
    if (!props.selectedQB || !props.selectedRB || !props.selectedWR) {
      window.alert("pick again");
    } else {
      let game = new Game();
      let computer = new Player("Computer");
      computer.team = localStorage.getItem("Opponent");
      let player = new Player("Player");
      player.team = localStorage.getItem("Pick");
      player.qb = props.selectedQB;
      player.wr = props.selectedWR;
      player.rb = props.selectedRB;
      game.addPlayer(computer);
      game.addPlayer(player);
      this.setState({ currentGame: game });
    }
  };

  render() {
    const { currentUser } = this.state;

    return (
      <Router>
        <React.Fragment>
          <Link to="/Login">Login</Link>..
          <Link to="/">Welcome Screen</Link>..
          <Link to="/Pick">Pick your team!</Link>..
          <Link to="/Opponent">Pick your opponent!</Link>..
          <Link to="/Teams">Select your Players!</Link>..
          <Link to="/Battle">Battle your Teams!</Link>..
          <button onClick={this.signOut}>SignOut</button>
          <hr />
          <Switch>
            <Route
              path="/Battle"
              component={routerProps => (
                <BattleContainer {...routerProps} currentUser={currentUser} />
              )}
            />
            <Route
              path="/Teams"
              component={routerProps => (
                <DataContainer {...routerProps} createGame={this.createGame} />
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
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

// import BackgroundImage from './Images/nfl-background-6.jpg'
// the below was in the render:
// const imgUrl = "https://gamesonthelawn.com.au/wp-content/uploads/2016/02/Grass-Background-image.jpg"
// <div style = {{ backgroundImage: 'url(' + imgUrl + ')'}}>
