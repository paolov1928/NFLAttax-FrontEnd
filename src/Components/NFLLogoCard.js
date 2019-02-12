import React from "react"
import { Card, Image } from "semantic-ui-react"
import * as usefulObject from "../Data/usefulObjects"
import { withRouter } from "react-router-dom"
import { toast } from "react-semantic-toasts"

const handleClick = props => {
  if (props.where === "/Pick") {
    localStorage.setItem("Pick", props.text)
    toast({
      title:
        "Great choice picking the " +
        usefulObject.aliasToFullName[props.text] +
        "!",
      icon: "football ball",
      time: 5000
    })
    props.history.push("/Opponent")
    window.scrollTo(0, 0)
  } else if (props.where === "/Opponent") {
    localStorage.setItem("Opponent", props.text)
    toast({
      title:
        "You will be facing the " +
        usefulObject.aliasToFullName[props.text] +
        "!",
      icon: "football ball",
      time: 5000
    })
    props.history.push("/NewData")
    window.scrollTo(0, 0)
  } else {
    console.log("Didnt work!!")
  }
}

const NFLLogoCard = props => (
  <Card onClick={() => handleClick(props)}>
    <Image
      src={
        "https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/" +
        props.text +
        ".svg"
      }
    />
    <Card.Content>
      <Card.Header textAlign="center">
        {usefulObject.aliasToFullName[props.text]}
      </Card.Header>
    </Card.Content>
  </Card>
)

export default withRouter(NFLLogoCard)
