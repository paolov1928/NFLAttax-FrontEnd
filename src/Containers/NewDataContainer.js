import React, { Component } from "react"
import * as CompiledFantasyData from "../Data/AllNflFantasyData"
import * as SinglePlayerData from "../Data/singlePlayerData"
import * as CardData from "../Data/CardData"
import { toast } from "react-semantic-toasts"
import NewPlayerCard from "../Components/NewPlayerCard"
import RosterSegment from "../Components/RosterSegment"
import { Card, Button } from "semantic-ui-react"

class NewDataContainer extends Component {
  state = {
    additionalDataForTop5Players: SinglePlayerData.singlePlayerData,
    top5PlayersByTeamFantasyData: [],
    deckOfPlayerCards: [],
    selectedQB: "",
    selectedWR: "",
    selectedRB: ""
  }

  componentDidMount() {
    this.gettingTopPlayersFromFantasyData()
    toast({
      title: "Click three players to add to your lineup!",
      icon: "info",
      time: 10000,
      type: "warning"
    })
  }

  addKeyToTheDeck = (deck, key) => {
    let newDeck = deck
    const addData = this.state.additionalDataForTop5Players
    const addDataKey = CardData.baseCardData[key].addDataLookup
    const newKey = CardData.baseCardData[key].syntax
    const transformation = CardData.baseCardData[key].method
    newDeck.forEach(p => {
      p["baseComparables"][newKey] = transformation(
        addData.filter(addPData => {
          if (
            addPData.references.find(
              o => o.origin === "gsis" && o.id === p.gsisPlayerId
            )
          ) {
            return true
          }
        })[0][addDataKey]
      )
    })
    return newDeck
  }

  addingStatsToDeck = (deck, key, i, position) => {
    let newDeck = deck
    const addData = this.state.additionalDataForTop5Players
    const newKey = CardData[position + "CardData"][i].syntax
    const statisticsLookup = CardData.statisticsLookup
    const doesTypeOfStatExist = CardData.doesTypeOfStatExist
    const reducer = (accumulator, currentValue) => accumulator + currentValue

    newDeck.forEach(p => {
      if (p.position === position.toUpperCase()) {
        const thatPlayerAddData = addData.filter(addPData => {
          if (
            addPData.references.find(
              o => o.origin === "gsis" && o.id === p.gsisPlayerId
            )
          ) {
            return true
          }
        })[0]

        let arrayOfStatsLookups = CardData[position + "CardData"][i].stat.map(
          l => {
            if (doesTypeOfStatExist(l[0], thatPlayerAddData)) {
              return statisticsLookup(l[0], l[1], thatPlayerAddData)
            }
          }
        )

        const correctedArray = arrayOfStatsLookups.map(e =>
          e === undefined ? (e = 0) : e
        )

        p["positionSpecificComparables"].push({
          [newKey]: correctedArray.reduce(reducer)
        })
      }
    })
    return newDeck
  }

  calculatingTheDeck = top5Final => {
    let deckOfPlayerCards = top5Final
    top5Final.forEach(p => {
      delete p["weekPts"]
      delete p["seasonProjectedPts"]
      delete p["stats"]
      delete p["weekProjectedPts"]
    })
    // Need to get these iterating over
    deckOfPlayerCards.forEach(p => (p["baseComparables"] = {}))
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, "weight")
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, "height")
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, "age")
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, "draft")
    deckOfPlayerCards.forEach(
      p => (p["baseComparables"]["Fantasy Points"] = Math.round(p.seasonPts))
    )
    deckOfPlayerCards.forEach(p => (p["positionSpecificComparables"] = []))
    CardData.qbCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addingStatsToDeck(
        deckOfPlayerCards,
        obj.key,
        i,
        "qb"
      )
    })
    CardData.rbCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addingStatsToDeck(
        deckOfPlayerCards,
        obj.key,
        i,
        "rb"
      )
    })
    CardData.wrCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addingStatsToDeck(
        deckOfPlayerCards,
        obj.key,
        i,
        "wr"
      )
    })

    this.setState({ deckOfPlayerCards })
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
    this.setState(
      {
        top5PlayersByTeamFantasyData: top5Final
      },
      this.calculatingTheDeck(top5Final)
    )
  }

  filterIfPickHasBeenMade = () => {
    // if they have made a pick then show that team's players.. should always happen but dont want it to break.
    return localStorage.getItem("Pick")
      ? this.state.deckOfPlayerCards.filter(
          p => p.teamAbbr === localStorage.getItem("Pick")
        )
      : this.state.top5PlayersByTeamFantasyData
  }

  selectPlayer = props => {
    // Eventually will want to feed up a whole compiled object for player
    if (props.position === "QB") {
      this.setState({ selectedQB: props })
    } else if (props.position === "WR") {
      this.setState({ selectedWR: props })
    } else {
      this.setState({ selectedRB: props })
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
            <NewPlayerCard {...p} key={p.id} selectPlayer={this.selectPlayer} />
          ))}
        </Card.Group>
      </React.Fragment>
    )
  }
}

export default NewDataContainer

// deck[0]['weight'] = addData.filter(addPData => {
//       if (addPData.references.find(o => o.origin === "gsis" && o.id === deck[0].gsisPlayerId)) {
//         return true
//       }
//     })[0].weight
