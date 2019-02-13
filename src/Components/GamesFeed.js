import React from "react"
import { Feed } from "semantic-ui-react"
import Helmet from "../Images/helmet-icon.png"
import Trophy from "../Images/trophy2.png"
import * as usefulObject from "../Data/usefulObjects"

const helmet = Helmet
const trophy = Trophy

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000
  var msPerHour = msPerMinute * 60
  var msPerDay = msPerHour * 24
  var msPerMonth = msPerDay * 30
  var msPerYear = msPerDay * 365

  var elapsed = current - previous

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago"
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago"
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago"
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago"
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago"
  }
}

const renderPreviousGames = props => {
  if (props.userInfo) {
    if (props.userInfo.games.length > 0) {
      return props.userInfo.games.reverse().map((g, i) => {
        const howLongAgo = timeDifference(new Date(), new Date(g.created_at))
        const wonOrLoss = g.won ? "won" : "lost"
        return (
          <Feed.Event
            key={i}
            image={g.won ? trophy : helmet}
            date={howLongAgo}
            summary={
              "You " +
              wonOrLoss +
              ", playing with the " +
              usefulObject.aliasToFullName[g.yourTeam]
            }
            extraText={
              "against the " + usefulObject.aliasToFullName[g.opponentTeam]
            }
          />
        )
      })
    } else {
      return (
        <Feed.Event
          image={helmet}
          summary={"What are you looking at?! Get playing!!"}
        />
      )
    }
  } else {
    return (
      <Feed.Event
        image={helmet}
        summary={"What are you looking at?! Get playing!!"}
      />
    )
  }
}

const GamesFeed = props => <Feed>{renderPreviousGames(props)}</Feed>

export default GamesFeed
