import React, { Component } from "react"
import { Card, Segment, Divider, Header } from "semantic-ui-react"
import NFLPlayerCard from "../Components/NFLPlayerCard"
import "./battle.css"
import { toast } from 'react-semantic-toasts'

class QBBattleContainer extends Component {
  state = {
    toggle: false
  }

  componentDidMount() {
    toast(
        {
            title: "Click a statistic that will beat the opponent's statistic!",
            description: "Arrows show whether higher or lower wins",
            icon: 'info',
            time: 10000,
            type: 'warning',
        },
    )
  }

  toggleFade = () => {
    this.setState({ toggle: true })
  }

  QBarray = [
    this.props.currentGame.players[1].qb[0],
    this.props.currentGame.players[0].qb[0]
  ]
  QBaddDataArray = [
    this.props.currentGame.players[1].qb[1],
    this.props.currentGame.players[0].qb[1]
  ]

  render() {
    return (
      <React.Fragment>
        <Segment placeholder>
          <Header
            as="h1"
            block
            textAlign="center"
            content="Round 1: Battle of the Quarterbacks"
            subheader="Sure, luck means a lot in football. Not having a good quarterback is bad luck. - Don Shula"
          />
          <Card.Group itemsPerRow={2}>
            {this.QBarray.map((p, i) => (
              <NFLPlayerCard
                {...p}
                key={p.id}
                addData={this.QBaddDataArray[i]}
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

export default QBBattleContainer
