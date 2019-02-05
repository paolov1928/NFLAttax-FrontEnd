import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const winOrLoss = props =>
  props.currentGame.p1roundCount > 1
    ? props.history.push("/Win")
    : props.history.push("/Loss");

const whereToNext = (location, props) => {
  if (location === "/QBBattle") {
    return props.history.push("/WRBattle");
  } else if (location === "/WRBattle") {
    return props.history.push("/RBBattle");
  } else {
    return winOrLoss(props);
  }
};

const NFLPlayerCardExtraStatistic = props => (
  <Card.Content
    extra
    onClick={() => {
      props.compareStatistic(props.syntax, props.comparison);
      props.toggleFade();
      setTimeout(() => whereToNext(props.location.pathname, props), 8000);
    }}
  >
    <a>
      <Icon name={"angle double " + props.comparison} />
      {props.syntax + ": " + props.method(Object.values(props)[0])}
    </a>
  </Card.Content>
);

export default withRouter(NFLPlayerCardExtraStatistic);
