import React from 'react'
import { Card, Icon, } from 'semantic-ui-react'

const statisticsLookup = (typeOfStat, actualStat, props) => props.seasons.find(s=> s.year === 2018 && s.type === "REG").teams[0].statistics[typeOfStat][actualStat]

const touchdownsCalculation = (props) => {
  // if they have any rushing statistics... add receiving and rushing
    if (props.seasons.find(s=> s.year === 2018 && s.type === "REG").teams[0].statistics.rushing){return statisticsLookup("receiving", "touchdowns", props) + statisticsLookup("rushing", "touchdowns", props)} else {return statisticsLookup("receiving", "touchdowns", props)}
}
const brokenTacklesCalculation = (props) => {
    if (props.seasons.find(s=> s.year === 2018 && s.type === "REG").teams[0].statistics.rushing){return statisticsLookup("receiving", "broken_tackles", props) + statisticsLookup("rushing", "broken_tackles", props)} else {return statisticsLookup("receiving", "broken_tackles", props)}
}
const yardsAfterContactCalculation = (props) => {
    if (props.seasons.find(s=> s.year === 2018 && s.type === "REG").teams[0].statistics.rushing){return statisticsLookup("receiving", "yards_after_contact", props) + statisticsLookup("rushing", "yards_after_contact", props)} else {return statisticsLookup("receiving", "yards_after_contact", props)}
}



const WRAdditionalDataFields = (props) => (
    
    <React.Fragment>
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Total TDs: {touchdownsCalculation(props)}
    </a>
  </Card.Content>
  <Card.Content extra>
  <a>
    <Icon name='football ball' />
    Air Yards: {statisticsLookup("receiving", "air_yards", props)}
  </a>
</Card.Content>
  <Card.Content extra>
  <a>
    <Icon name='football ball' />
    Broken Tackles: {brokenTacklesCalculation(props)}
  </a>
</Card.Content>
  <Card.Content extra>
  <a>
    <Icon name='football ball' />
    Dropped Passes: {statisticsLookup("receiving", "dropped_passes", props)}
  </a>
</Card.Content>
  <Card.Content extra>
  <a>
    <Icon name='football ball' />
    Yards After Contact: {yardsAfterContactCalculation(props)}
  </a>
</Card.Content>
  <Card.Content extra>
  <a>
    <Icon name='football ball' />
    Longest Touchdown: {statisticsLookup("receiving", "longest_touchdown", props)}
  </a>
</Card.Content>
</React.Fragment>
)

export default WRAdditionalDataFields