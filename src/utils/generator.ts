import {
  calcBombCountMap,
  calcItemCheckMap,
  calcMinableMap,
} from './calculator';
import {
  BOARD_TYPE,
  FIELD_COL,
  FIELD_ROW,
  GOAL_LOC,
  ITEMS,
  START_LOC,
} from './parameter';

interface BoardMap {
  field_status_map: BOARD_TYPE[][];
  bomb_count_map: number[][];
  item_check_map: boolean[][];
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomItem(): ITEMS {
  return ITEMS.DRONE;
  //return ITEMS[getRandomInt(ITEMS.length - 1) + 1];
}

export function generateBoard(
  bomb_number: number,
  item_number: number,
): BoardMap {
  let no_choice_loc: number[][] = START_LOC.concat(GOAL_LOC);
  let board: BOARD_TYPE[][] = [];
  let bomb_loc: number[][] = [];
  let item_loc: number[][] = [];

  // 爆弾の場所を決定
  for (let i = 0; i < bomb_number; i++) {
    let new_loc = [getRandomInt(FIELD_ROW), getRandomInt(FIELD_COL)];
    if (
      !no_choice_loc.map((loc) => loc.toString()).includes(new_loc.toString())
    ) {
      bomb_loc.push(new_loc);
      no_choice_loc.push(new_loc);
    } else {
      i--;
    }
  }

  // アイテムの場所を決定
  for (let i = 0; i < item_number; i++) {
    let new_loc = [getRandomInt(FIELD_ROW), getRandomInt(FIELD_COL)];
    if (
      !no_choice_loc.map((loc) => loc.toString()).includes(new_loc.toString())
    ) {
      item_loc.push(new_loc);
      no_choice_loc.push(new_loc);
    } else {
      i--;
    }
  }

  // フィールドを作成
  for (let x = 0; x < FIELD_ROW; x++) {
    let line = [];
    for (let y = 0; y < FIELD_COL; y++) {
      line.push(BOARD_TYPE.UNMINED);
    }
    board.push(line);
  }

  START_LOC.map((loc) => {
    board[loc[0]][loc[1]] = BOARD_TYPE.MINED;
  });

  board[4][17] = BOARD_TYPE.G;
  board[5][17] = BOARD_TYPE.O;
  board[6][17] = BOARD_TYPE.A;
  board[7][17] = BOARD_TYPE.L;

  console.log(calcMinableMap(board));

  return {
    field_status_map: calcMinableMap(board),
    bomb_count_map: calcBombCountMap(bomb_loc),
    item_check_map: calcItemCheckMap(item_loc),
  };
}

export function generateItemMap() {
  return {
    MARKING: 20,
    SCOPE: 0,
    DRONE: 0,
    SWITCH: 0,
  };
}
