import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import API from "../API";

const returnTheCheerleaderGIFs = () => {
  API.randomGIF("cheerleader-happy", 25);
};

async function WinModal() {
  let response = await API.randomGIF("cheerleader-happy", 25);
  let url = await response.json();

  return (
    <Modal trigger={<Button>Show Modal</Button>}>
      <Modal.Header>Congratulations you won!!</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={url.data[1].images.original.url} />
        <Modal.Description>
          <Header>Winners Win</Header>
          <p>Random quote from the winners section of the quote API</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default WinModal;

// Cheerleader GIFs
