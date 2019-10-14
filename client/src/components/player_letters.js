import React from 'react';
import {ButtonToolbar, Button, ButtonGroup} from 'reactstrap';


const PlayerLetters = ({player, letters, selectedLetter, onSelectLetter, onUnselectLetter}) => (
  <>
    <ButtonToolbar>
      {letters.map((letter, index) => (
        <ButtonGroup>
          <Button
            active={letter === selectedLetter.letter}
            onClick={() => onSelectLetter(index)}
          >
            {letter}
          </Button>
        </ButtonGroup>
      ))}
    </ButtonToolbar>
  </>
)

export default PlayerLetters
