// Always make the API class

class API {
  static init() {
    this.baseURL = "http://localhost:3000"
    this.signinURL = this.baseURL + "/signin"
  }

  static signin(user) {
    return fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    }).then(resp => resp.json())
  }

  static createUser(user) {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(resp => resp.json())
  }

  static validate() {
    const token = localStorage.getItem("token")
    return fetch("http://localhost:3000/validate", {
      headers: {
        Authorization: token
      }
    }).then(resp => resp.json())
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
}

API.init()

export default API
