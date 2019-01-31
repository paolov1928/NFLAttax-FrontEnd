import React, { Component } from "react";
import * as CompiledTeamData from "../Data/CompiledTeamData";
import * as CompiledFantasyData from "../Data/AllNflFantasyData";
import * as SinglePlayerData from "../Data/singlePlayerData";
import { Card } from "semantic-ui-react";
import NFLPlayerCard from "../Components/NFLPlayerCard";
import RosterSegment from "../Components/RosterSegment";

class DataContainer extends Component {
  state = {
    teams: CompiledTeamData.allNFLTeamData,
    allPlayers: [],
    fantasyData: CompiledFantasyData.allNFLFantasyData.players,
    top5PlayersByTeam: [],
    additionalDataForTop5: [],
    singlePlayerData: SinglePlayerData.singlePlayerData
  };

  componentDidMount() {
    this.gettingPlayersFromTeamData();
    this.gettingTopPlayersFromFantasyData();
  }

  gettingPlayersFromTeamData = () => {
    const teams = this.state.teams;
    const allPlayers = teams.map(t => t.players).flat();
    this.setState({ allPlayers: allPlayers });
  };

  gettingTopPlayersFromFantasyData = () => {
    const fantasyData = this.state.fantasyData;
    fantasyData.sort((a, b) => b.seasonPts - a.seasonPts);
    let teams = [...new Set(fantasyData.map(p => p.teamAbbr))];
    teams.splice(teams.indexOf(""), 1);
    let top5ByTeam = [];
    var i;
    for (i = 0; i < teams.length; i++) {
      top5ByTeam.push(
        fantasyData
          .filter(p => p.position === "QB")
          .filter(qb => qb.teamAbbr === teams[i])
          .slice(0, 1)
      );
      top5ByTeam.push(
        fantasyData
          .filter(p => p.position === "RB")
          .filter(rb => rb.teamAbbr === teams[i])
          .slice(0, 2)
      );
      top5ByTeam.push(
        fantasyData
          .filter(p => p.position === "WR")
          .filter(wr => wr.teamAbbr === teams[i])
          .slice(0, 2)
      );
    }
    const top5Final = top5ByTeam.flat();
    this.setState(
      { top5PlayersByTeam: top5Final },
      this.filterPlayersFromTeamDataToTop5(top5Final)
    );
    // Had to get the above to run async as dependent on top5
  };

  filterPlayersFromTeamDataToTop5 = top5Final => {
    // const top5 = this.state.top5PlayersByTeam
    const teams = this.state.teams;
    const allPlayers = teams.map(t => t.players).flat();
    const allGSISIds = top5Final.map(p => p.gsisPlayerId);
    // The below is missing 1 player....
    // Essentially, the below trys to pull out player data for all of those players that we have cards for
    const additionalDataForTop5 = allPlayers.filter(p => {
      if (p.references) {
        if (
          p.references.find(
            o => o.origin === "gsis" && allGSISIds.includes(o.id)
          )
        ) {
          return true;
        }
      }
    });
    this.setState({ additionalDataForTop5: additionalDataForTop5 });
  };

  filterAdditionalDataForThatCard = gsis => {
    // This filters down the additional data to that one player... JOSH GORDON IS missing
    return this.state.singlePlayerData.filter(addPData => {
      if (addPData.references.find(o => o.origin === "gsis" && o.id === gsis)) {
        return true;
      }
    })[0];
  };

  render() {
    return (
      <React.Fragment>
        <h1>Player Roster</h1>
        <RosterSegment />
        <Card.Group itemsPerRow={4}>
          {this.state.top5PlayersByTeam.map(p => (
            <NFLPlayerCard
              {...p}
              key={p.id}
              addData={this.filterAdditionalDataForThatCard(p.gsisPlayerId)}
            />
          ))}
        </Card.Group>
      </React.Fragment>
    );
  }
}

export default DataContainer;
