import React from 'react';

type Props = {
  onDoubleClick: () => void;
};

export default function Marking(props: Props) {
  return (
    <button className="Marking" onDoubleClick={() => props.onDoubleClick()} />
  );
}
