import React from 'react';

type Props = {
  value: number;
};

export default function Current(props: Props) {
  return (
    <button className="Current" disabled={true}>
      {props.value}
    </button>
  );
}
