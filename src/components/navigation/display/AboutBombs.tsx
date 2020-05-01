import React from 'react';

type Props = {
  number: number;
};

export default function AboutBombs(props: Props) {
  return (
    <div className="AboutBombs">
      <p>Bomb's number</p>
      <span>{props.number}</span>
    </div>
  );
}
