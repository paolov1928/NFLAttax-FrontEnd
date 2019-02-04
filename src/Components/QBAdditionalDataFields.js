import React from "react";
import NFLPlayerCardExtraStatistic from "./NFLPlayerCardExtraStatistic";
import * as cardData from "../Data/CardData";

const statisticsLookup = (typeOfStat, actualStat, props) =>
  props.seasons.find(s => s.year === 2018 && s.type === "REG").teams[0]
    .statistics[typeOfStat][actualStat];
// Maybe should make this a find for all instances of the key of (actualStat e.g. touchdowns over all typeOfStat
// Need to make sure it picks up all teams ... like CJ anderson changed teams. Use a Reduce

const QBAdditionalDataFields = props => (
  <React.Fragment>
    <NFLPlayerCardExtraStatistic
      totalTDs={
        statisticsLookup("passing", "touchdowns", props) +
        statisticsLookup("rushing", "touchdowns", props)
      }
      {...cardData.qbCardData.totalTDs}
    />
    <NFLPlayerCardExtraStatistic
      redZoneAttempts={
        statisticsLookup("passing", "redzone_attempts", props) +
        statisticsLookup("rushing", "redzone_attempts", props)
      }
      {...cardData.qbCardData.redZoneAttempts}
    />
    <NFLPlayerCardExtraStatistic
      avgPassingYards={statisticsLookup("passing", "avg_yards", props)}
      {...cardData.qbCardData.avgPassingYards}
    />
    <NFLPlayerCardExtraStatistic
      qbRating={statisticsLookup("passing", "rating", props)}
      {...cardData.qbCardData.qbRating}
    />
    <NFLPlayerCardExtraStatistic
      sackYards={statisticsLookup("passing", "sack_yards", props)}
      {...cardData.qbCardData.sackYards}
    />
    <NFLPlayerCardExtraStatistic
      poorThrows={statisticsLookup("passing", "poor_throws", props)}
      {...cardData.qbCardData.poorThrows}
    />
    <NFLPlayerCardExtraStatistic
      averagePocketTime={statisticsLookup("passing", "avg_pocket_time", props)}
      {...cardData.qbCardData.averagePocketTime}
    />
    <NFLPlayerCardExtraStatistic
      longestPassingTD={statisticsLookup("passing", "longest_touchdown", props)}
      {...cardData.qbCardData.longestPassingTD}
    />
  </React.Fragment>
);

export default QBAdditionalDataFields;
