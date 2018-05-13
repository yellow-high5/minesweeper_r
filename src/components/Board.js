import React, { Component } from 'react';
import '../css/Board.css';

class Square extends Component{
  render() {
    return(
      <button className="Square" disabled={this.props.disabled} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Current extends Component{
  render() {
    return(
      <button className="Current" disabled={this.props.disabled} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}

class Board extends Component {

  renderSquare(i, j) {
    return <Square value={(this.props.mined_loc[i][j])} disabled={(this.props.minable_loc[i][j])} onClick={() => this.props.onClick(i,j)}/>;
  }

  renderCurrent(i, j) {
    return <Current value={(this.props.mined_loc[i][j])} disabled={(this.props.minable_loc[i][j])} onClick={() => this.props.onClick(i,j)}/>;
  }

  render() {
    const field = [];
    const cur_loc = this.props.cur_loc;
    for(let i = 0; i < 12; i++){
      for(let j = 0; j < 18; j++){
        if(cur_loc[0] === i && cur_loc[1] === j){
          field.push(this.renderCurrent(i,j))
        }
        else{
          field.push(this.renderSquare(i,j))
        }
      }
    }

    return(
      <div className="Board">
        {field}
      </div>
    );
  }
}

export default Board;
