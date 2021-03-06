import '../../css/Board.css';

import React, { Component } from 'react';

import Bomb from './panel/Bomb';
import Bombed from './panel/Bombed';
import Current from './panel/Current';
import Explode from './panel/Explode';
import Marking from './panel/Marking';
import Square from './panel/Square';

class Board extends Component {
  renderSquare(i, j) {
    return (
      <Square
        value={this.props.mined_loc[i][j]}
        disabled={this.props.minable_loc[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  renderCurrent(i, j) {
    return (
      <Current
        value={this.props.mined_loc[i][j]}
        disabled={this.props.minable_loc[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  renderMarking(i, j) {
    return (
      <Marking
        value={this.props.mined_loc[i][j]}
        onDoubleClick={() => this.props.onDoubleClick(i, j)}
      />
    );
  }

  renderBombed(i, j) {
    return <Bombed value={this.props.mined_loc[i][j]} />;
  }

  renderBomb(i, j) {
    return <Bomb value={this.props.mined_loc[i][j]} />;
  }

  renderExplode(i, j) {
    return <Explode value={this.props.mined_loc[i][j]} />;
  }

  render() {
    const field = [];
    const field_state = this.props.field_state;
    const cur_loc = this.props.cur_loc;
    const marking_loc = this.props.marking_loc;
    const bombed_loc = this.props.bombed_loc;
    const bomb_loc = this.props.bomb_loc;
    //ゲームオーバー時
    if (field_state === "GAMEOVER") {
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 18; j++) {
          if (
            bombed_loc.map((loc) => loc.toString()).includes([i, j].toString())
          ) {
            field.push(this.renderBombed(i, j));
          } else if (
            bomb_loc.map((loc) => loc.toString()).includes([i, j].toString())
          ) {
            field.push(this.renderBomb(i, j));
          } else {
            field.push(this.renderExplode(i, j));
          }
        }
      }
    }
    //挑戦中、ゲームクリア時
    else {
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 18; j++) {
          if (
            marking_loc.map((loc) => loc.toString()).includes([i, j].toString())
          ) {
            field.push(this.renderMarking(i, j));
          } else if (
            bombed_loc.map((loc) => loc.toString()).includes([i, j].toString())
          ) {
            field.push(this.renderBombed(i, j));
          } else if (cur_loc[0] === i && cur_loc[1] === j) {
            field.push(this.renderCurrent(i, j));
          } else {
            field.push(this.renderSquare(i, j));
          }
        }
      }
    }

    return <div className="Board">{field}</div>;
  }
}

export default Board;
