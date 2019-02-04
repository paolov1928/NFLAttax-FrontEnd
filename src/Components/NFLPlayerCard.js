import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import * as usefulObject from "../Data/usefulObjects";
import * as cardData from "../Data/CardData";
import QBAdditionalDataFields from "./QBAdditionalDataFields";
import RBAdditionalDataFields from "./RBAdditionalDataFields";
import WRAdditionalDataFields from "./WRAdditionalDataFields";
import NFLPlayerCardExtraStatistic from "./NFLPlayerCardExtraStatistic";
import { withRouter } from "react-router-dom";

function renderAdditionalDataBasedOnPosition(position, addData) {
  if (position === "QB") {
    return <QBAdditionalDataFields {...addData} />;
  } else if (position === "RB") {
    return <RBAdditionalDataFields {...addData} />;
  } else {
    return <WRAdditionalDataFields {...addData} />;
  }
}

const draftDetails = addData => {
  if (addData.draft) {
    return (
      <Card.Content extra>
        <a>
          <Icon name="football ball" />
          Draft: Round: {addData.draft.round}, Pick: {addData.draft.number}
        </a>
      </Card.Content>
    );
  } else {
    return (
      <Card.Content extra>
        <a>
          <Icon name="football ball" />
          Draft: Undrafted
        </a>
      </Card.Content>
    );
  }
};

const NFLPlayerCard = ({
  name,
  position,
  teamAbbr,
  seasonPts,
  esbid,
  selectPlayer,
  addData,
  location
}) => (
  <Card
    onClick={() =>
      location.pathname === "/Teams"
        ? selectPlayer(position, esbid)
        : console.log("no clicks")
    }
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
    />
    <NFLPlayerCardExtraStatistic
      height={addData.height}
      {...cardData.baseCardData.height}
    />
    <NFLPlayerCardExtraStatistic
      weight={addData.weight}
      {...cardData.baseCardData.weight}
    />
    <NFLPlayerCardExtraStatistic
      age={addData.birth_date}
      {...cardData.baseCardData.age}
    />
    {draftDetails(addData)}
    {renderAdditionalDataBasedOnPosition(position, addData)}
  </Card>
);

export default withRouter(NFLPlayerCard);
