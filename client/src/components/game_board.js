import React from 'react';
import {useSelector} from 'react-redux';
import BoardSquare from './board_square'
import {getBoard} from '../selectors'

const GameBoard = () => {
  
  const {gameName, board} = useSelector(state => ({
    gameName: state.game.name,
    board: getBoard(state)
  }))

  return (
    <>
      {gameName}
      {board.length > 0 && (
        <div className="board">
            {board.map(({letter}, index) => (
              <BoardSquare
                key={index}
                letter={letter}
                index={index}
              />
            ))}
          </div>
        )}
    </>
  );
}

export default GameBoard
