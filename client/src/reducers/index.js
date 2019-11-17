import { combineReducers } from 'redux';
import playerInfo from './player_info';
import {showSignInModal, showSignUpModal} from './show_auth_modals';
import authMessage from './auth_message';
import game from './game';
import selectedLetter from './selected_letter';
import activeGames from './active_games';
import selectedGameId from './selected_game_id';

export default combineReducers({
  authMessage,
  game,
  activeGames,
  playerInfo,
  selectedGameId,
  selectedLetter,
  showSignInModal,
  showSignUpModal
});
