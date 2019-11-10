import { combineReducers } from 'redux';
import playerInfo from './player_info';
import {showSignInModal, showSignUpModal} from './show_auth_modals';
import authMessage from './auth_message';
import game from './game';
import selectedLetter from './selected_letter';
import activeGames from './active_games';

export default combineReducers({
  authMessage,
  game,
  activeGames,
  playerInfo,
  selectedLetter,
  showSignInModal,
  showSignUpModal
});
