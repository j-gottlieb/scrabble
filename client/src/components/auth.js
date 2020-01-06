import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  IconButton,
  Typography
} from '@material-ui/core';
import {onSignIn, onSignUp} from '../actions'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  close: {
    padding: theme.spacing(0.5),
  },
  input: {
    marginBottom: theme.spacing(2)
  }
}));

const Auth = ({isLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSnackbarOpen, toggleSnackbar] = useState(false);

  const {
    message
  } = useSelector(state => ({
    message: state.authMessage
  }));

  const dispatch = useDispatch();

  const classes = useStyles();

  const label = isLogin ? 'Sign In' : 'Sign Up';

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault()
          isLogin
          ? dispatch(onSignIn(username, password))
          : dispatch(onSignUp(username, password))
        }}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <Grid>
          <Typography variant='h5'>{label}</Typography>
          <Grid className={classes.input}>
          <TextField
            onChange={e => setUsername(e.target.value)}
            id={`username-text-input-${isLogin}`}
            label="Username"
            variant="filled"
          />
        </Grid>
        <Grid className={classes.input}>
          <TextField
            onChange={e => setPassword(e.target.value)}
            id={`password-text-input-${isLogin}`}
            label="Password"
            variant="filled"
          />
          </Grid>
          <Grid>
            <Button variant="contained" color="primary" type="submit">
              {label}
            </Button>
          </Grid>
        </Grid>
      </form>
      
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => toggleSnackbar(false)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={() => toggleSnackbar(false)}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </>
  )
}

export default Auth;
