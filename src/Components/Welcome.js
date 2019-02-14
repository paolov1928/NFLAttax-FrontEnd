import React, { Component } from "react"
import { Button, Image, Container, Header } from "semantic-ui-react"
import { toast } from "react-semantic-toasts"
import Slogan from "../Images/11719864_1179x1572.png"
import GamesFeed from "./GamesFeed"
import API from "../API"

class Welcome extends Component {
  state = {
    userInfo: null
  }

  componentDidMount() {
    API.validate().then(r => {
      if (r.error) {
        this.props.history.push("./Login");
      }
    });
    this.findTheUsers()
  }

  findTheUsers = () => {
    API.findUsers().then(d => {
      let thisUsersInfo = d.find(
        b => b.username === localStorage.getItem("user")
      )
      this.setState({
        userInfo: thisUsersInfo
      })
    })
  }

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
            content={"Prepare yourself " + localStorage.getItem("user") + "!!"}
          />
          <Image src={Slogan} size="medium" centered />
          <Button
            size="huge"
            color="black"
            onClick={() => this.handleClick()}
            attached="top"
          >
            🏈 Click here to enter the mêlée 🏈
          </Button>
          <Header as="h3" textAlign="left" content={"Your latest GameFeed!!"} />
          <GamesFeed userInfo={this.state.userInfo} />
        </Container>
      </React.Fragment>
    )
  }
}

export default Welcome

// Make own version of this logo!
