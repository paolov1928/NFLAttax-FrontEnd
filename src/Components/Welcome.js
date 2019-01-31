import React, { Component } from "react";
import { Button, Image, Container } from "semantic-ui-react";

class Welcome extends Component {
  handleClick = () => {
    this.props.history.push("/Pick");
  };

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
          <Image src="https://static.tvgcdn.net/feed/1/864/thumbs/11719864_1179x1572.jpg" />
        </Container>
      </React.Fragment>
    );
  }
}

export default Welcome;

// Make own version of this logo!
