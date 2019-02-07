import React, { Component } from "react"
import * as CompiledFantasyData from "../Data/AllNflFantasyData"
import * as SinglePlayerData from "../Data/singlePlayerData"
import { Card, Button } from "semantic-ui-react"
import NFLPlayerCard from "../Components/NFLPlayerCard"
import RosterSegment from "../Components/RosterSegment"
import { toast } from 'react-semantic-toasts'

class PlayerSelectionContainer extends Component {
  state = {
    additionalDataForTop5Players: SinglePlayerData.singlePlayerData,
    top5PlayersByTeamFantasyData: [],

    selectedQB: "",
    selectedWR: "",
    selectedRB: ""
  }

  componentDidMount() {
    this.gettingTopPlayersFromFantasyData()
    toast(
        {
            title: "Click three players to add to your lineup!",
            icon: 'info',
            time: 10000,
            type: 'warning',
        },
    )
  }

  gettingTopPlayersFromFantasyData = () => {
    const fantasyData = CompiledFantasyData.allNFLFantasyData.players
    fantasyData.sort((a, b) => b.seasonPts - a.seasonPts)
    let teams = [...new Set(fantasyData.map(p => p.teamAbbr))]
    teams.splice(teams.indexOf(""), 1)
    let top5ByTeam = []
    var i
    for (i = 0; i < teams.length; i++) {
      top5ByTeam.push(
        fantasyData
          .filter(p => p.position === "QB")
          .filter(qb => qb.teamAbbr === teams[i])
          .slice(0, 1)
      )
      top5ByTeam.push(
        fantasyData
          .filter(p => p.position === "RB")
          .filter(rb => rb.teamAbbr === teams[i])
          .slice(0, 2)
      )
      top5ByTeam.push(
        fantasyData
          .filter(p => p.position === "WR")
          .filter(wr => wr.teamAbbr === teams[i])
          .slice(0, 2)
      )
    }
    const top5Final = top5ByTeam.flat()
    this.setState({ top5PlayersByTeamFantasyData: top5Final })
  }

  filterAdditionalDataForThatCard = gsis => {
    // This filters down the additional data to that one player... JOSH GORDON IS missing
    return this.state.additionalDataForTop5Players.filter(addPData => {
      if (addPData.references.find(o => o.origin === "gsis" && o.id === gsis)) {
        return true
      }
    })[0]
  }

  filterIfPickHasBeenMade = () => {
    // if they have made a pick then show that team's players.. should always happen but dont want it to break.
    return localStorage.getItem("Pick")
      ? this.state.top5PlayersByTeamFantasyData.filter(
          p => p.teamAbbr === localStorage.getItem("Pick")
        )
      : this.state.top5PlayersByTeamFantasyData
  }

  selectPlayer = (position, esbid) => {
    // Eventually will want to feed up a whole compiled object for player
    if (position === "QB") {
      this.setState({ selectedQB: esbid })
    } else if (position === "WR") {
      this.setState({ selectedWR: esbid })
    } else {
      this.setState({ selectedRB: esbid })
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Player Roster - choose 1 QB, 1 RB and 1 WR</h1>
        <RosterSegment
          selectedQB={this.state.selectedQB}
          selectedWR={this.state.selectedWR}
          selectedRB={this.state.selectedRB}
          createGame={this.props.createGame}
        />
        <Button
          size="big"
          color="red"
          attached="bottom"
          onClick={() => {
            this.props.createGame(this.state)
            this.props.history.push("/QBBattle")
          }}
        >
          Let's Play
        </Button>
        <Card.Group itemsPerRow={5}>
          {this.filterIfPickHasBeenMade().map(p => (
            <NFLPlayerCard
              {...p}
              key={p.id}
              addData={this.filterAdditionalDataForThatCard(p.gsisPlayerId)}
              selectPlayer={this.selectPlayer}
            />
          ))}
        </Card.Group>
      </React.Fragment>
    )
  }
}

export default PlayerSelectionContainer
