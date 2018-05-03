import React, { Component } from 'react';
import '../css/Itemlist.css';

class Item extends Component {
  render() {
    return(
      <div className="Item">
        <img className="item-icon"></img>
        <p className="item-name">{this.props.name}</p>
        <div className="item-state">
          <p className="item-number">0</p>
          <button className="item-use">Use this</button>
        </div>
      </div>
    );
  }
}

class Itemlist extends Component {
  render() {
    return(
      <div className="Itemlist">
        <Item name='scope'/>
        <Item name='launcher'/>
        <Item name='switch'/>
        <Item name='detectar'/>
        <Item />
        <Item />
      </div>
    );
  }
}

export default Itemlist;
