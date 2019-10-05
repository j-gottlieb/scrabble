import React, {Component} from 'react';
import './App.css';
import {getWordFrequencies, getDictionary, getNewGame} from './service/words.js';
import {signup} from './service/authentication';
import {
  isValidTurn
} from './constants';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './App.css'
import PlayerLetters from './components/player_letters';
import BoardSquare from './components/board_square';
import SignupModal from'./components/signup_modal';
import {Alert, Toast} from 'reactstrap';
import socketIOClient from "socket.io-client";

class App extends Component {
  state = {
    wordFrequencies: [],
    isLoading: false,
    game: {
      _id: null,
      board: null,
      letterPool: null
    },
    playerLetters: [],
    selectedLetter: {
      letter: null,
      index: null
    },
    isInvalidMove: false,
    showSignupModal: false
  }

  submitMove = () => {
    if (!isValidTurn(this.state.game.board)) {
      this.setState({isInvalidMove: true})
      return
    }
    const socket = socketIOClient('localhost:3000');
    const {game, playerLetters} = this.state;
    socket.emit('submit-move', {
      game,
      playerLetters
    })
  }

  sendMessage = () => {
    getDictionary()
  }

  componentDidMount = () => {
    const socket = socketIOClient('localhost:3000');

    socket.on('new-game', this.updateBoard)

    socket.on('game-update', this.updateBoard)
  }

  updateBoard = ({game: {_id, board, letterPool}, newHand}) => {
    const newBoard = board.map(square => {
      if (square.letter === '') {
        return {...square, isValidPosition: true}
      } else {
        return {...square, isValidPosition: false}
      }
    })
    this.setState({game: {_id, board: newBoard, letterPool}, playerLetters: newHand})
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
    if (letter == null || !this.state.game.board[index].isValidPosition) return;
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
            {letter, isValidPosition: true},
            ...prevState.game.board.slice(index + 1)
          ],
        },
        selectedLetter: {letter: null, index: null},
        playerLetters
      }
    })
  }

  onSignup = (username, password) => {
    signup(username, password)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <>
        <button onClick={getNewGame}>New Game</button>
        <button onClick={this.submitMove}>Submit Move</button>
        <button onClick={() => this.setState({showSignupModal: true})}>Sign Up</button>
        {this.state.isInvalidMove &&
          <Toast onClose={() => this.setState({isInvalidMove: false})} show={this.state.isInvalidMove} delay={3000} autohide>
            <Alert variant="warning">
              Oopsy! Make sure you placed only one word and that its touching an existing word!
            </Alert>
          </Toast>
        }
        <PlayerLetters
          letters={this.state.playerLetters}
          onSelectLetter={this.handleSelectLetter}
          onUnselectLetter={this.handleUnSelectLetter}
          selectedLetter={this.state.selectedLetter}
        />
        {this.state.game.board != null &&
          (
            <div className="board">
              {this.getBoardGrid()}
            </div>
          )
        }
        {this.state.showSignupModal &&
          <SignupModal
            onCloseSignupModal={() => this.setState({showSignupModal: false})}
            onSignup={this.onSignup}
          />
        }
      </>
    );
  }
}

export default App;
