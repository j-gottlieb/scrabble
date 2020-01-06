import React from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './board_square'
import {getBoard} from '../selectors'
import {connect} from 'react-redux'

const GameBoard = props => (
  <>
    {props.gameName}
    {props.board.length > 0 && (
      <div className="board">
          {props.board.map(({letter}, index) => (
            <BoardSquare
              key={index}
              letter={letter}
              index={index}
            />
          ))}
        </div>
      )}
  </>
)

const mapStateToProps = state => ({
  gameName: state.game.name,
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
