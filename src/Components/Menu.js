import React, { Component } from "react"
import { Menu, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default class MenuExampleInverted extends Component {
  state = { activeItem: "login" }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted borderless>
        <Link to="/">
          <Menu.Item>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/128_Usona_Futbalo_.svg" />
          </Menu.Item>
        </Link>

        <Menu.Item name="Ballers by Paolo" />

        <Menu.Menu position="right">
          <Link to="/Login">
            <Menu.Item>
              <Button
                inverted
                color="violet"
                onClick={() => this.props.signOut()}
                compact
              >
                SignOut
              </Button>
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    )
  }
}
