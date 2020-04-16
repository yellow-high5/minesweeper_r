import React, { Component } from 'react';

//現在地を示したパネル
export default class Current extends Component {
  render() {
    return (
      <button className="Current" disabled={this.props.disabled}>
        {this.props.value}
      </button>
    );
  }
}
