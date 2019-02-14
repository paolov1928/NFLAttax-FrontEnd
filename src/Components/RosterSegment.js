import React from "react"
import { Grid, Header, Segment, Image } from "semantic-ui-react"
import "../Containers/battle.css"

const placeholderUrl =
  "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/PLACEHOLDER.png"

const holdingImage = () => {
  return localStorage.getItem("Pick")
    ? "https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/" +
        localStorage.getItem("Pick") +
        ".svg"
    : placeholderUrl
}

const ifStatement = (props, position) => {
  return props["selected" + position] ? (
    <React.Fragment>
      <Image
        src={
          "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/" +
          props["selected" + position].esbid +
          ".png"
        }
        centered
      />
      <Header>{props["selected" + position].name}</Header>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Image src={placeholderUrl} centered />
      <Header>Click a {position}</Header>
    </React.Fragment>
  )
}

const SelectedTeamAndPlayersGrid = props => (
  <Segment placeholder attached className='rosterSegmentSmallerText'>
    <Grid columns={4} textAlign="center" divided>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Header>Team</Header>
          <Image src={holdingImage()} centered />
        </Grid.Column>
        <Grid.Column>
          <Header>Quarterback</Header>
          {ifStatement(props, "QB")}
        </Grid.Column>
        <Grid.Column>
          <Header>Running Back</Header>
          {ifStatement(props, "RB")}
        </Grid.Column>
        <Grid.Column>
          <Header>Wide Receiver</Header>
          {ifStatement(props, "WR")}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)

export default SelectedTeamAndPlayersGrid
