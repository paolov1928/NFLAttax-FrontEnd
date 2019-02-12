import React, { Component } from "react"
import { Menu, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default class MenuExampleInverted extends Component {
  state = { activeItem: "home" }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Link to="/">
          <Menu.Item>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/128_Usona_Futbalo_.svg" />
          </Menu.Item>
        </Link>
        <Link to="/Login">
          <Menu.Item
            name="login"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
        </Link>
        <Link to="/">
          <Menu.Item
            name="dashboard"
            active={activeItem === "messages"}
            onClick={this.handleItemClick}
          />
        </Link>
        <Link to="/NewData">
          <Menu.Item
            name="team select"
            active={activeItem === "friends"}
            onClick={this.handleItemClick}
          />
        </Link>
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
