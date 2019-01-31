class NFLApi {
  static fetchPlayerStats (){
    return fetch("http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2018&format=json").then(r => r.json())
  }

}

export default NFLApi
