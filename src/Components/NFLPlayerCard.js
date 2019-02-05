import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import * as usefulObject from "../Data/usefulObjects";
import * as cardData from "../Data/CardData";
import QBAdditionalDataFields from "./QBAdditionalDataFields";
import RBAdditionalDataFields from "./RBAdditionalDataFields";
import WRAdditionalDataFields from "./WRAdditionalDataFields";
import NFLPlayerCardExtraStatistic from "./NFLPlayerCardExtraStatistic";
import { withRouter } from "react-router-dom";

function renderAdditionalDataBasedOnPosition(
  position,
  addData,
  compareStatistic
) {
  if (position === "QB") {
    return (
      <QBAdditionalDataFields
        {...addData}
        compareStatistic={compareStatistic}
      />
    );
  } else if (position === "RB") {
    return (
      <RBAdditionalDataFields
        {...addData}
        compareStatistic={compareStatistic}
      />
    );
  } else {
    return (
      <WRAdditionalDataFields
        {...addData}
        compareStatistic={compareStatistic}
      />
    );
  }
}

function renderAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const NFLPlayerCard = ({
  name,
  position,
  teamAbbr,
  seasonPts,
  esbid,
  selectPlayer,
  addData,
  location,
  compareStatistic,
  playerOpponent
}) => (
  <Card
    onClick={() =>
      location.pathname === "/Teams"
        ? selectPlayer(position, esbid)
        : "no clicks"
    }
    className={playerOpponent === "Opponent" ? "Opponent" : "Player"}
  >
    <Image
      src={
        "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/" +
        esbid +
        ".png"
      }
      centered
    />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>
        <span className="date">
          {usefulObject.positionAliasToFull[position]}
        </span>
      </Card.Meta>
      <Card.Description>
        {usefulObject.aliasToFullName[teamAbbr]}
      </Card.Description>
    </Card.Content>
    <NFLPlayerCardExtraStatistic
      seasonPts={seasonPts}
      {...cardData.baseCardData.seasonPts}
      compareStatistic={compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      height={addData.height * 2.54}
      {...cardData.baseCardData.height}
      compareStatistic={compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      weight={addData.weight}
      {...cardData.baseCardData.weight}
      compareStatistic={compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      age={renderAge(addData.birth_date)}
      {...cardData.baseCardData.age}
      compareStatistic={compareStatistic}
    />
    <NFLPlayerCardExtraStatistic
      draft={addData.draft ? addData.draft.number : 999}
      {...cardData.baseCardData.draft}
      compareStatistic={compareStatistic}
    />
    {renderAdditionalDataBasedOnPosition(position, addData, compareStatistic)}
  </Card>
);

export default withRouter(NFLPlayerCard);

// CM Comparison is easier but would be nice in Feet
// inches => {
//   let feetFromInches = Math.floor(inches / 12); //There are 12 inches in a foot
//   let inchesRemainder = inches % 12;
//   let result = feetFromInches + "'-" + inchesRemainder + '"';
//   return result;
// }
