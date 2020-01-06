import React from 'react';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import UserOptions from './user_options';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {

  const classes = useStyles();
  const username = useSelector(state => state.playerInfo.username);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            fLexicon
          </Typography>
          <Typography variant="h6" className={classes.title}>
          {username && `Welcome, ${username}`}
          </Typography>
          <UserOptions />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
