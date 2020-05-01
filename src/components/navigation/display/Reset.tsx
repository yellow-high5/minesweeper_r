import React from 'react';

import { die, love, smile } from '../../../svg/Face';

type Props = {
  field_state: string;
  onClick: () => void;
};

export default function Reset(props: Props) {
  let face: React.ReactElement;
  switch (props.field_state) {
    case 'EXPLORE':
      face = smile;
      break;
    case 'MARKING':
      face = smile;
      break;
    case 'GOAL':
      face = love;
      break;
    case 'GAMEOVER':
      face = die;
      break;
    default:
      face = smile;
      break;
  }

  return (
    <div id="facebot" className="Reset" onClick={() => props.onClick()}>
      {face}
    </div>
  );
}
