import React from 'react';
import {useDispatch} from 'react-redux';
import {handleInputLetter} from '../actions'
import { useDrop } from 'react-dnd'

const styles = {
  root: {
    width: '42px',
    height: '42px',
    border: '1px solid grey',
    display: 'flex',
    // textAlign: 'center',
    // verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '-1px',
    padding: '0.5rem 1rem',
  },
  hasTile: {
    backgroundColor: '#dbd4b8',
    borderRadius: '4px' 
  },
  noTile: {

  },
  isOver: {
    backgroundColor: '#D9D9D9'
  }
}

const BoardSquare = ({letter, index}) => {
  const dispatch = useDispatch();
  const onInputLetter = (item, index) => dispatch(handleInputLetter(item, index))
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'letter',
    drop: (item) => onInputLetter(item, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const getStyles = () => {
    let tileStyle = {}
    if (letter !== '') {
      tileStyle = {...styles.hasTile}
    } else if (isOver) {
      tileStyle = {...styles.isOver}
    } else {
      tileStyle = {...styles.noTile}
    }
    return {
      ...styles.root,
      ...tileStyle
    }
  }
  return (
    <div ref={drop} style={getStyles()}>
      <p>{letter}</p>
    </div>
)
};

export default BoardSquare;
