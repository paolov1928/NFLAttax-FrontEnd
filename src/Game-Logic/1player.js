class Player {
  constructor(name) {
    this.name = name;
    this.team = null;
    this.qb = null;
    this.wr = null;
    this.rb = null;
  }

  computerAssignPlayers = () => {
    return this.name.length;
  };
}
export default Player;
