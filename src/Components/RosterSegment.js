import React from "react";
import { Grid, Header, Segment, Image } from "semantic-ui-react";

const placeholderUrl =
  "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/PAOLO.png";

const holdingImage = () => {
  // if they have made a pick then show their team.. should always happen but dont want it to break.
  return localStorage.getItem("Pick")
    ? "https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/" +
        localStorage.getItem("Pick") +
        ".svg"
    : placeholderUrl;
};
const quarterBackHoldingImage = props => {
  return props.selectedQB
    ? "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/" +
        props.selectedQB +
        ".png"
    : placeholderUrl;
};
const wideReceiverHoldingImage = props => {
  return props.selectedWR
    ? "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/" +
        props.selectedWR +
        ".png"
    : placeholderUrl;
};
const runningBackHoldingImage = props => {
  return props.selectedRB
    ? "http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/" +
        props.selectedRB +
        ".png"
    : placeholderUrl;
};

const SegmentExamplePlaceholderGrid = props => (
  <Segment placeholder attached>
    <Grid columns={4} textAlign="center" divided>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Header>Team</Header>
          <Image src={holdingImage()} centered />
        </Grid.Column>
        <Grid.Column>
          <Header>Quarterback</Header>
          <Image src={quarterBackHoldingImage(props)} centered />
        </Grid.Column>
        <Grid.Column>
          <Header>Running Back</Header>
          <Image src={runningBackHoldingImage(props)} centered />
        </Grid.Column>
        <Grid.Column>
          <Header>Wide Receiver</Header>
          <Image src={wideReceiverHoldingImage(props)} centered />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default SegmentExamplePlaceholderGrid;
