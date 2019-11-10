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
          <ButtonGroup>
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
  playerHand: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedLetterIndex: PropTypes.number.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerLetters)
