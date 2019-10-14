import React from 'react';
import {Button} from 'reactstrap';

const GameControls = props => (
  <>
    <Button onClick={props.onNewGame}>New Game</Button>
    <Button onClick={props.onSubmitMove}>Submit Move</Button>
  </>
);

export default GameControls
