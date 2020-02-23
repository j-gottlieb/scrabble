import React from 'react';
import {useSelector} from 'react-redux';
import {Button, List, ListItem, ListItemIcon} from '@material-ui/core';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import {beginGame} from '../service/game';
import {getActiveGameId, getIsGameOwner, getGameOwnerName} from '../selectors';

const GameLobby = () => {
    const {
        playersInGame, 
        gameId,
        isGameOwner,
        gameOwnerName
    } = useSelector(state => ({
        playersInGame: state.currentPlayers,
        gameId: getActiveGameId(state),
        isGameOwner: getIsGameOwner(state),
        gameOwnerName: getGameOwnerName(state)
    }))

    return (
        <>
            Players in the game:
            <List>
                {
                    playersInGame.map(({username}, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <>
                                    <ChildCareIcon />
                                    {username}
                                </>
                            </ListItemIcon>
                        </ListItem>
                    ))
                }
            </List>
            {
                isGameOwner ? (
                    <Button onClick={() => beginGame(gameId)}>Start Game</Button>
                ) : (
                    <p>Waiting for {gameOwnerName} to begin the game...</p>
                )
            }
        </>
    );
}

export default GameLobby;
