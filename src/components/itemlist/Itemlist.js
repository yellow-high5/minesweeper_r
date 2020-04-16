import '../../css/Itemlist.css';

import React, { Component } from 'react';

import { drone, marking, scope, switchs } from '../../svg/Item';
import Item from './Item';

export default class Itemlist extends Component {
  render() {
    const field_state = this.props.field_state;
    const item_map = this.props.item_map;
    return (
      <div className="Itemlist">
        <Item
          name="Marking"
          icon={marking}
          number={item_map["Marking"]["number"]}
          onClick={() => this.props.onMarking()}
          field_state={field_state}
        />
        <Item
          name="Scope"
          icon={scope}
          number={item_map["Scope"]["number"]}
          onClick={() => this.props.onScope()}
          field_state={field_state}
        />
        <Item
          name="Drone"
          icon={drone}
          number={item_map["Drone"]["number"]}
          onClick={() => this.props.onDrone()}
          field_state={field_state}
        />
        <Item
          name="Switch"
          icon={switchs}
          number={item_map["Switch"]["number"]}
          onClick={() => this.props.onSwitch()}
          field_state={field_state}
        />
      </div>
    );
  }
}
