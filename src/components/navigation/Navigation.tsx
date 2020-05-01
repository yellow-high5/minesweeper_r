import '../../css/Navigation.css';

import React from 'react';

import AboutBombs from './display/AboutBombs';
import AboutStage from './display/AboutStage';
import Reset from './display/Reset';
import Timer from './display/Timer';

type Props = {
  field_state: string;
  stage: string;
  bomb_number: number;
  resetClick: () => void;
};

export default function Navigation(props: Props) {
  return (
    <div className="Navigation">
      <Reset
        field_state={props.field_state}
        onClick={() => props.resetClick()}
      />
      <AboutStage stage={props.stage} />
      <AboutBombs number={props.bomb_number} />
      <Timer />
    </div>
  );
}
