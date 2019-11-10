import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {handleInputLetter} from '../actions'

const BoardSquare = ({letter, index, onInputLetter}) => (
  <div
    onClick={e => onInputLetter(e, index)}
    className="board-square"
  >
    <p>{letter}</p>
  </div>
);

const mapDispatchToProps = dispatch => ({
  onInputLetter: (e, index) => dispatch(handleInputLetter(e, index))
})

BoardSquare.propTypes = {
  letter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onInputLetter: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(BoardSquare);
