import React, { Component } from "react"
import { Card, Segment, Divider, Header } from "semantic-ui-react"
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
  // need to put in state
  componentDidMount() {
    toast({
      title: "Click a statistic that will beat the opponent's statistic!",
      description: "Arrows show whether higher or lower wins",
      icon: "info",
      time: 10000,
      type: "warning"
    })
  }

  toggleFade = () => {
    this.setState({ toggle: true })
  }

  battleScreen = usefulObjects.battleScreens.find(
    s => s.roundNumber === this.props.currentGame.currentRound
  )

  Table = [
    this.props.currentGame.players[1][this.battleScreen.position],
    this.props.currentGame.players[0][this.battleScreen.position]
  ]
  // Make this a function that is dependent on round

  render() {
    return (
      <React.Fragment>
        <Segment placeholder>
          <Header
            as="h1"
            block
            textAlign="center"
            content={this.battleScreen.content}
            subheader={this.battleScreen.subheader}
          />
          <Card.Group itemsPerRow={2}>
            {this.Table.map((p, i) => (
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

export default BattleContainer
