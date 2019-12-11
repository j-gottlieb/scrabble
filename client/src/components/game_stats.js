import React from 'react';
import PropTypes from 'prop-types';
import {Table, Card, CardTitle, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import {getPlayerWords} from '../selectors';

const getTotalScore = playerWords =>
  playerWords.reduce((sum, {score}) => sum += score, 0)

const GameStats = ({players}) => (
  <>
    {Object.keys(players).map((player, index) => (
      <Card key={index}>
        <CardTitle>{`${player}: ${getTotalScore(players[player])}`}</CardTitle>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>word</th>
                <th>score</th>
              </tr>
            </thead>
            <tbody>
              {players[player].map(({word, score}, index) => (
                <tr key={index}>
                  <td>{word}</td>
                  <td>{score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    ))}
  </>
);

const mapStateToProps = state => ({
  players: getPlayerWords(state)
})

GameStats.propTypes = {
  players: PropTypes.object
}

export default connect(mapStateToProps)(GameStats)
