const Game = require('../models/Game');
const User = require('../models/User');
const {getPlayerLetters} = require('../game_logic/turn_management');

/**
 * If player does not exist, add them to players array and return game
 * If player does exist, just return game
 */
const joinGame = async (gameId, playerId) => {
    const game = await Game.findOne({_id: gameId}).exec();
    const includesCurrentPlayer = game.players.some((player) => playerId == player.playerId)
    if (!includesCurrentPlayer) {
        const {newHand, newLetterPool} = getPlayerLetters([], game.letterPool)
        game.players.push({
            playerId,
            isOwner: false
        })
        game.hands.push({
            letters: newHand,
            playerId
        })
        game.letterPool = newLetterPool
        game.save()
    }
    const playerIds = game.players.map(({playerId}) => playerId);
    const players = await User.find({_id: { $in: playerIds}}, '_id username').exec();
    // TODO select only the fields i need!
    return {game, players}
}

module.exports = joinGame
