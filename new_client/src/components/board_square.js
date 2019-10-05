import React from 'react'

const BoardSquare = ({letter, index, onInputLetter}) => (
  <div
    onClick={e => onInputLetter(e, index)}
    className="board-square"
  >
    <p>{letter}</p>
  </div>
);

export default BoardSquare;
