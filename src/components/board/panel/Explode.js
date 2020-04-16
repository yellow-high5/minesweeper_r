import React, { Component } from 'react';

//ゲームオーバーパネル
export default class Explode extends Component {
  render() {
    return (
      <button className="Explode" disabled="disabled">
        {this.props.value}
      </button>
    );
  }
}
