import React, { Component } from "react";
import LogoContainer from "../Containers/LogoContainer";
import API from "../API";
import { Header, Container } from "semantic-ui-react";

class PickTeamOrOpponent extends Component {
  componentDidMount() {
    API.validate().then(r => {
      if (r.error) {
        this.props.history.push("./Login");
      }
    });
  }

  render() {
    const opponentOrTeamScreen = () => {
      return this.props.location.pathname === "/Opponent" ? "opponent" : "team";
    };

    return (
      <React.Fragment>
        <Container>
          <Header
            as="h1"
            block
            textAlign="center"
            content={"Pick your " + opponentOrTeamScreen() + "!"}
          />

          <LogoContainer where={this.props.location.pathname} />
        </Container>
      </React.Fragment>
    );
  }
}

export default PickTeamOrOpponent;
