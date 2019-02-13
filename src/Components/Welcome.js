import React, { Component } from "react"
import { Button, Image, Container, Header } from "semantic-ui-react"
import { toast } from "react-semantic-toasts"
import Slogan from "../Images/11719864_1179x1572.png"
import GamesFeed from "./GamesFeed"

class Welcome extends Component {
  state = {}

  handleClick = () => {
    toast({
      title: this.props.currentUser + " entered the game",
      icon: "football ball",
      time: 5000
    })
    this.props.history.push("/Pick")
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Header
            as="h1"
            textAlign="left"
            content={"Prepare yourself " + this.props.currentUser + "!!"}
          />
          <Image src={Slogan} size="medium" centered />
          <Button
            size="huge"
            color="black"
            onClick={() => this.handleClick()}
            attached="top"
          >
            Click here to enter the mêlée
          </Button>
          <Header as="h3" textAlign="left" content={"The latest GameFeed!!"} />
          <GamesFeed />
        </Container>
      </React.Fragment>
    )
  }
}

export default Welcome

// Make own version of this logo!
