const Game = require('../models/Game');
const {getPlayerLetters} = require('../game_logic/turn_management');

/**
 * If player does not exist, add them to players array and return game
 * If player does exist, just return game
 */
const joinGame = async (gameId, playerId) => {
    const game = await Game.findOne({_id: gameId}).exec();
    const includesCurrentPlayer = game.players.some((player) => playerId == player.playerId)
    if (includesCurrentPlayer) {
        return game  
    } else {
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
        // const updatedGame =
        //     await Game.findOneAndUpdate(
        //         {_id: gameId},
        //         {
        //             letterPool: newLetterPool,
        //             $push: {
        //                 players: {
        //                     playerId, isOwner: false, isCurrentTurn: false
        //                 },
        //                 hands: {
        //                     hand: newHand,
        //                     playerId
        //                 }
        //             }
        //         },
        //         {new: true, useFindAndModify: false})
        //         .exec()
        //         console.log(updatedGame)
        console.log(game)
        return game     
    }
}

module.exports = joinGame