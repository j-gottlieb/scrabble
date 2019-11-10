import PropTypes from 'prop-types';

export const GAME_SHAPE =
    PropTypes.arrayOf(
        PropTypes.shape({
          letterPool: PropTypes.arrayOf(PropTypes.string),
          isActive: PropTypes.bool,
          _id: PropTypes.string,
          board: PropTypes.arrayOf(
            PropTypes.shape({
              _id: PropTypes.string,
              letter: PropTypes.string,
              isValidPosition: PropTypes.bool
            })
          ),
          words: PropTypes.arrayOf(
            PropTypes.shape({
              word: PropTypes.string,
              score: PropTypes.number,
              playerId: PropTypes.string
            })
          ),
          players: PropTypes.arrayOf(
            PropTypes.shape({
              hand: PropTypes.arrayOf(PropTypes.string),
              isCurrentTurn: PropTypes.bool,
              _id: PropTypes.string,
              playerId: PropTypes.string,
              isOwner: PropTypes.bool
            })
          )
        })
      )