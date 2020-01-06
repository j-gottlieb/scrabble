import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {handleSelectLetter} from '../actions';
import {getPlayerHand} from '../selectors';

const HAND_QUANTITY = [0,0,0,0,0,0,0]

const PlayerLetters = ({onSelectLetter, playerHand, selectedLetterIndex}) => {
  const handleClick = index => {
    playerHand[index] && onSelectLetter(index)
  }
  return (
    <>
      {playerHand != null &&
          HAND_QUANTITY.map((el, index) => (
              <Button
                key={index}
                variant="contained"
                active={index === selectedLetterIndex}
                onClick={() => handleClick(index)}
              >
                {playerHand[index]}
              </Button>
          ))
      }
    </>
  )
}

const mapStateToProps = state => ({
  playerHand: getPlayerHand(state),
  selectedLetterIndex: state.selectedLetter.index
})

const mapDispatchToProps = dispatch => ({
  onSelectLetter: index => dispatch(handleSelectLetter(index))
})

PlayerLetters.propTypes = {
  onSelectLetter: PropTypes.func.isRequired,
  playerHand: PropTypes.arrayOf(PropTypes.string),
  selectedLetterIndex: PropTypes.number
}

PlayerLetters.defaultProps = {
  playerHand: null,
  selectedLetterIndex: null
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerLetters)
