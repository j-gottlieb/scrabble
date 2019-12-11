import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {connect} from 'react-redux'
import PlayerLetters from './components/player_letters';
import AuthModal from'./components/auth_modal';
import {Container, Row, Col} from 'reactstrap';
import NavBar from './components/nav_bar'
import GameStats from './components/game_stats';
import GameControls from './components/game_controls';
import GameBoard from './components/game_board';
import ActiveGames from './components/active_games';
import {updateBoard} from './actions';
import {socket, GAME_UPDATE_EVENT} from './constants'

class App extends Component {

  componentDidMount = () => {
      socket.on(GAME_UPDATE_EVENT, game => {
        this.props.updateBoard(game)
      })
  }

  render() {
    return (
      <>
      <NavBar />
      <ActiveGames />
        {this.props.playerInfo.id &&
          <GameControls />
        }
        {this.props.activeGameId &&
          <PlayerLetters />
        }
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

const mapStateToProps = state => ({
  showSignInModal: state.showSignInModal,
  showSignUpModal: state.showSignUpModal,
  playerInfo: state.playerInfo,
  activeGameId: state.selectedGameId
})

const mapDispatchToProps = dispatch => ({
  updateBoard: newGame => dispatch(updateBoard(newGame))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
