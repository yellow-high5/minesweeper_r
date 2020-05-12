import React from 'react';

type Props = {
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
};

export default function Explode(props: Props) {
  return (
    <button className="Explode" disabled={true}>
      {props.value}
    </button>
  );
}
