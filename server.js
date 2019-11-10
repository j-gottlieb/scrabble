const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const config = require('config');
const socketIO = require('socket.io')
const http = require('http')

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

const Game = require('./models/Game');

// Queries
const saveNewGame = require('./queries/new_game');
const joinGame = require('./queries/join_game');
const submitMove = require('./queries/submit_move');

// CSV upload
const json2csv = require('json2csv');
const csv = require('fast-csv');
const fileUpload = require('express-fileupload');
const Joi = require('joi');
const {WordFrequency} = require('./models/WordFrequency')
app.use(fileUpload());

// Bodyparser Middleware
app.use(express.json());

app.use(cors());

// DB config
const db = config.get('mongoURI');

// Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/games', require('./routes/api/games'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

io.on('connection', client => {
  // CREATE GAME
  client.on('new-game', ({playerId}) => {
    saveNewGame(playerId)
      .then(game => {
        io.sockets.emit('new-game', game);
      })
  })

  // JOIN GAME
  client.on('join-game', ({gameId, playerId}) => {
    joinGame(gameId, playerId)
      .then(game => {
        io.sockets.emit('player-joined-game', game)
      })
  })

  // SUBMIT MOVE
  client.on('submit-move', ({game, playerId}) => {
    submitMove(game, playerId)
      .then(response => {
        console.log(response)
        io.sockets.emit('game-update', response);
      })
  })

  client.on('disconnect', () => {
    console.log('user diconnected')
  })
});

app.post('/word_frequencies', (req, res) => {
  console.log(req.file, 'upload')
  if (!req.files)
        return res.status(400).send('No files were uploaded.');
    const wordFrequenciesFile = req.files.word_frequencies;
    const wordFrequencies = [];

    csv
     .fromString(wordFrequenciesFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", (data) => {
         data['_id'] = new mongoose.Types.ObjectId();
         wordFrequencies.push(data);
     })
     .on("end", () => {
         WordFrequency.collection.insert(wordFrequencies, (err, documents) => {
            if (err) throw err;
         });
         res.send(wordFrequencies.length + ' wordFrequencies have been successfully uploaded.');
     });
})

app.get('/word_frequencies/:word', (req, res) => {
  const word = req.params.word
  WordFrequency.findOne({word}, (err, data) => {
    console.log(data, err)
    if (err) {
      console.log(err, 'err')
    } else {
      console.log(data)
      res.send(data)
    }
  })
});
app.get('/word_frequencies', (req, res) => {
  const word = req.params.word
  WordFrequency.find({}, (err, data) => {
    console.log(data, err)
    if (err) {
      console.log(err, 'err')
    } else {
      console.log(data)
      res.send(data)
    }
  })
});
app.delete('/word_frequencies', (req, res) => {
  WordFrequency.remove({}, (err, data) => {
    res.send('removed docs')
  })
});

app.delete('/games', (req, res) => {
  Game.remove({}, (err, data) => {
    res.send('removed docs')
  })
});

// Serve static assets in in prod
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port: ${port}`));
