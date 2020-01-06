import { combineReducers } from 'redux';
import playerInfo from './player_info';
import {showSignInModal, showSignUpModal} from './show_auth_modals';
import authMessage from './auth_message';
import game from './game';
import selectedLetter from './selected_letter';
import activeGames from './active_games';
import selectedGameId from './selected_game_id';
import showGamesModal from './show_games_modal';
import currentPlayers from './current_players';

export default combineReducers({
  authMessage,
  game,
  activeGames,
  currentPlayers,
  playerInfo,
  selectedGameId,
  selectedLetter,
  showGamesModal,
  showSignInModal,
  showSignUpModal
});
