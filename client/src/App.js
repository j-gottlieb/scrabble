import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {getNewGame} from'./service/game.js';
import {signUp, signIn} from './service/authentication';
import PlayerLetters from './components/player_letters';
import BoardSquare from './components/board_square';
import AuthModal from'./components/auth_modal';
import {Alert, Toast, Container, Row, Col} from 'reactstrap';
import socketIOClient from "socket.io-client";
import NavBar from './components/nav_bar'
import GameStats from './components/game_stats';
import GameControls from './components/game_controls';

class App extends Component {
  state = {
    wordFrequencies: [],
    isLoading: false,
    playerInfo: {
      id: null,
      token: null,
      username: ''
    },
    game: {
      _id: null,
      board: null,
      letterPool: null,
      words: []
    },
    playerLetters: [],
    selectedLetter: {
      letter: null,
      index: null
    },
    players: {},
    isInvalidMove: false,
    authMessage: '',
    showSignupModal: false,
    showSigninModal: false,
  }

  submitMove = () => {
    const socket = socketIOClient('localhost:3000');
    const {game, playerLetters, playerInfo} = this.state;
    socket.emit('submit-move', {
      game,
      playerLetters,
      playerId: playerInfo.id
    })
  }

  componentDidMount = () => {
    const socket = socketIOClient('localhost:5000');

    socket.on('new-game', this.updateBoard)

    socket.on('game-update', this.updateBoard)
  }

  updateBoard = ({game: {_id, board, letterPool, words}, newHand, playerId}) => {
    const newBoard = board.map(square => {
      if (square.letter === '') {
        return {...square, isValidPosition: true}
      } else {
        return {...square, isValidPosition: false}
      }
    })
    this.setState(prevState => {
      return {
        game: {_id, board: newBoard, letterPool, words},
        playerLetters: newHand
      }
    })
  }

  getBoardGrid = () =>
    this.state.game.board.map(({letter}, index) => (
        <BoardSquare
          letter={letter}
          index={index}
          onInputLetter={this.handleInputLetter}
        />
      )
    );

  handleSelectLetter = index => {
    this.setState(prevState => {
      if (prevState.selectedLetter.index === index) {
        return {selectedLetter: {letter: null, index: null}}
      } else {
        const newLetter = prevState.playerLetters[index]
        return {selectedLetter: {letter: newLetter, index}}
      }
    })
  }

  handleInputLetter = (e, index) => {
    const {letter, index: selectedLetterIndex} = this.state.selectedLetter
    if (!this.state.game.board[index].isValidPosition) return;

    if (letter == null && this.state.game.board[index].letter !== '' && this.state.game.board[index].isValidPosition) {
      this.setState(prevState => {
        const playerLetters = [...prevState.playerLetters, this.state.game.board[index].letter];
        return {
          game: {
            ...prevState.game,
            board: [
              ...prevState.game.board.slice(0, index),
              {...prevState.game.board[index], letter: ''},
              ...prevState.game.board.slice(index + 1)
            ],
          },
          selectedLetter: {letter: null, index: null},
          playerLetters
        }
      })
    } else {
      this.setState(prevState => {
        const playerLetters = [...prevState.playerLetters]
        if (prevState.game.board[index].letter === '') {
          playerLetters.splice(selectedLetterIndex, 1)
        } else {
          playerLetters.splice(selectedLetterIndex, 1, prevState.game.board[index].letter)
        }
        return {
          game: {
            ...prevState.game,
            board: [
              ...prevState.game.board.slice(0, index),
              {...prevState.game.board[index], letter},
              ...prevState.game.board.slice(index + 1)
            ],
          },
          selectedLetter: {letter: null, index: null},
          playerLetters
        }
      })
    }
  }

  onSignup = (username, password) => {
    signUp(username, password)
      .then(res => {
        console.log(res)
        this.setState({
          playerInfo: {
            token: res.token,
            id: res.id
          }
        })
      })
      .catch(({message}) => {
        this.setState({authMessage: message})
      })
  }

  onSignin = (username, password) => {
    signIn(username, password)
      .then(({token, user: {id, username}}) => {
        this.setState({
          playerInfo: {
            token,
            id,
            username,
            authMessage: ''
          }
        })
        this.showAuthModal('showSigninModal', false)
      })
      .catch(({message}) => {
        this.setState({authMessage: message})
      })
  }

  showAuthModal = (whichModal, shouldShow) => {
    this.setState({
      [whichModal]: shouldShow
    })
  }

  onGetNewGame = () => {
    getNewGame(this.state.playerInfo.id)
  }

  getBoardGrid = () =>
    this.state.game.board.map(({letter}, index) => (
        <BoardSquare
          letter={letter}
          index={index}
          onInputLetter={this.handleInputLetter}
        />
      )
    );

    getPlayerWords = () =>
      this.state.game.words.reduce((allWords, {word, playerId, score}) => {
        allWords[playerId] = allWords[playerId]
        ? [...allWords[playerId], {word, score}]
        : [{word, score}]
        return allWords
      }, {})

  render() {
    return (
      <>
      <NavBar
        newGame={this.onGetNewGame}
        submitMove={this.submitMove}
        toggleSignUp={() => this.showAuthModal('showSignupModal', true)}
        toggleSignIn={() => this.showAuthModal('showSigninModal', true)}
        username={this.state.playerInfo.username}
      />
        {this.state.isInvalidMove &&
          <Toast onClose={() => this.setState({isInvalidMove: false})} show={this.state.isInvalidMove} delay={3000} autohide>
            <Alert variant="warning">
              Oopsy! Make sure you placed only one word and that its touching an existing word!
            </Alert>
          </Toast>
        }
        {this.state.playerInfo.id &&
          <GameControls
            onNewGame={this.onGetNewGame}
            onSubmitMove={this.submitMove}
          />
        }
        {this.state.game._id != null &&
          <PlayerLetters
            letters={this.state.playerLetters}
            onSelectLetter={this.handleSelectLetter}
            onUnselectLetter={this.handleUnSelectLetter}
            selectedLetter={this.state.selectedLetter}
          />
        }
        <Container>
          <Row>
            <Col>
              {this.state.game.board != null &&
                (
                  <div className="board">
                    {this.getBoardGrid()}
                  </div>
                )
              }
            </Col>
            <Col>
              <GameStats
                players={this.getPlayerWords()}
              />
            </Col>
          </Row>
        </Container>
        <AuthModal
          isSignIn={false}
          showAuthModal={this.state.showSignupModal}
          onCloseAuthModal={() => this.showAuthModal('showSignupModal', false)}
          authSubmission={this.onSignup}
          message={this.state.authMessage}
        />
        <AuthModal
          isSignIn={true}
          showAuthModal={this.state.showSigninModal}
          onCloseAuthModal={() => this.showAuthModal('showSigninModal', false)}
          authSubmission={this.onSignin}
          message={this.state.authMessage}
        />
      </>
    );
  }
}

export default App;
