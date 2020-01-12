import React from 'react';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
import Auth from './auth';
import ActiveGames from './active_games';
import GameContainer from './game_container';
import { getPlayerId } from '../selectors';
import { PORTAL_VIEW } from '../constants';

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
      showGames,
      portalView
    } = useSelector(state => ({
      showGames: !getPlayerId(state),
      portalView: state.portalView
    }))

    return (
        <div className={classes.root}>
            <Paper variant="outlined" elevation={3}>
              {portalView === PORTAL_VIEW.AUTH && (
                <Grid container>
                  <Grid className={classes.auth} item>
                    <Auth isLogin/>
                  </Grid>
                  <Grid className={classes.auth} item>
                    <Auth />
                  </Grid>
                </Grid>
              )}
              {portalView === PORTAL_VIEW.GAME_SELECT && (
                <ActiveGames />
              )}
              {portalView === PORTAL_VIEW.ACTIVE_GAME && (
                <GameContainer />
              )}
            </Paper>    
        </div>
    )
}

export default Portal;