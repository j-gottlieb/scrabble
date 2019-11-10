import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getIsPlayerTurn} from '../selectors';
import {submitMove, getNewGame} from '../service/game';

const GameControls = props => (
  <>
    <Button onClick={() => getNewGame(props.playerId)}>New Game</Button>
    {
      props.isActiveGame && (
        (props.isPlayerTurn) ? (
            <Button onClick={() => submitMove(props.gameState)}>Submit Move</Button>
        ) : (
          <p>Wait your turn!</p>
        )
      )
    }
  </>
);

const mapStateToProps = state => ({
  isActiveGame: state.game.board.length > 0,
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
