import React from 'react';
import PropTypes from 'prop-types';
import {connect, useSelector} from 'react-redux';
import {getPlayerWords} from '../selectors';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';

const getTotalScore = playerWords =>
  playerWords.reduce((sum, {score}) => sum += score, 0)

const useStyles = makeStyles(theme => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(2),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
  table: {}
}));

const GameStats = ({players}) => {
  const classes = useStyles();

  const currentPlayers = useSelector(state => state.currentPlayers);

  const getPlayerName = playerId => currentPlayers.find(
      player => player._id === playerId
    ).username

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {Object.keys(players).map(playerId => (
                <TableCell key={playerId}>{getPlayerName(playerId)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.keys(players).map((player, index) => (
                  <TableCell key={player}>{getTotalScore(players[player])}</TableCell>
              ))}
          </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const mapStateToProps = state => ({
  players: getPlayerWords(state)
})

GameStats.propTypes = {
  players: PropTypes.object
}

export default connect(mapStateToProps)(GameStats)
