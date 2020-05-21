import React from 'react';
import {useSelector} from 'react-redux';
import BoardSquare from './board_square'
import {getBoard} from '../selectors'

const styles = {
  height: '604px',
  width: '604px',
  display: 'flex',
  flexWrap: 'wrap',
  // alignContent: 'flex-start',
  border: '2px solid grey',
}

const GameBoard = () => {
  
  const {gameName, board} = useSelector(state => ({
    gameName: state.game.name,
    board: getBoard(state)
  }))

  return (
    <>
      {gameName}
      {board.length > 0 && (
        <div style={{...styles}}>
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
