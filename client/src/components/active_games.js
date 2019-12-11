import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
  getGamesToJoin,
  getMyGames,
  getIsActiveGame,
  getPlayerId
} from '../selectors'
import {handleJoinGame} from '../actions';
import {GAME_SHAPE} from '../prop_shapes';

class ActiveGames extends Component {
  state={
    isMyGamesOpen: false,
    isOtherGamesOpen: false
  }

  toggleOtherGames = () => {
    this.setState(prevState => ({
      isMyGamesOpen: false,
      isOtherGamesOpen: !prevState.isOtherGamesOpen
    }))
  }

  toggleMyGames = () => {
    this.setState(prevState => ({
      isOtherGamesOpen: false,
      isMyGamesOpen: !prevState.isMyGamesOpen
    }))
  }

  render(){
    return (
      <div>
        {this.props.playerId && (
          <div>
          <p>Click a game to join</p>
          <Dropdown isOpen={this.state.isMyGamesOpen} toggle={this.toggleMyGames}>
            <DropdownToggle caret>
              My Games
              </DropdownToggle>
            <DropdownMenu>
            {this.props.myGames.length === 0 ? (
                <DropdownItem>No Games Found</DropdownItem>
                ) : (
              this.props.myGames.map(game => (
                <DropdownItem
                  key={game._id}
                  onClick={() => this.props.handleJoinGame(game._id, this.props.playerId)}
                >
                  {game._id}
                </DropdownItem>
              )))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={this.state.isOtherGamesOpen} toggle={this.toggleOtherGames}>
            <DropdownToggle caret>
              Other Games to Join
              </DropdownToggle>
            <DropdownMenu>
              {this.props.gamesToJoin.length === 0 ? (
                <DropdownItem>No Games Found</DropdownItem>
                ) : (
                this.props.gamesToJoin.map(game => (
                <DropdownItem
                  key={game._id}
                  onClick={() => this.props.handleJoinGame(game._id, this.props.playerId)}
                >
                  {game._id}
                </DropdownItem>
              )))}
            </DropdownMenu>
          </Dropdown>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isActiveGame: getIsActiveGame(state),
  gamesToJoin: getGamesToJoin(state),
  myGames: getMyGames(state),
  playerId: getPlayerId(state)
})

const mapDispatchToProps = dispatch => ({
  handleJoinGame: (gameId, playerId) => dispatch(handleJoinGame(gameId, playerId))
})

ActiveGames.propTypes = {
  gamesToJoin: GAME_SHAPE,
  myGames: GAME_SHAPE,
  playerId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveGames)
