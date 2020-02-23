import React from 'react';
import {useDispatch} from 'react-redux';
import {handleInputLetter} from '../actions'

const BoardSquare = ({letter, index}) => {
  const dispatch = useDispatch();
  const onInputLetter = (e, index) => dispatch(handleInputLetter(e, index))

  return (
    <div
      onClick={e => onInputLetter(e, index)}
      className="board-square"
    >
      <p>{letter}</p>
    </div>
  )
};

export default BoardSquare;
