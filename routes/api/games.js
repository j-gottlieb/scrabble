const router = require('express').Router();
const auth = require('../../middleware/auth')

// Games model
const Game = require('../../models/Game');

// @route GET api/games
router.get('/', auth, (req, res) => {
  Game.find({isActive: true})
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
router.delete('/:id', (req, res) => {
  Game.findById(req.params.id)
    .then(game => {
      console.log(game._id)
      game.remove()
      .then(() => res.json('Game was deleted'))
    })
    .catch(err => res.status(404).json('Game not found'))
});

// @route DELETE api/games/
router.delete('/', (req, res) => {
  Game.remove({}, (err, data) => {
    res.send('removed docs')
  })
})

module.exports = router;
