import React, { Component } from "react"
import { Container, Image, Button } from "semantic-ui-react"
import API from "../API"
import * as usefulObject from "../Data/usefulObjects"
import { Link } from "react-router-dom"

class EndPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      randomGIF: null,
      quote: "quote",
      author: "author"
    }
  }

  componentDidMount() {
    this.randomMotivationGIF()
    this.sportsQuoteOfTheDay()
  }

  queryDependentOnLocation() {
    return this.props.location.pathname === "/Win" ? "cheerleader-happy" : "sad"
  }

  randomMotivationGIF = (query = "cheerleader-happy", number = 25) => {
    let randomNumber = Math.floor(Math.random() * number)
    query = this.queryDependentOnLocation()
    API.randomGIF(query, number).then(data =>
      this.setState({
        randomGIF: data.data[randomNumber].images.original.url
      })
    )
  }

  sportsQuoteOfTheDay = (query = "sports") => {
    API.randomQuote(query).then(data =>
      this.setState({
        quote: data.contents.quotes[0].quote,
        author: data.contents.quotes[0].author
      })
    )
  }

  render() {
    return (
      <Container>
        <h3>
          {this.props.location.pathname === "/Win"
            ? "Congratulations you won"
            : "Commiserations you lost"}{" "}
          your matchup against the
          {" " +
            usefulObject.aliasToFullName[
              this.props.currentGame.players[0].team
            ]}
        </h3>
        <Image src={this.state.randomGIF} />
        <p>Sports quote of the day:</p>
        <h3>
          <i> "{this.state.quote}" </i>
        </h3>
        <h3> {this.state.author}</h3>
        <Link to="/">
          <Button color="grey">Rinse and Repeat?!</Button>
        </Link>
      </Container>
    )
  }
}

export default EndPage
