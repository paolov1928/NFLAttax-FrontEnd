class Player {
  constructor(name) {
    this.name = name;
    this.team = null;
    this.qb = null;
    this.wr = null;
    this.rb = null;
  }

  filterAdditionalDataForThatCard = (gsis, addData) => {
    // This filters down the additional data to that one player... JOSH GORDON IS missing
    return addData.filter(addPData => {
      if (addPData.references.find(o => o.origin === "gsis" && o.id === gsis)) {
        return true;
      }
    })[0];
  };

  computerAssignPlayers = (data, addData) => {
    let thatTeamData = data.filter(p => p.teamAbbr === this.team);
    this.qb = thatTeamData.filter(p => p.position === "QB");
    const qbGSIS = this.qb[0].gsisPlayerId;
    this.qb.push(this.filterAdditionalDataForThatCard(qbGSIS, addData));
    this.wr = [];
    this.wr.push(
      thatTeamData.filter(p => p.position === "WR")[
        Math.floor(Math.random() * 2)
      ]
    );
    const wrGSIS = this.wr[0].gsisPlayerId;
    this.wr.push(this.filterAdditionalDataForThatCard(wrGSIS, addData));
    this.rb = [];
    this.rb.push(
      thatTeamData.filter(p => p.position === "RB")[
        Math.floor(Math.random() * 2)
      ]
    );
    const rbGSIS = this.rb[0].gsisPlayerId;
    this.rb.push(this.filterAdditionalDataForThatCard(rbGSIS, addData));
  };
}
export default Player;
