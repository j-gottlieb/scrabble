import wretch from 'wretch';
import socketIOClient from "socket.io-client";

export const getWordFrequencies = () =>
  wretch('http://localhost:3000/word_frequencies')
    .get()
    .json()

export const getDictionary = () => {
  const socket = socketIOClient('localhost:3000');
  socket.emit('client-message', 'client-message')
}

export const getNewGame = () => {
  const socket = socketIOClient('localhost:3000');
  socket.emit('new-game', 'Creating new game')
}
