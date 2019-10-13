import React from 'react';
import {ButtonToolbar, Button, ButtonGroup} from 'reactstrap';


const PlayerLetters = ({player, letters, selectedLetter, onSelectLetter, onUnselectLetter}) => (
  <>
    <p>Your Letters: </p>
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

// <ButtonToolbar>
//   <ToggleButtonGroup
//   id='player-letters'
//     type="radio" name="options"
//     value={index}
//   >
//     {letters.map((letter, index) =>
//         <ToggleButton
//           for="player-letters"
//           onClick={() => onSelectLetter(index)}
//           value={index}
//         >
//           {letter}
//         </ToggleButton>
//     )}
//   </ToggleButtonGroup>
// </ButtonToolbar>
