import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getGamesToJoin,
  getMyGames,
  getPlayerId
} from '../selectors'
import {handleJoinGame} from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core';
import {getNewGame} from '../service/game';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  select: {
    width: 200
  }
}));

const ActiveGames = props => {
  const [isMyGamesOpen, setIsMyGamesOpen] = useState(false);
  const [isOtherGamesOpen, setIsOtherGamesOpen] = useState(false);
  const [gameName, setGameName] = useState('');

  const dispatch = useDispatch();

  const classes = useStyles();

  const {
    gamesToJoin,
    myGames,
    playerId
  } = useSelector(state => ({
    gamesToJoin: getGamesToJoin(state),
    myGames: getMyGames(state),
    playerId: getPlayerId(state)
  }))

  const toggleOtherGames = () => {
    setIsOtherGamesOpen(!isOtherGamesOpen)
    setIsMyGamesOpen(false)
  }

  const toggleMyGames = () => {
    setIsMyGamesOpen(!isMyGamesOpen)
    setIsOtherGamesOpen(false)
  }

  const onSelectGame = ({target: {value}}) => {
    dispatch(handleJoinGame(value, playerId))
  }

  return (
    <>
      <InputLabel id="my-games-select-label">My Games</InputLabel>
      <Select
        labelId="my-games-select-label"
        id="my-games-select"
        className={classes.select}
        open={isMyGamesOpen}
        onClose={toggleMyGames}
        onOpen={toggleMyGames}
        value={myGames.length > 0 ? myGames[0]._id : ''}
        onChange={onSelectGame}
      >
        {myGames.length === 0 ? (
          <MenuItem value={''}>No Games Found</MenuItem>
          ) : (
          myGames.map(game => (
          <MenuItem
            key={game._id}
            value={game._id}
          >
            {game.name}
          </MenuItem>
          ))
        )}
      </Select>

      <InputLabel id="other-games-select-label">Other Games</InputLabel>
      <Select
        labelId="other-games-select-label"
        id="my-games-select"
        className={classes.select}
        open={isOtherGamesOpen}
        onClose={toggleOtherGames}
        onOpen={toggleOtherGames}
        value={gamesToJoin.length > 0 ? gamesToJoin[0]._id : ''}
        onChange={onSelectGame}
      >
        {gamesToJoin.length === 0 ? (
          <MenuItem value={''}>No Games Found</MenuItem>
          ) : (
          gamesToJoin.map(game => (
          <MenuItem
            key={game._id}
            value={game._id}
          >
            {game.name}
          </MenuItem>
          ))
        )}
      </Select>
      <Grid>
          <TextField
            onChange={e => setGameName(e.target.value)}
            id="new-game-text-input"
            label="New Game"
            variant="filled"
            placeholder="choose a name"
          />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => getNewGame(playerId, gameName)}
            >
              Create Game
            </Button>
          </Grid>
    </>
  )
}

export default ActiveGames