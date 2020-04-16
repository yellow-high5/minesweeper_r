import React, { Component } from 'react';

import { die, love, smile } from '../../../svg/Face';

export default class Reset extends Component {
  render() {
    const field_state = this.props.field_state;
    let face;
    switch (field_state) {
      case "EXPLORE":
        face = smile;
        break;
      case "MARKING":
        face = smile;
        break;
      case "GOAL":
        face = love;
        break;
      case "GAMEOVER":
        face = die;
        break;
      default:
        face = smile;
        break;
    }

    return (
      <div
        idName="facebot"
        className="Reset"
        onClick={() => this.props.onClick()}
      >
        {face}
      </div>
    );
  }
}
