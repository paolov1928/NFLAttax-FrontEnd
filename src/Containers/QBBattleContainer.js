import React, { Component } from "react";
import { Card, Segment, Divider, Header } from "semantic-ui-react";
import NFLPlayerCard from "../Components/NFLPlayerCard";

class QBBattleContainer extends Component {
  QBarray = [
    this.props.currentGame.players[1].qb[0],
    this.props.currentGame.players[0].qb[0]
  ];
  QBaddDataArray = [
    this.props.currentGame.players[1].qb[1],
    this.props.currentGame.players[0].qb[1]
  ];

  render() {
    return (
      <React.Fragment>
        <Segment placeholder>
          <Header
            as="h1"
            block
            textAlign="center"
            content="Round 1: Battle of the Quarterbacks"
            subheader="Sure, luck means a lot in football. Not having a good quarterback is bad luck. - Don Shula"
          />
          <Card.Group itemsPerRow={2}>
            {this.QBarray.map((p, i) => (
              <NFLPlayerCard
                {...p}
                key={p.id}
                addData={this.QBaddDataArray[i]}
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

export default QBBattleContainer;

//Potentially use the quotes API ....  fetch('http://quotes.rest/qod.json?category=sports').then(r=> r.json()).then(r=> console.log(r.contents.quotes[0]))
// This needs to iterate through based on QB or WR or RB
