import React, { Component } from "react";
import { Form, Container, Image } from "semantic-ui-react";
import API from "../API";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      randomGIF: null
    };
  }

  componentDidMount() {
    this.randomFootballGIF();
  }

  handleChange = data => {
    this.setState({
      [data.name]: data.value
    });
  };

  handleSubmit = event => {
    const currentUser = { ...this.state };
    event.preventDefault();
    API.signin(currentUser).then(d => {
      if (d.error) {
        alert(d.error);
        // this.props.signin({})
      } else {
        this.props.signin(this.state.username, d.token);
        this.props.history.push("./Inventory");
      }
    });
  };

  randomFootballGIF = (number = 50) => {
    let randomNumber = Math.floor(Math.random() * number);
    API.randomGIF(number).then(data =>
      this.setState({
        randomGIF: data.data[randomNumber].images.original.url
      })
    );
  };

  render() {
    // const { history } = this.props
    // console.log(history)
    // Was just deconstructing a variable for history that is always available in props.

    return (
      <Container>
        <h3>Log In</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              onChange={(event, data) => this.handleChange(data)}
              fluid
              label="Username"
              placeholder="Username"
              name="username"
            />
            <Form.Input
              onChange={(event, data) => this.handleChange(data)}
              fluid
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
            />
          </Form.Group>
          <Form.Button>Log in</Form.Button>
        </Form>

        <Image src={this.state.randomGIF} />
      </Container>
    );
  }
}

export default Login;

// This was the original image <Image src="http://myorthodontists.info/wp-content/uploads/2016/09/Football-Season.jpg" />
