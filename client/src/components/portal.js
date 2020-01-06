import React from 'react';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
import Auth from './auth';
import ActiveGames from './active_games';
import { getPlayerId } from '../selectors';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: 600,
        padding: theme.spacing(2)
      },
    },
    auth: {
      margin: 'auto'
    }
  }));

const Portal = () => {
    const classes = useStyles();

    const {
      showGames
    } = useSelector(state => ({
      showGames: !getPlayerId(state)
    }))

    return (
        <div className={classes.root}>
            <Paper variant="outlined" elevation={3}>
              {showGames ? (
                <Grid container>
                <Grid className={classes.auth} item>
                  <Auth isLogin/>
                </Grid>
                <Grid className={classes.auth} item>
                  <Auth />
                </Grid>
              </Grid>
              ) : (
                <ActiveGames />
              )}
            </Paper>    
        </div>
    )
}

export default Portal;