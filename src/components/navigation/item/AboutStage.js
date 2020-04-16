import React, { Component } from 'react';

export default class AboutStage extends Component {
  render() {
    return (
      <div className="AboutStage">
        <span>{this.props.stage}</span>
      </div>
    );
  }
}
