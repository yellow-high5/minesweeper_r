import React from 'react';

type Props = {
  icon: React.ReactElement;
  name: string;
  number: number;
  field_state: string;
  onClick: () => void;
};

export default function Item(props: Props) {
  return (
    <div className="Item">
      {props.icon}
      <p className="item-name">{props.name}</p>
      <div className="item-state">
        <p className="item-number">{props.number}</p>
        <button
          disabled={
            props.field_state === 'MARKING' || props.field_state === 'GAMEOVER'
              ? true
              : false
          }
          className="item-use"
          onClick={() => props.onClick()}
        >
          Use this
        </button>
      </div>
    </div>
  );
}
