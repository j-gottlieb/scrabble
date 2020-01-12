const Game = require('../models/Game');

// Set hasBegun to true
const beginGame = async (gameId) => {
    const game = await Game.findOneAndUpdate(
        {_id: gameId}, {$set: {hasBegun: true}}, {new: true}
    ).exec();
    return game;
}

module.exports = beginGame;
