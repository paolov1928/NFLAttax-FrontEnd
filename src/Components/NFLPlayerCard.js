import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import * as usefulObject from '../Data/usefulObjects'
import QBAdditionalDataFields from './QBAdditionalDataFields'
import RBAdditionalDataFields from './RBAdditionalDataFields'
import WRAdditionalDataFields from './WRAdditionalDataFields'

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

function convertInches(inches) {
  let feetFromInches = Math.floor(inches / 12);//There are 12 inches in a foot
  let inchesRemainder = inches % 12;

  let result = feetFromInches + "'-" + inchesRemainder + "\"";
  return result;
}
function renderAdditionalDataBasedOnPosition(position, addData) {
  if (position === "QB") { return <QBAdditionalDataFields {...addData} />}
  else if (position === "RB") {return <RBAdditionalDataFields {...addData} />}
  else {return <WRAdditionalDataFields {...addData} />}
}


const draftDetails = (addData) => {
  if (addData.draft) {
    return <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Draft: Round: {addData.draft.round}, Pick: {addData.draft.number}
    </a>
  </Card.Content>
  } else { return <Card.Content extra>
    <a>
      <Icon name='football ball' />
      Draft: Undrafted
    </a>
  </Card.Content> }
}


const NFLPlayerCard = ({name, position, teamAbbr, seasonPts, esbid, stats, addData}) => (


  <Card>
    <Image src={'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+esbid+'.png'} centered />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>
        <span className='date'>{usefulObject.positionAliasToFull[position]}</span>
      </Card.Meta>
      <Card.Description>{usefulObject.aliasToFullName[teamAbbr]}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='football ball' />
        Fantasy Points: {Math.round(seasonPts)}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='football ball' />
        Height: {convertInches(addData.height)}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='football ball' />
        Weight: {Math.round(addData.weight)} lbs
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='football ball' />
        Age: {getAge(addData.birth_date)} years
      </a>
    </Card.Content>
    {draftDetails(addData)}
    {renderAdditionalDataBasedOnPosition(position, addData)}
  </Card>
)

export default NFLPlayerCard
