import React from 'react';

type Props = {
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export default function Current(props: Props) {
  return (
    <button className="Current" disabled={true}>
      {props.value}
    </button>
  );
}
