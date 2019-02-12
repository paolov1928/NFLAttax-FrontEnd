import React, { Component } from "react"
import { Card, Image } from "semantic-ui-react"
import * as usefulObject from "../Data/usefulObjects"
import Statistic from "./Statistic"
import { withRouter } from "react-router-dom"

class NFLPlayerCard extends Component {
  iterativeRender = typeOfStat => {
    return this.props[typeOfStat].map((stat, i) => (
      <Statistic
        {...stat}
        key={i}
        compareStatistic={this.props.compareStatistic}
        toggleFade={this.props.toggleFade}
        currentGame={this.props.currentGame}
      />
    ))
  }

  renderStats = typeOfStat => {
    if (this.props.location.pathname !== "/NewData") {
      return this.iterativeRender(typeOfStat)
    }
  }

  handleClassName = () => {
    if (this.props.playerOpponent === "Opponent" && !this.props.toggle) {
      return "Opponent"
    } else if (this.props.toggle) {
      return "afterClickPointerOff"
    }
  }

  render() {
    return (
      <Card
        onClick={() =>
          this.props.location.pathname === "/NewData"
            ? this.props.selectPlayer(this.props)
            : "no clicks"
        }
        className={this.handleClassName()}
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

        {this.renderStats("baseComparables")}
        {this.renderStats("positionSpecificComparables")}
      </Card>
    )
  }
}
export default withRouter(NFLPlayerCard)

// CM Comparison is easier but would be nice in Feet
// inches => {
//   let feetFromInches = Math.floor(inches / 12); //There are 12 inches in a foot
//   let inchesRemainder = inches % 12;
//   let result = feetFromInches + "'-" + inchesRemainder + '"';
//   return result;
// }
