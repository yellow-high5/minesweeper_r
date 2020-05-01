import '../css/Game.css';

import React from 'react';

import Board from './board/Board';
import ItemList from './itemlist/Itemlist';
import Navigation from './navigation/Navigation';

export default function Game() {
  return (
    <div className="Game">
      <Navigation
        field_state={'EXPLORE'}
        stage={'STAGE-1'}
        bomb_number={20}
        resetClick={() => alert('reset!!!')}
      />
      <Board />
      <ItemList
        field_state={'EXPLORE'}
        item_map={{
          Marking: { description: 'marking', number: 20 },
          Scope: { description: 'scope', number: 2 },
          Drone: { description: 'drone', number: 1 },
          Switch: { description: 'switch', number: 2 },
        }}
        onMarking={() => alert('mark')}
        onScope={() => alert('scope')}
        onDrone={() => alert('drone')}
        onSwitch={() => alert('switch')}
      />
    </div>
  );
}
