import React, { Component } from "react"
import { Container, Image, Button, Icon } from "semantic-ui-react"
import API from "../API"
import * as usefulObject from "../Data/usefulObjects"
import * as NFLquotes from "../Data/NFLquotes"
import { Link } from "react-router-dom"

class EndPage extends Component {
  // Need to make the post on component did mount here. With the user ID fetch that. Post the other info from the game object.
  // game = Game.create(user_id: 4, yourTeam: "JAX", opponentTeam: "NE", won: false)
  //  (:user_id, :yourTeam, :opponentTeam, :won)
  // fetch all of the users   --->    a.find(b => b.username === 'Paolo').id

  constructor(props) {
    super(props)
    this.state = {
      randomGIF: null,
      quote: NFLquotes.nflQuoteData[Math.floor(Math.random() * 28)],
      userId: null
    }
  }

  componentDidMount() {
    this.randomMotivationGIF()
    this.findTheUserID()
  }

  findTheUserID = () => {
    API.findUsers().then(d => {
      let thisUseriD = d.find(b => b.username === localStorage.getItem("user"))
        .id
      this.setState(
        {
          userId: thisUseriD
        },
        this.postTheGameResult(thisUseriD)
      )
    })
  }

  postTheGameResult = iD => {
    const won = this.props.location.pathname === "/Win" ? true : false
    API.postResult(
      iD,
      this.props.currentGame.players[1].team,
      this.props.currentGame.players[0].team,
      won
    )
  }

  queryDependentOnLocation = () => {
    return this.props.location.pathname === "/Win" ? "cheerleader" : "sad"
  }

  randomMotivationGIF = (query, number = 10) => {
    let randomNumber = Math.floor(Math.random() * number)
    query = this.queryDependentOnLocation()
    API.randomGIF(query, number).then(data =>
      this.setState({
        randomGIF: data.data[randomNumber].images.original.url
      })
    )
  }

  renderQuoteTeam = () => {
    if (this.state.quote.team) {
      return ", of the " + this.state.quote.team
    }
  }

  render() {
    return (
      <Container>
        <h2>
          {this.props.location.pathname === "/Win"
            ? "🍾 Congratulations you won"
            : "Commiserations you lost"}{" "}
          your matchup against the
          {" " +
            usefulObject.aliasToFullName[
              this.props.currentGame.players[0].team
            ] +
            "!"}
        </h2>
        <Image src={this.state.randomGIF} size="huge" centered />

        <h2>One last nugget of NFL legend advice: </h2>
        <h3>
          <i> "{this.state.quote.quote}" </i>
        </h3>
        <h3>
          {" "}
          {this.state.quote.who}
          {this.renderQuoteTeam()}
        </h3>

        <Link to="/">
          <Button color="violet" fluid attached="bottom">
            Rinse and Repeat?!
            <br />
            <br />
            <Icon name="repeat" size="big" />
          </Button>
        </Link>
      </Container>
    )
  }
}

export default EndPage
