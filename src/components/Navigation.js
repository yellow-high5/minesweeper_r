import React, { Component } from 'react';
import '../css/Navigation.css';

class Reset extends Component {
  render() {
    return(
      <div className="Reset">
      </div>
    )
  }

}

class AboutStage extends Component {
  render() {
    return(
      <div className="AboutStage">
        <h2>STAGE-1</h2>
      </div>
    );
  }
}

class AboutBombs extends Component {
  render() {
    return(
      <div className="AboutBombs">
        <p>Bomb's number</p><h2>010</h2>
      </div>
    );
  }
}

class Timer extends Component {
  render() {
    return(
      <div className="Timer">
        <h2>Time: {new Date().toLocaleTimeString()}</h2>
      </div>
    )
  }
}

class Navigation extends Component {
  render() {
    return(
      <div className="Navigation">
        <Reset />
        <AboutStage />
        <AboutBombs />
        <Timer />
      </div>
    );
  }
}

export default Navigation;
