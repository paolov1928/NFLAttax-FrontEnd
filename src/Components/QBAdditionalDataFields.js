import React from 'react'
import { Card, Icon,} from 'semantic-ui-react'

const statisticsLookup = (typeOfStat, actualStat, props) => props.seasons.find(s=> s.year === 2018 && s.type === "REG").teams[0].statistics[typeOfStat][actualStat]
// Maybe should make this a find for all instances of the key of (actualStat e.g. touchdowns over all typeOfStat
// Need to make sure it picks up all teams ... like CJ anderson changed teams. Use a Reduce


const QBAdditionalDataFields = (props) => (
    <React.Fragment>
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Total TDs: {statisticsLookup("passing", "touchdowns", props) + statisticsLookup("rushing", "touchdowns", props)}
    </a>
  </Card.Content>
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Red Zone Attempts: {statisticsLookup("passing", "redzone_attempts", props) + statisticsLookup("rushing", "redzone_attempts", props)}
    </a>
  </Card.Content>
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Avg Passing Yards: {statisticsLookup("passing", "avg_yards", props)}
    </a>
  </Card.Content>
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      QB Rating: {statisticsLookup("passing", "rating", props)}
    </a>
  </Card.Content>
  
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Sack Yards: {statisticsLookup("passing", "sack_yards", props)}
    </a>
  </Card.Content>
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Poor Throws: {statisticsLookup("passing", "poor_throws", props)}
    </a>
  </Card.Content>
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Average Pocket Time: {statisticsLookup("passing", "avg_pocket_time", props)}
    </a>
  </Card.Content>
    <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Longest Passing TD: {statisticsLookup("passing", "longest_touchdown", props)}
    </a>
  </Card.Content>
  </React.Fragment>
)

export default QBAdditionalDataFields
