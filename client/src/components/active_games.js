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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={gameId => this.props.handleJoinGame(gameId, this.props.playerId)}
              >
              {this.props.gamesToJoin.length === 0 ? (
                <MenuItem>No Games Found</MenuItem>
                ) : (
                this.props.gamesToJoin.map(game => (
                  <MenuItem value={game._id}>{game._id}</MenuItem>
                )))}
              </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ActiveGames))
