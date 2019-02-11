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

      p['baseComparables'][newKey] = transformation(addData.filter(addPData => {
            if (addPData.references.find(o => o.origin === "gsis" && o.id === p.gsisPlayerId)) {
              return true
            }
          })[0][addDataKey])
    })
    return newDeck
  }

  addingQBStatsToDeck = (deck, key, i) => {
    let newDeck = deck
    const addData = this.state.additionalDataForTop5Players
    const newKey = CardData.qbCardData[i].syntax
    const statisticsLookup = CardData.statisticsLookup
    const reducer = (accumulator, currentValue) => accumulator + currentValue

    newDeck.forEach(p=> {
      if (p.position === 'QB')
      { const thatQBaddData = addData.filter(addPData => {
          if (addPData.references.find(o => o.origin === "gsis" && o.id === p.gsisPlayerId)) {
            return true
          }
        })[0]
        let arrayOfStatsLookups = CardData.qbCardData[i].stat.map(l=> statisticsLookup(l[0], l[1], thatQBaddData))

        p["positionSpecificComparables"][newKey] = arrayOfStatsLookups.reduce(reducer)
      }
    })
    return newDeck
  }

  addingRBStatsToDeck = (deck, key, i) => {
    let newDeck = deck
    const addData = this.state.additionalDataForTop5Players
    const newKey = CardData.rbCardData[i].syntax
    const statisticsLookup = CardData.statisticsLookup
    const doesTypeOfStatExist = CardData.doesTypeOfStatExist
    const reducer = (accumulator, currentValue) => accumulator + currentValue


    newDeck.forEach(p=> {
      if (p.position === 'RB')
      { const thatRBaddData = addData.filter(addPData => {
          if (addPData.references.find(o => o.origin === "gsis" && o.id === p.gsisPlayerId)) {
            return true
          }
        })[0]

        let arrayOfStatsLookups = CardData.rbCardData[i].stat.map(l=> {if (doesTypeOfStatExist(l[0], thatRBaddData)) { return statisticsLookup(l[0], l[1], thatRBaddData)}})

        const correctedArray = arrayOfStatsLookups.map(e=> e === undefined? e=0: e)

        p["positionSpecificComparables"][newKey] = correctedArray.reduce(reducer)
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
    deckOfPlayerCards.forEach(p => p["baseComparables"] = {})
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, 'weight')
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, 'height')
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, 'age')
    deckOfPlayerCards = this.addKeyToTheDeck(deckOfPlayerCards, 'draft')
    deckOfPlayerCards.forEach(p => p["baseComparables"]["Fantasy Points"] = Math.round(p.seasonPts))
    deckOfPlayerCards.forEach(p => p["positionSpecificComparables"] = {})
    CardData.qbCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addingQBStatsToDeck(deckOfPlayerCards, obj.key, i)
    })
    CardData.rbCardData.forEach((obj, i) => {
      deckOfPlayerCards = this.addingRBStatsToDeck(deckOfPlayerCards, obj.key, i)
    })


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
