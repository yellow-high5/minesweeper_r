import React from 'react';

type Props = {
  value: number;
};

export default function Explode(props: Props) {
  return (
    <button className="Explode" disabled={true}>
      {props.value}
    </button>
  );
}
