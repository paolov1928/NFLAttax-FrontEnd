import React, { Component } from "react"
import { Button, Image, Container } from "semantic-ui-react"
import { toast } from 'react-semantic-toasts';

class Welcome extends Component {
  handleClick = () => {
    toast(
        {
            title: 'New User entered the game',
            icon: 'football ball',
            time: 5000,
        },
    );
    this.props.history.push("/Pick")
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Button
            size="huge"
            inverted
            color="green"
            onClick={() => this.handleClick()}
          >
            Enter the mêlée
          </Button>
          <Image
            src="https://static.tvgcdn.net/feed/1/864/thumbs/11719864_1179x1572.jpg"
            size="big"
          />
        </Container>
      </React.Fragment>
    )
  }
}

export default Welcome

// Make own version of this logo!
