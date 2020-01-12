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

const Message = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const message = useSelector(state => state.message);

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
                {message}
          </MuiAlert>
        </Snackbar>
      </div>
    );
}

export default Message;