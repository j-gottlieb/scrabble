import React from 'react';
import PropTypes from 'prop-types';
import {ButtonToolbar, Button, ButtonGroup} from 'reactstrap';
import {connect} from 'react-redux';
import {handleSelectLetter} from '../actions';
import {getPlayerHand} from '../selectors';


const PlayerLetters = ({onSelectLetter, playerHand, selectedLetterIndex}) => (
  <>
    {playerHand != null &&
      <ButtonToolbar>
        {playerHand.map((letter, index) => (
          <ButtonGroup key={index}>
            <Button
              active={index === selectedLetterIndex}
              onClick={() => onSelectLetter(index)}
            >
              {letter}
            </Button>
          </ButtonGroup>
        ))}
      </ButtonToolbar>
    }
  </>
)

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
