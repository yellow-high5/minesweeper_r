import React from 'react';

type Props = {
  value: number;
  disabled: boolean;
  onClick: () => void;
};

export default function Square(props: Props) {
  return (
    <button
      className="Square"
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}
