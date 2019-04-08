import React, { Component } from "react"
import API from "../API"
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Container,
  Image,
  Header
} from "semantic-ui-react"
import RegisterForm from "./RegisterForm"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      randomGIF: null,
      signUpClicked: false
    }
  }

  componentDidMount() {
    this.randomFootballGIF()
  }

  handleChange = data => {
    this.setState({
      [data.name]: data.value
    })
  }

  handleSubmit = event => {
    const currentUser = { ...this.state }
    event.preventDefault()
    API.signin(currentUser).then(d => {
      if (d.error) {
        alert(d.error)
        // this.props.signin({})
      } else {
        this.props.signin(this.state.username, d.token)
        this.props.history.push("./Inventory")
      }
    })
  }

  randomFootballGIF = (query = "NFL", number = 10) => {
    let randomNumber = Math.floor(Math.random() * number)
    API.randomGIF(query, number).then(data =>
      this.setState({
        randomGIF: data.data[randomNumber].images.original.url
      })
    )
  }

  renderDividerOrSignup = () => {
    if (!this.state.signUpClicked) {
      return (
        <React.Fragment>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    onChange={(event, data) => this.handleChange(data)}
                    icon="user"
                    fluid
                    label="Username"
                    placeholder="Username"
                    name="username"
                    iconPosition="left"
                  />
                  <Form.Input
                    onChange={(event, data) => this.handleChange(data)}
                    icon="lock"
                    fluid
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    iconPosition="left"
                  />
                </Form.Group>
                <Form.Button>Log in</Form.Button>
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <Button
                content="Sign up"
                icon="signup"
                size="big"
                onClick={() => this.setState({ signUpClicked: true })}
              />
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </React.Fragment>
      )
    } else {
      return <RegisterForm signin={this.props.signin} />
    }
  }

  render() {
    // const { history } = this.props
    // console.log(history)
    // Was just deconstructing a variable for history that is always available in props.

    return (
      <Container>
        <Header
          as="h1"
          block
          textAlign="left"
          content="Please login to access Ballers Top Trumps"
        />
        <Segment placeholder>{this.renderDividerOrSignup()}</Segment>
        <Segment>
          <Image centered src={this.state.randomGIF} />
        </Segment>
      </Container>
    )
  }
}

export default Login
