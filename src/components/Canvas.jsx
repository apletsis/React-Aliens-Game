import React from 'react';
import PropTypes from 'prop-types';
import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import StartGame from './StartGame';
import Title from './Title';
import { gameHeight } from '../utils/constants';
import Leaderboard from './Leaderboard';
import { signIn } from 'auth0-web';

const Canvas = (props) => {
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

    const leaderboard = [
        { id: 'd4', maxScore: 82, name: 'Ado Kukic', picture: 'https://pbs.twimg.com/profile_images/1786365249/386370_127058754079230_100003253187707_128776_466675623_n_normal.jpg', },
        { id: 'a1', maxScore: 235, name: 'Bruno Krebs', picture: 'https://pbs.twimg.com/profile_images/939945648346091521/4jLFuTqy_normal.jpg', },
        { id: 'c3', maxScore: 99, name: 'Diego Poza', picture: 'https://pbs.twimg.com/profile_images/478612888866009088/ySRi3jxT_normal.jpeg', },
        { id: 'b2', maxScore: 129, name: 'Jeana Tahnk', picture: 'https://pbs.twimg.com/profile_images/1891692507/JeanaTahnk2_crop_normal.jpg', },
        { id: 'e5', maxScore: 34, name: 'Jenny Obrien', picture: 'https://pbs.twimg.com/profile_images/558163656500715520/88sTtRBT_normal.png', },
        { id: 'f6', maxScore: 153, name: 'Kim Maida', picture: 'https://pbs.twimg.com/profile_images/1049350450905014274/fgprXElz_normal.jpg', },
        { id: 'g7', maxScore: 55, name: 'Luke Oliff', picture: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png', },
        { id: 'h8', maxScore: 146, name: 'Sebastián Peyrott', picture: 'https://pbs.twimg.com/profile_images/631528500042825729/9giF9-bh_normal.png', },
      ];

    return (
        <svg
            id="aliens-go-home-canvas"
            preserveAspectRatio="xMaxYMax none"
            onMouseMove={props.trackMouse}
            viewBox={viewBox}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" />
                </filter>
            </defs>
            <Sky />
            <Ground />
            <CannonPipe rotation={props.angle} />
            <CannonBase />
            <CurrentScore score={15} />

            { ! props.gameState.started &&
                <g>
                    <StartGame onClick={() => props.startGame()} />
                    <Title />
                    <Leaderboard currentPlayer={leaderboard[6]} authenticate={signIn} leaderboard={leaderboard} />
                </g> 
            }

            {props.gameState.flyingObjects.map(flyingObject => (
                <FlyingObject
                    key={flyingObject.id}
                    position={flyingObject.position}
                />
            ))}
        </svg>
    );
};

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
              x: PropTypes.number.isRequired,
              y: PropTypes.number.isRequired
            }).isRequired,
            id: PropTypes.number.isRequired,
          })).isRequired,
    }).isRequired,
    trackMouse: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
};

export default Canvas;