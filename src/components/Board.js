import React, { Component } from 'react';
import '../css/Board.css';

class Square extends Component{
  render() {
    return(
      <button className="Square" onClick={() => console.log('click')}>

      </button>
    );
  }
}

class Board extends Component {

  render() {
    const field = [];
    for(let i = 0; i < 18; i++){
      for(let j = 0; j < 12; j++){
        field.push(<Square />)
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
