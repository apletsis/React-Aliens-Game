import React from 'react';
import { pathFromBezierCurve } from '../utils/formulas';

const CannonBase = (props) => {
    const cannonBaseStyle = {
        fill: '#a16012',
        stroke: '#75450e',
        strokeWidth: '2px',
    };

    const baseWith = 80;
    const halfBase = 40;
    const heigth = 60;
    const negativeHeight = heigth * -1;

    const cubicBezierCurve = {
        initialAxis: {
            x: -halfBase,
            y: heigth,
        },
        initialControlPoint: {
            x: 20,
            y: negativeHeight,
        },
        endingControlPoint: {
            x: 60,
            y: negativeHeight,
        },
        endingAxis: {
            x: baseWith,
            y: 0,
        },
    };

    return (
        <g>
            <path
                style={cannonBaseStyle}
                d={pathFromBezierCurve(cubicBezierCurve)}
            />
            <line
                x1={-halfBase}
                y1={heigth}
                x2={halfBase}
                y2={heigth}
                style={cannonBaseStyle}
            />
        </g>
    );
};


export default CannonBase;