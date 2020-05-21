import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getIsPlayerTurn, getPlayerHand} from '../selectors';
import {submitMove} from '../service/game';
import {handleShuffleLetters, handleRetractPlayedLetters} from '../actions';
import PlayerLetter from './player_letter';
import {Button, ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const HAND_QUANTITY = [0,0,0,0,0,0,0]

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  tiles: {
    display: 'flex'
  }
}));

const GameControls = () => {

  const {gameState, isPlayerTurn} = useSelector(state => ({
    gameState: {
      playerHand: getPlayerHand(state),
      game: state.game,
      playerId: state.playerInfo.id
    },
    isPlayerTurn: getIsPlayerTurn(state)
}))

  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <div className={classes.tiles} >
        {
          HAND_QUANTITY.map((el, index) => (
            <PlayerLetter
              letterIndex={index}
            />
          ))
        }
      </div>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={() => dispatch(handleShuffleLetters())}>Shuffle</Button>
        <Button disabled={isPlayerTurn} onClick={() => submitMove(gameState)}>Submit Move</Button>
        <Button onClick={() => dispatch(handleRetractPlayedLetters())}>Retract Letters</Button>
      </ButtonGroup>
    </div>
  );
}

export default GameControls
