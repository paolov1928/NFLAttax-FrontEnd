import React from "react";
import { Card, Icon } from "semantic-ui-react";
import NFLPlayerCardExtraStatistic from "./NFLPlayerCardExtraStatistic";
import * as cardData from "../Data/CardData";

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
    <NFLPlayerCardExtraStatistic
      totalTDs={
        statisticsLookup("receiving", "touchdowns", props) +
        statisticsLookup("rushing", "touchdowns", props)
      }
      {...cardData.rbCardData.totalTDs}
      compareStatistic={props.compareStatistic}
      toggleFade={props.toggleFade}
      currentGame={props.currentGame}
    />
    <NFLPlayerCardExtraStatistic
      fumbles={fumblesCalculation(props)}
      {...cardData.rbCardData.fumbles}
      compareStatistic={props.compareStatistic}
      toggleFade={props.toggleFade}
      currentGame={props.currentGame}
    />
    <NFLPlayerCardExtraStatistic
      avgRushYards={statisticsLookup("rushing", "avg_yards", props)}
      {...cardData.rbCardData.avgRushYards}
      compareStatistic={props.compareStatistic}
      toggleFade={props.toggleFade}
      currentGame={props.currentGame}
    />
    <NFLPlayerCardExtraStatistic
      avgRecYards={statisticsLookup("receiving", "avg_yards", props)}
      {...cardData.rbCardData.avgRecYards}
      compareStatistic={props.compareStatistic}
      toggleFade={props.toggleFade}
      currentGame={props.currentGame}
    />
    <NFLPlayerCardExtraStatistic
      brokenTackles={
        statisticsLookup("receiving", "broken_tackles", props) +
        statisticsLookup("rushing", "broken_tackles", props)
      }
      {...cardData.rbCardData.brokenTackles}
      compareStatistic={props.compareStatistic}
      toggleFade={props.toggleFade}
      currentGame={props.currentGame}
    />
    <NFLPlayerCardExtraStatistic
      longestRushTD={statisticsLookup("rushing", "longest_touchdown", props)}
      {...cardData.rbCardData.longestRushTD}
      compareStatistic={props.compareStatistic}
      toggleFade={props.toggleFade}
      currentGame={props.currentGame}
    />
    <NFLPlayerCardExtraStatistic
      droppedPasses={statisticsLookup("receiving", "dropped_passes", props)}
      {...cardData.rbCardData.droppedPasses}
      compareStatistic={props.compareStatistic}
      toggleFade={props.toggleFade}
      currentGame={props.currentGame}
    />
  </React.Fragment>
);

export default RBAdditionalDataFields;


// [].map(p=> {
//   <NFLPlayerCardExtraStatistic
//     p.={
//
//     }
//     {...cardData.rbCardData[totalTDs]}
//     compareStatistic={props.compareStatistic}
//     toggleFade={props.toggleFade}
//     currentGame={props.currentGame} />
//
// })
