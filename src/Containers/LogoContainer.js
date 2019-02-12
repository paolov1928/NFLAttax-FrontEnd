import React, { Component } from "react"
import NFLLogoCard from "../Components/NFLLogoCard"
import { Card } from "semantic-ui-react"
import * as usefulObjects from "../Data/usefulObjects"

class LogoContainer extends Component {
  state = {
    teams: usefulObjects.teamsArray,
    currentPick: null
  }

  componentDidMount() {
    this.shuffleCards()
  }

  shuffleCards = () => {
    let teams = this.state.teams
    teams = [...teams].sort(() => Math.random() - 0.5)
    this.setState({ teams })
  }

  toggleCurrentPick = team => {
    this.setState({ currentPick: team })
  }

  render() {
    return (
      <React.Fragment>
        <Card.Group itemsPerRow={4}>
          {this.state.teams.map((p, i) => (
            <NFLLogoCard
              text={p}
              key={i}
              where={this.props.where}
              toggleCurrentPick={this.toggleCurrentPick}
            />
          ))}
        </Card.Group>
      </React.Fragment>
    )
  }
}

export default LogoContainer
