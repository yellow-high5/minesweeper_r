import React, { Component } from 'react';

import Game from './components/Game';
import Header from './components/Header';

//import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
      </div>
    );
  }
}

export default App;
