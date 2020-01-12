import React from 'react';
import {useSelector} from 'react-redux';
import GameStats from './game_stats';
import GameControls from './game_controls';
import GameBoard from './game_board';
import GameLobby from './game_lobby';
import {getCurrentGame} from '../selectors';
import {Grid} from '@material-ui/core';

const GameContainer = () => {
    const {gameHasBegun} = useSelector(state => ({
        gameHasBegun: getCurrentGame(state).hasBegun
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
                    </>
                ) : (
                    <GameLobby />   
                )
            }
        </>
    );
}

export default GameContainer;
