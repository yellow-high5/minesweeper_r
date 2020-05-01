import '../../css/Itemlist.css';

import React from 'react';

import { drone, marking, scope, switchs } from '../../svg/Item';
import Item from './Item';

type Props = {
  field_state: string;
  item_map: { [key: string]: { description: string; number: number } };
  onMarking: () => void;
  onScope: () => void;
  onDrone: () => void;
  onSwitch: () => void;
};

export default function ItemList(props: Props) {
  return (
    <div className="Itemlist">
      <Item
        name="Marking"
        icon={marking}
        number={props.item_map['Marking']['number']}
        onClick={() => props.onMarking()}
        field_state={props.field_state}
      />
      <Item
        name="Scope"
        icon={scope}
        number={props.item_map['Scope']['number']}
        onClick={() => props.onScope()}
        field_state={props.field_state}
      />
      <Item
        name="Drone"
        icon={drone}
        number={props.item_map['Drone']['number']}
        onClick={() => props.onDrone()}
        field_state={props.field_state}
      />
      <Item
        name="Switch"
        icon={switchs}
        number={props.item_map['Switch']['number']}
        onClick={() => props.onSwitch()}
        field_state={props.field_state}
      />
    </div>
  );
}
