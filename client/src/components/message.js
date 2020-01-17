import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const Message = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const message = useSelector(state => state.message);

    const getMessage = () => {
      if (typeof message === 'string') return message;
      const text = []
      if ('newWords' in message) {
        text.push(message.newWords.length
        ? `${message.newWords.map(({word, score}) => `${word}: ${score}`).join(', ')}`
        : '');
      }
      if ('fakeAssWords' in message) {
        text.push(message.fakeAssWords.length ? `Whoops these words are fake... ${message.fakeAssWords.map(word => word).join(', ')}`
        : '');
      }
      if ('validUnsavedWords' in message) {
        text.push(message.validUnsavedWords.length
        ? `Congrats, you found a valid word that's not in our database! (${message.validUnsavedWords.map(word => word).join(', ')})`
        : '');
      }
      return text.map(string => <p>{string}</p>);
    }

    useEffect(() => {
        setOpen(true)
    }, [message])

    const handleClose = () => setOpen(false);

    return (
        <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
                onClose={handleClose}
                severity="success"
                elevation={6}
                variant="filled"
            >
                {getMessage()}
          </MuiAlert>
        </Snackbar>
      </div>
    );
}

export default Message;