import React, { Component } from 'react';
import '../css/Itemlist.css';

const ITEMS       = ['Marking', 'Scope', 'Drone', 'Switch'];

class Item extends Component {
  render() {
    return(
      <div className="Item">
        {this.props.icon}
        <p className="item-name">{this.props.name}</p>
        <div className="item-state">
          <p className="item-number">{this.props.number}</p>
          <button disabled={this.props.field_state === 'GAMEOVER'?'disabled':''} className="item-use"　onClick={() => this.props.onClick()}>Use this</button>
        </div>
      </div>
    );
  }
}

class Itemlist extends Component {
  render() {
    const field_state = this.props.field_state;
    const item_map = this.props.item_map;
    return(
      <div className="Itemlist">
        <Item name='Marking' icon={marking} number={item_map['Marking']['number']} onClick={() => this.props.onMarking()} field_state={field_state}/>
        <Item name='Scope' icon={scope} number={item_map['Scope']['number']} onClick={() => this.props.onScope()} field_state={field_state}/>
        <Item name='Drone' icon={drone} number={item_map['Drone']['number']} onClick={() => this.props.onDrone()} field_state={field_state}/>
        <Item name='Switch' icon={switchs} number={item_map['Switch']['number']} onClick={() => this.props.onSwitch()} field_state={field_state}/>
      </div>
    );
  }
}

//item icon
let marking  = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="item-icon">
                  <path data-name="layer1"
                  d="M54.629 9.372a32 32 0 1 0 0 45.254 32.001 32.001 0 0 0 0-45.254zM44.727 41.9a2 2 0 1 1-2.828 2.828l-9.9-9.9-9.899 9.9a2 2 0 0 1-2.828-2.828l9.9-9.9-9.9-9.9a2 2 0 0 1 2.828-2.827L32 29.17l9.899-9.898a2 2 0 0 1 2.828 2.828l-9.9 9.898z"
                  fill="#ffce00"></path>
               </svg>
let scope    = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="item-icon">
                  <path data-name="layer2"
                  d="M59 42a3 3 0 0 0-3 3v6.757l-13-13A3 3 0 0 0 38.757 43l13 13H45a3 3 0 0 0 0 6h17V45a3 3 0 0 0-3-3z"
                  fill="#61DAFB"></path>
                  <path data-name="layer1" d="M45 2a3 3 0 0 0 0 6h6.758l-13 13A3 3 0 0 0 43 25.243l13-13V19a3 3 0 0 0 6 0V2z"
                  fill="#61DAFB"></path>
                  <path data-name="layer2" d="M12.243 8H19a3 3 0 0 0 0-6H2v17a3 3 0 0 0 6 0v-6.757l13 13A3 3 0 1 0 25.242 21z"
                  fill="#61DAFB"></path>
                  <path data-name="layer1" d="M21 38.757l-13 13V45a3 3 0 0 0-6 0v17h17a3 3 0 0 0 0-6h-6.757l13-13A3 3 0 0 0 21 38.757z"
                  fill="#61DAFB"></path>
               </svg>
let drone    = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="item-icon">
                  <path data-name="layer2"
                  d="M51.3 51.5a31.9 31.9 0 0 0-6.6-8.5A17.5 17.5 0 0 0 49 31.5a17.9 17.9 0 0 0-.2-2.6A19.9 19.9 0 0 1 33 36.5a19.9 19.9 0 0 1-15.8-7.6 18.2 18.2 0 0 0-.2 2.6A17.5 17.5 0 0 0 21.3 43a31.9 31.9 0 0 0-6.5 8.5 5 5 0 1 0 3.8 1.4 27.9 27.9 0 0 1 5.7-7.2 15.2 15.2 0 0 0 17.5 0 27.8 27.8 0 0 1 5.7 7.2 5 5 0 1 0 3.8-1.4z"
                  fill="#61DAFB"></path>
                  <path data-name="layer1" d="M62 6.5H35v-2a2 2 0 1 0-4 0v2H2a2 2 0 0 0 0 4h29v4.1a16.1 16.1 0 0 0-12.3 9.2A15.6 15.6 0 0 0 33 32.5a15.6 15.6 0 0 0 14.3-8.7A16.1 16.1 0 0 0 35 14.6v-4.1h27a2 2 0 0 0 0-4z"
                  fill="#61DAFB"></path>
               </svg>
let switchs  = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="item-icon">
                  <path data-name="layer2"
                  d="M43 17a4 4 0 0 1 8 0 2 2 0 0 0 4 0 8 8 0 0 0-16 0 2 2 0 0 0 4 0z" fill="#61DAFB"></path>
                  <path data-name="layer2" d="M47 1a16 16 0 0 0-16 16 2 2 0 1 0 4 0 12 12 0 0 1 24 0 2 2 0 1 0 4 0A16 16 0 0 0 47 1z"
                  fill="#61DAFB"></path>
                  <path data-name="layer1" d="M59 39H49V19a2 2 0 0 0-4 0v20H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2v4a2 2 0 0 0 4 0v-4h44v4a2 2 0 0 0 4 0v-4h2a2 2 0 0 0 2-2V41a2 2 0 0 0-2-2zM10 51a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm10 0a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm10 0a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"
                  fill="#61DAFB"></path>
               </svg>

export default Itemlist;
