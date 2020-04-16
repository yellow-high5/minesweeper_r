import '../../css/Navigation.css';

import React, { Component } from 'react';

import AboutBombs from './item/AboutBombs';
import AboutStage from './item/AboutStage';
import Reset from './item/Reset';
import Timer from './item/Timer';

export default class Navigation extends Component {
  render() {
    return (
      <div className="Navigation">
        <Reset
          field_state={this.props.field_state}
          onClick={() => this.props.resetClick()}
        />
        <AboutStage stage={this.props.stage} />
        <AboutBombs number={this.props.bomb_number} />
        <Timer />
      </div>
    );
  }
}
