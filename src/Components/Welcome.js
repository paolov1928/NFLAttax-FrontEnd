import React, { Component } from "react"
import { Button, Image, Container } from "semantic-ui-react"
import { toast } from "react-semantic-toasts"
import mainLogo from "../Images/11719864_1179x1572.png"

class Welcome extends Component {
  handleClick = () => {
    toast({
      title: "New User entered the game",
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
          <Image src={mainLogo} size="medium" centered />
          <Button
            size="huge"
            inverted
            color="green"
            onClick={() => this.handleClick()}
            attached="top"
          >
            Enter the mêlée
          </Button>
        </Container>
      </React.Fragment>
    )
  }
}

export default Welcome

// Make own version of this logo!
