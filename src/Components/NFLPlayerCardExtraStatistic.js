import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const whereToNext = location => {
  console.log(location);
};

const NFLPlayerCardExtraStatistic = props => (
  <Card.Content
    extra
    onClick={() => {
      props.compareStatistic(props.syntax, props.comparison);
      props.history.push("/WRBattle");
    }}
  >
    <a>
      <Icon name={"angle double " + props.comparison} />
      {props.syntax + ": " + props.method(Object.values(props)[0])}
    </a>
  </Card.Content>
);

export default withRouter(NFLPlayerCardExtraStatistic);
