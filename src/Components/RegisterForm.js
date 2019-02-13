import React from "react"
import { Form } from "semantic-ui-react"
import API from "../API"
import { withRouter } from "react-router-dom"
import "../Containers/battle.css"

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      passwordConfirmation: ""
    }
  }

  handleChange = data => {
    this.setState({
      [data.name]: data.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    API.createUser({
      username: this.state.username,
      password: this.state.password
    }).then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        const currentUser = { ...this.state }
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
    })
  }

  render() {
    return (
      <Form
        onSubmit={e => {
          this.handleSubmit(e)
        }}
      >
        <Form.Group widths="equal">
          <Form.Input
            onChange={(event, data) => this.handleChange(data)}
            fluid
            label="Username"
            placeholder="Username"
            name="username"
            icon="user"
            iconPosition="left"
            className="fixFormWidth"
          />

          <Form.Input
            onChange={(event, data) => this.handleChange(data)}
            fluid
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            icon="lock"
            iconPosition="left"
            className="fixFormWidth"
          />

          <Form.Input
            onChange={(event, data) => this.handleChange(data)}
            fluid
            label="Confirm password"
            placeholder="Password"
            name="passwordConfirmation"
            type="password"
            icon="lock"
            iconPosition="left"
            className="fixFormWidth"
          />
        </Form.Group>
        <Form.Button>Register</Form.Button>
      </Form>
    )
  }
}

export default withRouter(RegisterForm)
