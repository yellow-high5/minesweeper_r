export enum FIELD_STATE {
  EXPLORE = 'EXPLORE',
  MARKING = 'MARKING',
  GOAL = 'GOAL',
  GAMEOVER = 'GAMEOVER',
}

export enum ITEMS {
  MARKING = 'MARKING',
  SCOPE = 'SCOPE',
  DRONE = 'DRONE',
  SWITCH = 'SWITCH',
}

export enum BOARD_TYPE {
  MINED = 'MINED',
  UNMINED = 'UNMINED',
  MINABLE = 'MINABLE',
  BOMB = 'BOMB',
  G = 'G',
  O = 'O',
  A = 'A',
  L = 'L',
  MARKING = 'MARKING',
  BOMBED = 'BOMBED',
}

export const FIELD_ROW = 12;
export const FIELD_COL = 18;

export const START_LOC = [
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
];
export const GOAL_LOC = [
  [4, FIELD_COL - 1],
  [5, FIELD_COL - 1],
  [6, FIELD_COL - 1],
  [7, FIELD_COL - 1],
];
export const AROUND_LOC = [
  [0, 0],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
