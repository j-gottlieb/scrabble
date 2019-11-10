const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Games model
const User = require('../../models/User');

// @route post api/users
// register new user
router.post('/', (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400).send('Please provide both a username and password')
  }

  User.findOne({username})
    .then(user => {
      if (user) return res.status(400).send(`${username} is taken`)

      const newUser = new User({username, password});

      // create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(({id, username}) => {
              jwt.sign(
                { id },
                config.get('jwtSecret'),
                { expiresIn: 3600},
                (err, token) => {
                  if (err) throw err;
                  
                  //get active games
                  Game.find({isActive: true}, (err, activeGames) => {
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        username: user.username
                      },
                      activeGames
                    })
                  })
                }
              )
            })
        })
      })
    })
});

module.exports = router;
