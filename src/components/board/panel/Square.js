import React, { Component } from 'react';

//通常のパネル
export default class Square extends Component {
  render() {
    return (
      <button
        className="Square"
        disabled={this.props.disabled}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
