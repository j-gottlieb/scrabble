import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getIsPlayerTurn} from '../selectors';
import {submitMove} from '../service/game';
import {handleShuffleLetters} from '../actions';
import PlayerLetters from './player_letters';
import {Button, ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const GameControls = () => {

  const {gameState, isPlayerTurn} = useSelector(state => ({
    gameState: {
      game: state.game,
      playerId: state.playerInfo.id
    },
    isPlayerTurn: getIsPlayerTurn(state)
}))

  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <PlayerLetters />
        <Button onClick={() => dispatch(handleShuffleLetters())}>Shuffle</Button>
        {
          (isPlayerTurn) ? (
              <Button onClick={() => submitMove(gameState)}>Submit Move</Button>
          ) : (
            <p>Wait your turn!</p>
          )
        }
      </ButtonGroup>
    </div>
  );
}

export default GameControls
