import React, { Component } from 'react';

//アイテムでマーキングしたパネル
export default class Marking extends Component {
  render() {
    return (
      <button
        className="Marking"
        onDoubleClick={() => this.props.onDoubleClick()}
      />
    );
  }
}
