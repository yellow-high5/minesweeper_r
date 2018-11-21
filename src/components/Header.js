import React, { Component } from 'react';
//import logo from '../logo.svg';
import '../css/Header.css';

class Header extends Component {
  render() {
    const snap_logo = <svg className="App-logo" alt="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480">
                        <path className="st0" d="M278.3,150.2l-46.7-16.7c-12.8-4.6-19.4-18.8-14.9-31.7l9.5-27c4.5-12.9,18.6-19.7,31.3-15.1
                          c4.9,1.8,9.8,3.5,14.7,5.3c10.7,3.8,21.4,7.7,32,11.5c1.5,0.6,9.7,3.6,13.9,12.7c2.7,5.7,3.2,12.5,1,19l-9.5,27
                          C305.1,148,291.1,154.7,278.3,150.2z"/>
                        <path className="st1" d="M278.6,64.3c5.2-5.4,13-12.6,23.6-19c26.6-16.1,66-25.1,91.2-14c53.2,23.4,23.1,126.4,71.4,156.6
                          c23.1,14.4,67.2,14,158.9-49"/>
                        <g id="svg-spark">
                          <line id="svg-spark0" className="st1" x1="666.8" y1="139.3" x2="702.6" y2="155"/>
                          <line id="svg-spark1" className="st1" x1="649" y1="93.3" x2="656.6" y2="62.1"/>
                          <line id="svg-spark2" className="st1" x1="663.7" y1="112.7" x2="705.7" y2="93.3"/>
                          <line id="svg-spark3" className="st1" x1="644" y1="158.7" x2="684.7" y2="195.6"/>
                          <line id="svg-spark4" className="st1" x1="620.2" y1="108.4" x2="611.7" y2="54.2"/>
                          <line id="svg-spark5" className="st1" x1="619.3" y1="168.7" x2="616.5" y2="204.3"/>
                          <line id="svg-spark6" className="st1" x1="606" y1="126.6" x2="566.6" y2="112.9"/>
                        </g>
                        <path className="st0" d="M393.6,289.4c-7,103-94,181-194.3,174.2C98.9,456.8,23.2,367.8,30.1,264.8s94-181,194.3-174.2
                            C324.8,97.4,400.5,186.4,393.6,289.4z"/>
                        <path id="svg-bomb" className="st0" d="M365.6,287.5c-5.9,87.1-79.5,153-164.4,147.3c-84.9-5.8-149-81-143.1-168.1s79.5-153,164.4-147.3
                          S371.5,200.4,365.6,287.5z"/>
                        <path id="test1" className="st2" d="M274.5,281.3c-2.3,34.6-32.3,60.7-66.9,58.4s-60.7-32.3-58.4-66.9c2.3-34.6,32.3-60.7,66.9-58.4
                          C250.7,216.8,276.8,246.7,274.5,281.3z"/>
                      </svg>
    return (
      <div className="App">
        <header className="App-header">
          {snap_logo}
          <h1 className="App-title">MineSweeperR, React Application</h1>
          <small>@yoshinori matsuzaki products.</small>
        </header>
      </div>
    );
  }
}

//svgBomb.animate({d:pathEnd},SPEED);



export default Header;
