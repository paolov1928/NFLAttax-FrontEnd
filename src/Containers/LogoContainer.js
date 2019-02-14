import React, { Component } from "react"
import NFLLogoCard from "../Components/NFLLogoCard"
import { Card, Segment } from "semantic-ui-react"
import * as usefulObjects from "../Data/usefulObjects"
import InfiniteScroll from "react-infinite-scroll-component"

class LogoContainer extends Component {
  state = {
    teams: usefulObjects.teamsArray,
    currentPick: null
  }

  componentDidMount() {
    this.shuffleCards()
  }

  shuffleCards = () => {
    let teams = this.state.teams
    teams = [...teams].sort(() => Math.random() - 0.5)
    this.setState({ teams })
  }

  toggleCurrentPick = team => {
    this.setState({ currentPick: team })
  }

  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({
        teams: this.state.teams.concat(
          usefulObjects.teamsArray.sort(() => Math.random() - 0.5)
        )
      })
    }, 1000)
  }

  render() {
    return (
      <React.Fragment>
        <Segment>
        <InfiniteScroll
          dataLength={this.state.teams.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h1>The NFL has 32 teams.... so here they are (again)</h1>}
        >
          <Card.Group itemsPerRow={4}>
            {this.state.teams.map((p, i) => (
              <NFLLogoCard
                text={p}
                key={i}
                where={this.props.where}
                toggleCurrentPick={this.toggleCurrentPick}
              />
            ))}
          </Card.Group>
        </InfiniteScroll>
        </Segment>
      </React.Fragment>
    )
  }
}

export default LogoContainer
