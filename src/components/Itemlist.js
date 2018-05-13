import React, { Component } from 'react';
import '../css/Itemlist.css';

class Item extends Component {
  render() {
    return(
      <div className="Item">
        <img className="item-icon"></img>
        <p className="item-name">{this.props.name}</p>
        <div className="item-state">
          <p className="item-number">{this.props.number}</p>
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
        <Item name='Marking' number='∞'/>
        <Item name='Scope' number='0'/>
        <Item name='Drone' number='0'/>
        <Item name='Switch' number='0'/>
        <Item name='Detectar' number='0'/>
        <Item name='Demine' number='∞'/>
      </div>
    );
  }
}

export default Itemlist;
