import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const whereToNext = (location, props) => {
  if (location === "/QBBattle") {
    return props.history.push("/WRBattle");
  } else if (location === "/WRBattle") {
    return props.history.push("/RBBattle");
  } else {
    return props.history.push("/Welcome");
  }
};

const NFLPlayerCardExtraStatistic = props => (
  <Card.Content
    extra
    onClick={() => {
      props.compareStatistic(props.syntax, props.comparison);

      whereToNext(props.location.pathname, props);
    }}
  >
    <a>
      <Icon name={"angle double " + props.comparison} />
      {props.syntax + ": " + props.method(Object.values(props)[0])}
    </a>
  </Card.Content>
);

export default withRouter(NFLPlayerCardExtraStatistic);
