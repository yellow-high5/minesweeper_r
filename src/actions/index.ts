export const handleReset = function (): any {
  return {
    type: 'RESET_GAME',
  };
};

export const clickSquare = function (x: number, y: number): any {
  return {
    type: 'MOVE_SQUARE',
    x,
    y,
  };
};
/*
export const useMarking = () => {
  return {
    type: 'USE_MARKING',
  };
};

export const clickMarking = () => {
  return {
    type: 'MARKING_SQUARE',
  };
};

export const dobuleClickUnmarking = () => {
  return {
    type: 'REMOVE_MARKING',
  };
};

export const useScope = () => {
  return {
    type: 'USE_SCOPE',
  };
};

export const useDrone = () => {
  return {
    type: 'USE_DRONE',
  };
};

export const useSwitch = () => {
  return {
    type: 'USE_SWITCH',
  };
};
*/
