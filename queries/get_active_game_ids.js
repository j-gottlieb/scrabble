const mongoose = require('mongoose');
const Game = require('../models/Game');

const getActiveGameIds = async () => {
    const activeGames = await Game.find({isActive: true}).select('_id')
    return activeGames
}

module.exports = getActiveGameIds