import React, { Component } from "react";
import NFLLogoCard from "../Components/NFLLogoCard";
import { Card } from "semantic-ui-react";
import * as usefulObjects from "../Data/usefulObjects";

class LogoContainer extends Component {
  state = {
    teams: usefulObjects.teamsArray
  };

  render() {
    return (
      <React.Fragment>
        <Card.Group itemsPerRow={4}>
          {this.state.teams.map((p, i) => (
            <NFLLogoCard text={p} key={i} where={this.props.where} />
          ))}
        </Card.Group>
      </React.Fragment>
    );
  }
}

export default LogoContainer;
