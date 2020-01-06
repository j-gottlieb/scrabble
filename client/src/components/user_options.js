import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  onToggleSignInModal,
  onToggleSignUpModal,
  showGamesModal
} from '../actions'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {getNewGame} from '../service/game';

const UserOptions = () => {
    const dispatch = useDispatch();
    const {
        isUserLoggedIn,
        playerId
    } = useSelector(state => ({
        playerId: state.playerInfo.id,
        isUserLoggedIn: !!state.playerInfo.id
    }))
    const toggleLogIn = () => dispatch(onToggleSignInModal())
    const toggleSignUp = () => dispatch(onToggleSignUpModal())

    return (
        <>
            {isUserLoggedIn && (
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                        <>
                            <Button aria-controls="simple-menu" aria-haspopup="true" {...bindTrigger(popupState)}>
                                <PlayCircleOutlineIcon />
                            </Button>
                            <Menu
                                id="simple-menu"
                                keepMounted
                                {...bindMenu(popupState)}
                            >
                                <MenuItem onClick={() => {popupState.close(); getNewGame(playerId)}}>New Game</MenuItem>
                                <MenuItem onClick={() => {popupState.close(); dispatch(showGamesModal())}}>Join Game</MenuItem>
                            </Menu>
                        </>
                    )}
                </PopupState>
            )}
            <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                <>
                <Button aria-controls="simple-menu" aria-haspopup="true" {...bindTrigger(popupState)}>
                    <AccountBoxIcon />
                </Button>
                <Menu
                    id="simple-menu"
                    keepMounted
                    {...bindMenu(popupState)}
                >
                    <MenuItem onClick={() => {popupState.close(); toggleLogIn()}}>Log In</MenuItem>
                    <MenuItem onClick={() => {popupState.close(); toggleSignUp()}}>Sign Up</MenuItem>
                </Menu>
                </>
                )}
            </PopupState>
        </>
    );
}

export default UserOptions;