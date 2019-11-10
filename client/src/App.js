import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {connect} from 'react-redux'
import PlayerLetters from './components/player_letters';
import AuthModal from'./components/auth_modal';
import {Container, Row, Col} from 'reactstrap';
import socketIOClient from "socket.io-client";
import NavBar from './components/nav_bar'
import GameStats from './components/game_stats';
import GameControls from './components/game_controls';
import GameBoard from './components/game_board';
import ActiveGames from './components/active_games';
import {updateBoard, playerJoinedGame} from './actions';

class App extends Component {

  componentDidMount = () => {

    const socket = socketIOClient('localhost:5000');

    socket.on('new-game', this.props.updateBoard)

    socket.on('game-update', this.props.updateBoard)

    socket.on('player-joined-game', this.props.playerJoinedGame)
  }

  render() {
    return (
      <>
      <NavBar />
      <ActiveGames />
        {this.props.playerInfo.id &&
          <GameControls />
        }
        <PlayerLetters />
        <Container>
          <Row>
            <Col>
              <GameBoard />
            </Col>
            <Col>
              <GameStats />
            </Col>
          </Row>
        </Container>
        <AuthModal />
      </>
    );
  }
}

const mapStateToProps = ({showSignInModal, showSignUpModal, playerInfo}) => ({
  showSignInModal,
  showSignUpModal,
  playerInfo
})

const mapDispatchToProps = dispatch => ({
  updateBoard: newGame => dispatch(updateBoard(newGame)),
  playerJoinedGame: game => dispatch(playerJoinedGame(game))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
