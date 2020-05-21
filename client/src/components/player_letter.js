import React from 'react';
import {useSelector} from 'react-redux';
import {getPlayerHand} from '../selectors';
import {useDrag} from 'react-dnd';

const style = {
  border: '1px solid gray',
  backgroundColor: '#dbd4b8',
  padding: '0.5rem 1rem',
  cursor: 'move',
  borderRadius: '4px'
}

const PlayerLetter = ({letterIndex}) => {

  const {
    playerHand
  } = useSelector(state => ({
    playerHand: getPlayerHand(state)
  }))

  const [{ opacity }, drag] = useDrag({
    item: { selectedLetterIndex: letterIndex, selectedLetter: playerHand[letterIndex], type: 'letter' },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  return (
    <div key={letterIndex} ref={drag} style={{ ...style, opacity }}>
      {playerHand[letterIndex]}
    </div>
  )
}

export default PlayerLetter
