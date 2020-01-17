import React from 'react';
import {useSelector} from 'react-redux';
import GameStats from './game_stats';
import GameControls from './game_controls';
import GameBoard from './game_board';
import GameLobby from './game_lobby';
import GameOver from './game_over';
import {getCurrentGame, getIsGameOver} from '../selectors';
import {Grid} from '@material-ui/core';

const GameContainer = () => {
    const {
        gameHasBegun,
        isGameOver
    } = useSelector(state => ({
        gameHasBegun: getCurrentGame(state).hasBegun,
        isGameOver: getIsGameOver(state)
    }))

    return (
        <>
            {
                gameHasBegun ? (
                    <>
                        <Grid>
                            <GameStats />
                        </Grid>
                        <Grid>
                            <GameBoard />
                        </Grid>
                        <Grid>
                            <GameControls />
                        </Grid>
                        {isGameOver && (
                            <GameOver />
                        )}
                    </>
                ) : (
                    <GameLobby />   
                )
            }
        </>
    );
}

export default GameContainer;
