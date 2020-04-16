import React, { Component } from 'react';

export default class AboutBombs extends Component {
  render() {
    return (
      <div className="AboutBombs">
        <p>Bomb's number</p>
        <span>{this.props.number}</span>
      </div>
    );
  }
}
