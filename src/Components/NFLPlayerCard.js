import React, { Component } from "react";
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
  compareStatistic,
  toggleFade,
  currentGame
) {
  if (position === "QB") {
    return (
      <QBAdditionalDataFields
        {...addData}
        compareStatistic={compareStatistic}
        toggleFade={toggleFade}
      />
    );
  } else if (position === "RB") {
    return (
      <RBAdditionalDataFields
        {...addData}
        compareStatistic={compareStatistic}
        toggleFade={toggleFade}
        currentGame={currentGame}
      />
    );
  } else {
    return (
      <WRAdditionalDataFields
        {...addData}
        compareStatistic={compareStatistic}
        toggleFade={toggleFade}
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

class NFLPlayerCard extends Component {
  render() {
    return (
      <Card
        onClick={() =>
          this.props.location.pathname === "/Teams"
            ? this.props.selectPlayer(this.props.position, this.props.esbid)
            : "no clicks"
        }
        className={
          this.props.playerOpponent === "Opponent" && !this.props.toggle
            ? "Opponent"
            : "Player"
        }
      >
        <Image
          src={
            "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/" +
            this.props.esbid +
            ".png"
          }
          centered
        />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>
            <span className="date">
              {usefulObject.positionAliasToFull[this.props.position]}
            </span>
          </Card.Meta>
          <Card.Description>
            {usefulObject.aliasToFullName[this.props.teamAbbr]}
          </Card.Description>
        </Card.Content>
        <NFLPlayerCardExtraStatistic
          seasonPts={this.props.seasonPts}
          {...cardData.baseCardData.seasonPts}
          compareStatistic={this.props.compareStatistic}
          toggleFade={this.props.toggleFade}
          currentGame={this.props.currentGame}
        />
        <NFLPlayerCardExtraStatistic
          height={this.props.addData.height * 2.54}
          {...cardData.baseCardData.height}
          compareStatistic={this.props.compareStatistic}
          toggleFade={this.props.toggleFade}
          currentGame={this.props.currentGame}
        />
        <NFLPlayerCardExtraStatistic
          weight={this.props.addData.weight}
          {...cardData.baseCardData.weight}
          compareStatistic={this.props.compareStatistic}
          toggleFade={this.props.toggleFade}
          currentGame={this.props.currentGame}
        />
        <NFLPlayerCardExtraStatistic
          age={renderAge(this.props.addData.birth_date)}
          {...cardData.baseCardData.age}
          compareStatistic={this.props.compareStatistic}
          toggleFade={this.props.toggleFade}
          currentGame={this.props.currentGame}
        />
        <NFLPlayerCardExtraStatistic
          draft={
            this.props.addData.draft ? this.props.addData.draft.number : 999
          }
          {...cardData.baseCardData.draft}
          compareStatistic={this.props.compareStatistic}
          toggleFade={this.props.toggleFade}
          currentGame={this.props.currentGame}
        />
        {renderAdditionalDataBasedOnPosition(
          this.props.position,
          this.props.addData,
          this.props.compareStatistic,
          this.props.toggleFade,
          this.props.currentGame
        )}
      </Card>
    );
  }
}
export default withRouter(NFLPlayerCard);

// CM Comparison is easier but would be nice in Feet
// inches => {
//   let feetFromInches = Math.floor(inches / 12); //There are 12 inches in a foot
//   let inchesRemainder = inches % 12;
//   let result = feetFromInches + "'-" + inchesRemainder + '"';
//   return result;
// }
