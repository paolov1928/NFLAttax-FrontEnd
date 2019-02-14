// Always make the API class

class API {
  static init() {
    this.baseURL = "https://fantasy-football-top-trumps-bk.herokuapp.com"
    this.signinURL = this.baseURL + "/signin"
  }

  static signin(user) {
    return fetch(
      "https://fantasy-football-top-trumps-bk.herokuapp.com/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password
        })
      }
    ).then(resp => resp.json())
  }

  static createUser(user) {
    return fetch("https://fantasy-football-top-trumps-bk.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(resp => resp.json())
  }

  static validate() {
    const token = localStorage.getItem("token")
    return fetch(
      "https://fantasy-football-top-trumps-bk.herokuapp.com/validate",
      {
        headers: {
          Authorization: token
        }
      }
    ).then(resp => resp.json())
  }

  static randomGIF(query, number) {
    return fetch(
      "https://api.giphy.com/v1/gifs/search?q=" +
        query +
        "&api_key=" +
        process.env.REACT_APP_GIPHY_API_KEY +
        "&limit=" +
        number
    ).then(r => r.json())
  }

  static randomQuote(query) {
    return fetch("http://quotes.rest/qod.json?category=" + query).then(r =>
      r.json()
    )
  }

  static findUsers = () => {
    return fetch(
      "https://fantasy-football-top-trumps-bk.herokuapp.com/users"
    ).then(r => r.json())
  }

  static postResult = (iD, yourTeam, opponentTeam, won) => {
    return fetch("https://fantasy-football-top-trumps-bk.herokuapp.com/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: iD,
        yourTeam: yourTeam,
        opponentTeam: opponentTeam,
        won: won
      })
    }).then(resp => resp.json())
  }
}

API.init()

export default API
