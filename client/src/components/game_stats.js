import React from 'react';
import {Table, Card, CardTitle, CardBody} from 'reactstrap';

const getTotalScore = playerWords =>
  playerWords.reduce((sum, {score}) => sum += score, 0)

const GameStats = ({players}) => (
  <>
    {Object.keys(players).map(player => (
      <Card>
        <CardTitle>{`${player}: ${getTotalScore(players[player])}`}</CardTitle>
        <CardBody>
          <Table>
            <thead>
              <th>word</th>
              <th>score</th>
            </thead>
            <tbody>
              {players[player].map(({word, score}) => (
                <tr>
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

export default GameStats
