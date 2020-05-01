import '../../css/Board.css';

import React from 'react';

import Bomb from './panel/Bomb';
import Bombed from './panel/Bombed';
import Current from './panel/Current';
import Explode from './panel/Explode';
import Marking from './panel/Marking';
import Square from './panel/Square';

export default function Board() {
  return (
    <div className="Board">
      <Bomb />
      <Current value={2} />
      <Bombed />
      <Explode value={3} />
      <Square value={1} disabled={false} onClick={() => alert('mine')} />
      <Marking onDoubleClick={() => alert('marking')} />
    </div>
  );
}
