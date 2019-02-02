import React, { Component } from "react";
import { Card, Segment, Divider, Header } from "semantic-ui-react";
import NFLPlayerCard from "../Components/NFLPlayerCard";

class WRBattleContainer extends Component {
  WRarray = [
    this.props.currentGame.players[1].wr[0],
    this.props.currentGame.players[0].wr[0]
  ];
  WRaddDataArray = [
    this.props.currentGame.players[1].wr[1],
    this.props.currentGame.players[0].wr[1]
  ];

  render() {
    return (
      <React.Fragment>
        <Segment placeholder>
          <Header
            as="h1"
            block
            textAlign="center"
            content="Round 2: Battle of the Wide Receivers"
            subheader="In ninth grade, I played wide receiver. - Quavo "
          />
          <Card.Group itemsPerRow={2}>
            {this.WRarray.map((p, i) => (
              <NFLPlayerCard
                {...p}
                key={p.id}
                addData={this.WRaddDataArray[i]}
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

export default WRBattleContainer;

//Potentially use the quotes API ....  fetch('http://quotes.rest/qod.json?category=sports').then(r=> r.json()).then(r=> console.log(r.contents.quotes[0]))
// This needs to iterate through based on WR or WR or RB
