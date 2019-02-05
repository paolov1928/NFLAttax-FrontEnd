import React, { Component } from "react";
import { Container, Image } from "semantic-ui-react";
import API from "../API";

class LossPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomGIF: null
    };
  }

  componentDidMount() {
    this.randomMotivationGIF();
  }

  randomMotivationGIF = (query = "motivation", number = 25) => {
    let randomNumber = Math.floor(Math.random() * number);
    API.randomGIF(query, number).then(data =>
      this.setState({
        randomGIF: data.data[randomNumber].images.original.url
      })
    );
  };

  render() {
    return (
      <Container>
        <h3>Loss Screen</h3>

        <Image src={this.state.randomGIF} />
      </Container>
    );
  }
}

export default LossPage;
