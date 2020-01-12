import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from '@material-ui/core';
import {handleSelectLetter} from '../actions';
import {getPlayerHand} from '../selectors';

const HAND_QUANTITY = [0,0,0,0,0,0,0]

const PlayerLetters = () => {

  const {
    playerHand, 
    selectedLetterIndex
  } = useSelector(state => ({
    playerHand: getPlayerHand(state),
    selectedLetterIndex: state.selectedLetter.index
  }))

  const dispatch = useDispatch();

  const handleClick = index => {
    playerHand[index] && dispatch(handleSelectLetter(index))
  }

  return (
    <>
      {playerHand != null &&
          HAND_QUANTITY.map((el, index) => (
              <Button
                key={index}
                variant="contained"
                active={index === selectedLetterIndex ? 1 : 0}
                onClick={() => handleClick(index)}
              >
                {playerHand[index]}
              </Button>
          ))
      }
    </>
  )
}

export default PlayerLetters
