import socketIOClient from "socket.io-client";

export const getNewGame = playerId => {
  const socket = socketIOClient('localhost:3000');
  socket.emit('new-game', {playerId})
}
