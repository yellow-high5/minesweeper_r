import React from 'react';

type Props = {
  stage: string;
};

export default function AboutStage(props: Props) {
  return (
    <div className="AboutStage">
      <span>{props.stage}</span>
    </div>
  );
}
