import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import {
  Container,
  Grid,
  Toolbar
} from '@material-ui/core';
import NavBar from './components/nav_bar'
import GameStats from './components/game_stats';
import GameControls from './components/game_controls';
import GameBoard from './components/game_board';
import Portal from './components/portal';
import {updateBoard, gameWasJoined} from './actions';
import {socket, GAME_UPDATE_EVENT, GAME_JOIN_EVENT} from './constants'

const App = () => {

  const dispatch = useDispatch();

  const onUpdateBoard = game => dispatch(updateBoard(game))
  const onGameWasJoined = game => dispatch(gameWasJoined(game))

  const {
    activeGameId
  } = useSelector(state => ({
    activeGameId: state.game._id
  }))

  useEffect(() => {
    socket.on(GAME_UPDATE_EVENT, game => {
      onUpdateBoard(game)
    })
    socket.on(GAME_JOIN_EVENT, game => {
      onGameWasJoined(game)
    })
  }, [activeGameId])

  return (
    <div>
      <Container>
          <NavBar />
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Toolbar />
            {activeGameId ? (
              <>
                <Grid>
                  <GameStats />
                </Grid>
                <Grid>
                  <GameBoard />
                </Grid>
                <Grid>
                  <GameControls />
                </Grid>
              </>
            ) : (
              <Portal />
            )}
          </Grid>
        </Container>
    </div>
  );
}

export default App;
