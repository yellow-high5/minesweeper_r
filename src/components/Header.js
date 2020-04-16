import '../css/Header.css';

import React, { Component } from 'react';

import { logo } from '../svg/Logo';

class Header extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {logo}
          <span className="App-title">MineSweeperR, React Application</span>
          <small>@yoshinori matsuzaki products.</small>
        </header>
      </div>
    );
  }
}

export default Header;
