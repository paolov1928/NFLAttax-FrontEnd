import React from "react"
import { Card, Icon } from "semantic-ui-react"
import { withRouter } from "react-router-dom"

const Statistic = props => (
  <Card.Content extra>
    <a>
      <Icon name={"angle double " + props.comparison} />
      {Object.keys(props)[0] + ": " + Object.values(props)[0]}
    </a>
  </Card.Content>
)

export default withRouter(Statistic)
