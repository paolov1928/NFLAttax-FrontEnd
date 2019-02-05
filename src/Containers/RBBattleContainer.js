import React, { Component } from "react";
import { Card, Segment, Divider, Header } from "semantic-ui-react";
import NFLPlayerCard from "../Components/NFLPlayerCard";

class RBBattleContainer extends Component {
  RBarray = [
    this.props.currentGame.players[1].rb[0],
    this.props.currentGame.players[0].rb[0]
  ];
  RBaddDataArray = [
    this.props.currentGame.players[1].rb[1],
    this.props.currentGame.players[0].rb[1]
  ];

  render() {
    return (
      <React.Fragment>
        <Segment placeholder>
          <Header
            as="h1"
            block
            textAlign="center"
            content="Round 3: Battle of the Running Backs"
            subheader="As a running back, it takes five offensive linemen, a tight end, a fullback and possibly two wide receivers, in order to make my job successful. - Marshawn Lynch"
          />
          <Card.Group itemsPerRow={2}>
            {this.RBarray.map((p, i) => (
              <NFLPlayerCard
                {...p}
                key={p.id}
                addData={this.RBaddDataArray[i]}
                compareStatistic={this.props.compareStatistic}
              />
            ))}
          </Card.Group>
          <Divider vertical>
            <strong>Vs</strong>
          </Divider>
        </Segment>
      </React.Fragment>
    );
  }
}

export default RBBattleContainer;

//Potentially use the quotes API ....  fetch('http://quotes.rest/qod.json?category=sports').then(r=> r.json()).then(r=> console.log(r.contents.quotes[0]))
// This needs to iterate through based on RB or WR or RB
