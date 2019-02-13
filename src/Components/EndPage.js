import React, { Component } from "react"
import { Container, Image, Button, Icon } from "semantic-ui-react"
import API from "../API"
import * as usefulObject from "../Data/usefulObjects"
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
      quote: "quote",
      author: "author",
      userId: null
    }
  }

  componentDidMount() {
    this.randomMotivationGIF()
    this.sportsQuoteOfTheDay()
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
            ? "🍾 Congratulations you won"
            : "Commiserations you lost"}{" "}
          your matchup against the
          {" " +
            usefulObject.aliasToFullName[
              this.props.currentGame.players[0].team
            ]}
        </h3>
        <Image src={this.state.randomGIF} size="huge" centered />
        <p>Sports quote of the day:</p>
        <h3>
          <i> "{this.state.quote}" </i>
        </h3>
        <h3> {this.state.author}</h3>
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

// Make a post request to Games with
// fetch("http://localhost:3000/api/v1/cakes", {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body:JSON.stringify({
//       "name": toyNameInput.value,
//       "imgUrl": toyImageInput.value,
//       "ingredient_ids": state.arrayOfIngredientIds
//     })
//   })
//   .then(response => response.json())
//   .then(r => state.newlyCreatedCake = r)
//   .then(r => renderNewlyCreatedCake(state.newlyCreatedCake))
