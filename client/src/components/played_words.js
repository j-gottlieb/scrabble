import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {getPlayerWords} from '../selectors';
import { makeStyles } from '@material-ui/core/styles';
import {
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';

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

const columns = [
    {id: 'word', label: 'Word'},
    {id: 'score', label: 'Score'}
];

const PlayedWords = ({playerId, username}) => {
  const classes = useStyles();
  const [isOpen, toggleIsOpen] = useState(false);

  const {playerWords} = useSelector(state => ({
    playerWords: getPlayerWords(state)
  }));

  return (
    <>
    {username}
    <button type="button" onClick={() => toggleIsOpen(true)}>
        View Played Words
    </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={() => toggleIsOpen(false)}
      >
        <div className={classes.paper}>
            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {columns.map(({id, label}) => (
                                <TableCell key={id}>{label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(playerId in playerWords) && playerWords[playerId].map((row, index) => (
                            <TableRow key={`${index}.${row.id}`}>
                                {columns.map(({id}) => (
                                    <TableCell key={row[id]}>{row[id]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
      </Modal>
    </>
  )
}

export default PlayedWords
