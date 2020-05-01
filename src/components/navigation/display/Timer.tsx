import React, { useEffect } from 'react';

export default function Timer() {
  useEffect(() => {
    alert('mount');
  });

  return (
    <div className="TimeDisplay">
      <span>
        Time: <span id="basicUsage">00:00:00</span>
      </span>
    </div>
  );
}
