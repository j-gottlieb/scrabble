const router = require('express').Router();
const auth = require('../../middleware/auth')

// Games model
const Game = require('../../models/Game');

// @route GET api/games
router.get('/', auth, (req, res) => {
  Game.find()
    .then((games, err) => res.json(games))
    .catch(err => console.log(err))
});

// @route POST api/games
router.post('/', auth, ({body: {board, letterPool}}, res) => {
  const newGame = new Game({board, letterPool})
  console.log(newGame)
  newGame.save()
    .then((games, err) => res.json(games))
    .catch(err => console.log(err))
});

// @route DELETE api/games/:id
router.delete('/:id', auth, (req, res) => {
  Game.findById(req.params.id)
    .then(game => game.remove()
      .then(() => res.json('Game was deleted'))
    )
    .catch(err => res.status(404).json('Game not found'))
});

module.exports = router;
