import React, { Component } from "react"
import { Card, Segment, Divider, Header, Button } from "semantic-ui-react"
import NewPlayerCard from "../Components/NewPlayerCard"
import "./battle.css"
import { toast } from "react-semantic-toasts"
import * as usefulObjects from "../Data/usefulObjects"

class BattleContainer extends Component {
  state = {
    toggle: false,
    battleScreens: usefulObjects.battleScreens,
    round: 0
  }

  componentDidMount() {
    toast({
      title: "Click a statistic that will beat the opponent's statistic!",
      description: "Arrows show whether higher or lower wins",
      icon: "info",
      time: 10000,
      type: "warning"
    })
  }

  winOrLoss = () =>
    this.props.currentGame.p1roundCount > 1
      ? this.props.history.push("/Win")
      : this.props.history.push("/Loss")

  toggleFade = () => {
    let newFade = !this.state.toggle
    this.setState({ toggle: newFade })
  }
  handleClick = () => {
    if (this.state.round < 2) {
      let newRound = this.state.round + 1
      this.setState({ round: newRound }, this.toggleFade())
    } else {
      this.winOrLoss()
    }
  }

  renderTable = () => {
    const positionRound = this.state.battleScreens[this.state.round].position
    return [
      this.props.currentGame.players[1][positionRound],
      this.props.currentGame.players[0][positionRound]
    ]
  }
  // Make this a function that is dependent on round

  renderText = () => {
    return this.state.round < 2
      ? `🏈 Move on to the ${this.state.battleScreens[
          this.state.round + 1
        ].position.toUpperCase()} round  🏈`
      : "Will it be the 🍾 or the 𝐋 ?!"
  }

  render() {
    if (!this.props.currentGame) {
      this.props.history.push("/")
      return <div>hello</div>
    } else {
      return (
        <React.Fragment>
          <Segment placeholder>
            <Header
              className={"maxZIndexheader"}
              as="h1"
              block
              textAlign="center"
              content={this.state.battleScreens[this.state.round].content}
              subheader={this.state.battleScreens[this.state.round].subheader}
            />
            <Button
              size="huge"
              fluid
              className={!this.state.toggle ? "invisible" : "visible"}
              color="black"
              onClick={() => this.handleClick()}
            >
              {this.renderText()}
            </Button>
            <Divider hidden />
            <Card.Group itemsPerRow={2}>
              {this.renderTable().map((p, i) => (
                <NewPlayerCard
                  {...p}
                  key={p.id}
                  compareStatistic={this.props.compareStatistic}
                  playerOpponent={i % 2 === 0 ? "Player" : "Opponent"}
                  toggle={this.state.toggle}
                  toggleFade={this.toggleFade}
                />
              ))}
            </Card.Group>

            <Divider vertical>
              <strong>Vs</strong>
            </Divider>
          </Segment>
        </React.Fragment>
      )
    }
  }
}

export default BattleContainer
