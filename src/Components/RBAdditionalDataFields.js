import React from "react";
import { Card, Icon } from "semantic-ui-react";

const statisticsLookup = (typeOfStat, actualStat, props) =>
  props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
    .statistics[typeOfStat][actualStat];

const fumblesCalculation = props => {
  if (
    props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
      .statistics.fumbles
  ) {
    return props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
      .statistics.fumbles.fumbles;
  } else {
    return "0";
  }
};

const RBAdditionalDataFields = props => (
  <React.Fragment>
    <Card.Content extra>
      <a>
        <Icon name="football ball" />
        Total TDs:{" "}
        {statisticsLookup("receiving", "touchdowns", props) +
          statisticsLookup("rushing", "touchdowns", props)}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="football ball" />
        Fumbles: {fumblesCalculation(props)}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="football ball" />
        Avg Rush Yards: {statisticsLookup("rushing", "avg_yards", props)}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="football ball" />
        Avg Receiving Yards: {statisticsLookup("receiving", "avg_yards", props)}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="football ball" />
        Broken Tackles:{" "}
        {statisticsLookup("receiving", "broken_tackles", props) +
          statisticsLookup("rushing", "broken_tackles", props)}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="football ball" />
        Longest Rush TD:{" "}
        {statisticsLookup("rushing", "longest_touchdown", props)}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="football ball" />
        Dropped Receiving Passes:{" "}
        {statisticsLookup("receiving", "dropped_passes", props)}
      </a>
    </Card.Content>
  </React.Fragment>
);

export default RBAdditionalDataFields;
