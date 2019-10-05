import React from 'react';
// import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'reactstrap';


const PlayerLetters = ({player, letters, selectedLetter: {letter, index}, onSelectLetter, onUnselectLetter}) => (
  <>
    <p>Your Letters: </p>

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
