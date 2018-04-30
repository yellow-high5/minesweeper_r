import React, { Component } from 'react';
import Navigation from './Navigation';
import Board from './Board';
import Itemlist from './Itemlist';
import '../css/Game.css';

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <Navigation />
        <Board />
        <Itemlist />
      </div>
    );
  }
}

export default Game;
