import React from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './board_square'
import {getBoard} from '../selectors'
import {connect} from 'react-redux'

const GameBoard = props => (
  <>
    {props.board.length > 0 && (
      <div className="board">
          {props.board.map(({letter}, index) => (
            <BoardSquare
              letter={letter}
              index={index}
            />
          ))}
        </div>
      )}
  </>
)

const mapStateToProps = state => ({
  board: getBoard(state)
})

GameBoard.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      letter: PropTypes.string,
      isValidPosition: PropTypes.bool
    })
  ).isRequired,
}

export default connect(mapStateToProps)(GameBoard)
