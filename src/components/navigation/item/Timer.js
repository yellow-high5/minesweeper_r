import React, { Component } from 'react';

export default class Timer extends Component {
  render() {
    return (
      <div className="TimeDisplay">
        <span>
          Time: <span id="basicUsage">00:00:00</span>
        </span>
      </div>
    );
  }
}
