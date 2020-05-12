import React from 'react';

type Props = {
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null | 'G' | 'O' | 'A' | 'L';
  disabled: boolean;
  onClick: any;
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
