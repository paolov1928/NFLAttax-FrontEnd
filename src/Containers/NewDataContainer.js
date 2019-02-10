import React, {
  Component
} from "react"
import * as CompiledFantasyData from "../Data/AllNflFantasyData"
import * as SinglePlayerData from "../Data/singlePlayerData"
import * as CardData from "../Data/CardData"

class NewDataContainer extends Component {
  state = {
    additionalDataForTop5Players: SinglePlayerData.singlePlayerData,
    top5PlayersByTeamFantasyData: [],
    deckOfPlayerCards: [],
  }

  componentDidMount() {
    this.gettingTopPlayersFromFantasyData()

  }

  addKeyToTheDeck = (deck, key) =>{
    let newDeck = deck
    const addData = this.state.additionalDataForTop5Players
    const addDataKey = CardData.baseCardData[key].addDataLookup
    const newKey = CardData.baseCardData[key].syntax
    const transformation = CardData.baseCardData[key].method
    newDeck.forEach(p=> {

      p[newKey] = transformation(addData.filter(addPData => {
            if (addPData.references.find(o => o.origin === "gsis" && o.id === p.gsisPlayerId)) {
              return true
            }
          })[0][addDataKey])
    })
    return newDeck
  }

  addingQBStatsToDeck = (deck, key) => {
    let newDeck = deck
    const addData = this.state.additionalDataForTop5Players
    const newKey = CardData.qbCardData[key].syntax
    const statisticsLookup = CardData.statisticsLookup

    newDeck.forEach(p=> {
      if (p.position === 'QB')
      { const thatQBaddData = addData.filter(addPData => {
          if (addPData.references.find(o => o.origin === "gsis" && o.id === p.gsisPlayerId)) {
            return true
          }
        })[0]
        let arrayOfStatsLookups = CardData.qbCardData[key].stat.map(l=> statisticsLookup(l[0], l[1], thatQBaddData))
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        p[newKey] = arrayOfStatsLookups.reduce(reducer)
      }
    })
    return newDeck
  }

  calculatingTheDeck = (top5Final) => {
    let deckOfPlayerCards = top5Final
    top5Final.forEach(p => {
      delete p['weekPts']
      delete p['seasonProjectedPts']
      delete p['stats']
      delete p['weekProjectedPts']
    })
    // Need to get these iterating over
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, 'weight')
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, 'height')
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, 'age')
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, 'draft')
    deckOfPlayerCards.forEach(p => p["Fantasy Points"] = Math.round(p.seasonPts))
    deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, 'totalTDs')
    deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, 'redZoneAttempts')
    deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, 'avgPassingYards')
    deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, 'qbRating')
    deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, 'sackYards')
    deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, 'poorThrows')
    deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, 'averagePocketTime')
    deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, 'longestPassingTD')
    this.setState({deckOfPlayerCards})
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
    this.setState({
      top5PlayersByTeamFantasyData: top5Final
    }, this.calculatingTheDeck(top5Final))
  }


  render() {
    return ( <
      React.Fragment >
      <
      h1 > Player Roster - choose 1 QB, 1 RB and 1 WR < /h1> <
      /React.Fragment>
    )
  }
}

export default NewDataContainer

// deck[0]['weight'] = addData.filter(addPData => {
//       if (addPData.references.find(o => o.origin === "gsis" && o.id === deck[0].gsisPlayerId)) {
//         return true
//       }
//     })[0].weight
