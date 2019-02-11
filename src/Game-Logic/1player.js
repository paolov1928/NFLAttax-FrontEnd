class Player {
  constructor(name) {
    this.name = name
    this.team = null
    this.qb = null
    this.wr = null
    this.rb = null
  }

  computerAssignPlayers = data => {
    let thatTeamData = data.filter(p => p.teamAbbr === this.team)
    this.qb = thatTeamData.find(p => p.position === "QB")
    this.wr = thatTeamData.filter(p => p.position === "WR")[
      Math.floor(Math.random() * 2)
    ]
    this.rb = thatTeamData.filter(p => p.position === "RB")[
      Math.floor(Math.random() * 2)
    ]
  }
}
export default Player
