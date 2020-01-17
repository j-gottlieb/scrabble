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
import Portal from './components/portal';
import Message from './components/message'
import {updateBoard, gameWasJoined, beginGame} from './actions';
import {socket, GAME_UPDATE_EVENT, GAME_JOIN_EVENT, GAME_BEGIN_EVENT} from './constants'

const App = () => {

  const dispatch = useDispatch();

  const {
    activeGameId
  } = useSelector(state => ({
    activeGameId: state.game._id
  }))

  useEffect(() => {

    const onUpdateBoard = game => dispatch(updateBoard(game))
    const onGameWasJoined = game => dispatch(gameWasJoined(game))
    const onBeginGame = game => dispatch(beginGame(game))

    socket.on(GAME_UPDATE_EVENT, game => {
      onUpdateBoard(game)
    })
    socket.on(GAME_JOIN_EVENT, game => {
      onGameWasJoined(game)
    })
    socket.on(GAME_BEGIN_EVENT, game => {
      onBeginGame(game)
    })
  }, [activeGameId, dispatch])

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
            <Portal />
          </Grid>
        </Container>
        <Message />
    </div>
  );
}

export default App;
