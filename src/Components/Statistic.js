import React from "react"
import { Card, Icon } from "semantic-ui-react"
import { withRouter } from "react-router-dom"

const Statistic = props => (
  <Card.Content
    extra
    onClick={() => {
      props.compareStatistic(Object.keys(props)[0], props.comparison)
      props.toggleFade()
    }}
  >
    <a>
      <Icon name={"angle double " + props.comparison} />
      {Object.keys(props)[0] + ": " + Object.values(props)[0]}
    </a>
  </Card.Content>
)

export default withRouter(Statistic)
