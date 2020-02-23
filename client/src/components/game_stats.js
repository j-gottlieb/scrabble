import React from 'react';
import {useSelector} from 'react-redux';
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
import {getPlayerScore} from '../game_utility';
import PlayedWords from './played_words';

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

const GameStats = () => {
  const classes = useStyles();

  const {currentPlayers, playerWords} = useSelector(state => ({
    currentPlayers: state.currentPlayers,
    playerWords: getPlayerWords(state)
  }));

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {currentPlayers.map(({username, _id}, index) => (
                <TableCell key={index}>
                  <PlayedWords playerId={_id} username={username} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.keys(playerWords).map((player, index) => (
                  <TableCell key={index}>{getPlayerScore(playerWords[player])}</TableCell>
              ))}
          </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default GameStats
