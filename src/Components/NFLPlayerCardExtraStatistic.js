import React from "react";
import { Card, Icon } from "semantic-ui-react";
const NFLPlayerCardExtraStatistic = props => (
  <Card.Content
    extra
    onClick={() => props.compareStatistic(props.syntax, props.comparison)}
  >
    <a>
      <Icon name={"angle double " + props.comparison} />
      {props.syntax + ": " + props.method(Object.values(props)[0])}
    </a>
  </Card.Content>
);

export default NFLPlayerCardExtraStatistic;
