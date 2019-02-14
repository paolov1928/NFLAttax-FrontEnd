import React, { Component } from "react"
import * as CompiledFantasyData from "../Data/AllNflFantasyData"
import * as SinglePlayerData from "../Data/singlePlayerData"
import * as CardData from "../Data/CardData"
import { toast } from "react-semantic-toasts"
import NewPlayerCard from "../Components/NewPlayerCard"
import RosterSegment from "../Components/RosterSegment"
import { Card, Button, Header, Segment, Divider } from "semantic-ui-react"
import API from "../API";
import "./battle.css"

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
    API.validate().then(r => {
      if (r.error) {
        this.props.history.push("./Login");
      } else {
        this.gettingTopPlayersFromFantasyData()
        toast({
          title: "Click three players to add to your lineup!",
          icon: "info",
          time: 10000,
          type: "warning"
        })

      }
    });

  }

  addKeyToTheDeck = (deck, i) => {
    let newDeck = deck
    const addData = this.state.additionalDataForTop5Players
    const addDataKey = CardData.baseCardData[i].addDataLookup
    const newKey = CardData.baseCardData[i].syntax
    const transformation = CardData.baseCardData[i].method
    const comparison = CardData.baseCardData[i].comparison

    newDeck.forEach(p => {
      p["baseComparables"].push({
        [newKey]: transformation(
          addData.filter(addPData => {
            if (
              addPData.references.find(
                o => o.origin === "gsis" && o.id === p.gsisPlayerId
              )
            ) {
              return true
            }
          })[0][addDataKey]
        ),
        ["comparison"]: comparison
      })
    })
    return newDeck
  }

  addingStatsToDeck = (deck, i, position) => {
    let newDeck = deck
    const addData = this.state.additionalDataForTop5Players
    const newKey = CardData[position + "CardData"][i].syntax
    const statisticsLookup = CardData.statisticsLookup
    const doesTypeOfStatExist = CardData.doesTypeOfStatExist
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const comparison = CardData[position + "CardData"][i].comparison

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
          [newKey]: correctedArray.reduce(reducer),
          ["comparison"]: comparison
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
    deckOfPlayerCards.forEach(p => (p["baseComparables"] = []))
    CardData.baseCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, i)
    })
    deckOfPlayerCards.forEach(p =>
      p["baseComparables"].push({
        ["Fantasy Points"]: Math.round(p.seasonPts),
        ["comparison"]: "up"
      })
    )
    deckOfPlayerCards.forEach(p => (p["positionSpecificComparables"] = []))
    CardData.qbCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addingStatsToDeck(deckOfPlayerCards, i, "qb")
    })
    CardData.rbCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addingStatsToDeck(deckOfPlayerCards, i, "rb")
    })
    CardData.wrCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addingStatsToDeck(deckOfPlayerCards, i, "wr")
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

  ifhandleToggle = () => {
    if (
      this.state.selectedQB &&
      this.state.selectedRB &&
      this.state.selectedWR
    ) {
      return (
        <React.Fragment>
          <Divider hidden />
          <Button
            size="massive"
            color="black"
            attached="bottom"
            onClick={() => {
              this.props.createGame(this.state)
              this.props.history.push("/Battle")
            }}
          >
            🏈 Let's Play 🏈
          </Button>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header as="h1" textAlign="center">
          Player Roster - choose one QB, one RB and one WR
        </Header>
        <RosterSegment
          selectedQB={this.state.selectedQB}
          selectedWR={this.state.selectedWR}
          selectedRB={this.state.selectedRB}
          createGame={this.props.createGame}
        />
        {this.ifhandleToggle()}
        <Divider hidden />
        <Segment>
          <Card.Group itemsPerRow={5} className='playerCardContainersOn'>
            {this.filterIfPickHasBeenMade().map(p => (
              <NewPlayerCard
                {...p}
                key={p.id}
                selectPlayer={this.selectPlayer}
              />
            ))}
          </Card.Group>
        </Segment>
      </React.Fragment>
    )
  }
}

export default NewDataContainer
