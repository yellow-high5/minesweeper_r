import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    return (
      <div className="Item">
        {this.props.icon}
        <p className="item-name">{this.props.name}</p>
        <div className="item-state">
          <p className="item-number">{this.props.number}</p>
          <button
            disabled={
              this.props.field_state === "MARKING" ||
              this.props.field_state === "GAMEOVER"
                ? "disabled"
                : ""
            }
            className="item-use"
            onClick={() => this.props.onClick()}
          >
            Use this
          </button>
        </div>
      </div>
    );
  }
}
