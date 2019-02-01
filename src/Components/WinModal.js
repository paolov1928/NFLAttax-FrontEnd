import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

const WinModal = () => (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Congratulations you won!!</Modal.Header>
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src={"https://react.semantic-ui.com/images/avatar/large/rachel.png"}
      />
      <Modal.Description>
        <Header>Winners Win</Header>
        <p>Random quote from the winners section of the quote API</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default WinModal;

// Cheerleader GIFs
