import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  onToggleSignInModal,
  onToggleSignUpModal,
  showGamesModal,
  changePortalView
} from '../actions'
import {
    getActiveGameId,
    getCurrentGame
} from '../selectors';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {getNewGame} from '../service/game';
import {PORTAL_VIEW} from '../constants';

const UserOptions = () => {
    const dispatch = useDispatch();
    const {
        activeGameName,
        isUserLoggedIn,
        isActiveGame,
        playerId
    } = useSelector(state => ({
        playerId: state.playerInfo.id,
        isUserLoggedIn: !!state.playerInfo.id,
        isActiveGame: !!getActiveGameId(state),
        activeGameName: getCurrentGame(state).name || 'No Active Game'
    }))
    const toggleLogIn = () => dispatch(onToggleSignInModal())
    const toggleSignUp = () => dispatch(onToggleSignUpModal())
    
    const changeView = (view, popupState) => () => {
        popupState && popupState.close();
        dispatch(changePortalView(view));
    }

    return (
        <>
            {isUserLoggedIn && (
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                        <>
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                {...bindTrigger(popupState)}
                            >
                                <PlayCircleOutlineIcon />
                            </Button>
                            <Menu
                                id="simple-menu"
                                keepMounted
                                {...bindMenu(popupState)}
                            >
                                <MenuItem onClick={changeView(PORTAL_VIEW.GAME_SELECT, popupState)}>Select a New Game</MenuItem>
                                {isActiveGame && (
                                    <MenuItem onClick={changeView(PORTAL_VIEW.ACTIVE_GAME, popupState)}>Back to {activeGameName}</MenuItem>
                                )}
                            </Menu>
                        </>
                    )}
                </PopupState>
            )}
            <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true"
                onClick={changeView(PORTAL_VIEW.AUTH)}
            >
                <AccountBoxIcon />
            </Button>
        </>
    );
}

export default UserOptions;