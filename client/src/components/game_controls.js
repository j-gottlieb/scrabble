import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getIsPlayerTurn, getIsActiveGame} from '../selectors';
import {submitMove} from '../service/game';
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

const GameControls = props => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <PlayerLetters />
      {
        (props.isPlayerTurn) ? (
            <Button onClick={() => submitMove(props.gameState)}>Submit Move</Button>
        ) : (
          <p>Wait your turn!</p>
        )
      }
      </ButtonGroup>
    </div>
  );
}

const mapStateToProps = state => ({
  isActiveGame: getIsActiveGame(state),
  gameState: {
    game: state.game,
    playerId: state.playerInfo.id
  },
  playerId: state.playerInfo.id,
  isPlayerTurn: getIsPlayerTurn(state)
})

GameControls.propTypes = {
  isActiveGame: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(GameControls)
