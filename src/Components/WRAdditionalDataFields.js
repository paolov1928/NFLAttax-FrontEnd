import React from "react";
import { Card, Icon } from "semantic-ui-react";
import NFLPlayerCardExtraStatistic from "./NFLPlayerCardExtraStatistic";
import * as cardData from "../Data/CardData";

const statisticsLookup = (typeOfStat, actualStat, props) =>
  props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
    .statistics[typeOfStat][actualStat];

const touchdownsCalculation = props => {
  // if they have any rushing statistics... add receiving and rushing
  if (
    props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
      .statistics.rushing
  ) {
    return (
      statisticsLookup("receiving", "touchdowns", props) +
      statisticsLookup("rushing", "touchdowns", props)
    );
  } else {
    return statisticsLookup("receiving", "touchdowns", props);
  }
};
const brokenTacklesCalculation = props => {
  if (
    props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
      .statistics.rushing
  ) {
    return (
      statisticsLookup("receiving", "broken_tackles", props) +
      statisticsLookup("rushing", "broken_tackles", props)
    );
  } else {
    return statisticsLookup("receiving", "broken_tackles", props);
  }
};
const yardsAfterContactCalculation = props => {
  if (
    props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
      .statistics.rushing
  ) {
    return (
      statisticsLookup("receiving", "yards_after_contact", props) +
      statisticsLookup("rushing", "yards_after_contact", props)
    );
  } else {
    return statisticsLookup("receiving", "yards_after_contact", props);
  }
};

const WRAdditionalDataFields = props => (
  <React.Fragment>
    <NFLPlayerCardExtraStatistic
      totalTDs={touchdownsCalculation(props)}
      {...cardData.wrCardData.totalTDs}
      compareStatistic={props.compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      airYards={statisticsLookup("receiving", "air_yards", props)}
      {...cardData.wrCardData.airYards}
      compareStatistic={props.compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      brokenTackles={brokenTacklesCalculation(props)}
      {...cardData.wrCardData.brokenTackles}
      compareStatistic={props.compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      droppedPasses={statisticsLookup("receiving", "dropped_passes", props)}
      {...cardData.wrCardData.droppedPasses}
      compareStatistic={props.compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      yardsAfterContact={yardsAfterContactCalculation(props)}
      {...cardData.wrCardData.yardsAfterContact}
      compareStatistic={props.compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      longestRecTD={statisticsLookup("receiving", "longest_touchdown", props)}
      {...cardData.wrCardData.longestRecTD}
      compareStatistic={props.compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      droppedPasses={statisticsLookup("receiving", "dropped_passes", props)}
      {...cardData.wrCardData.droppedPasses}
      compareStatistic={props.compareStatistic}
    />
  </React.Fragment>
);

export default WRAdditionalDataFields;
