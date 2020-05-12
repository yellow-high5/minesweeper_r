import { AROUND_LOC, BOARD_TYPE, FIELD_COL, FIELD_ROW } from './parameter';

export function countAroundBombs(
  bomb_loc: number[][],
  cur_loc: [number, number],
) {
  const cur_around_loc: [number, number][] = AROUND_LOC.map((loc) => [
    cur_loc[0] + loc[0],
    cur_loc[1] + loc[1],
  ]);

  let count = 0;
  for (let i = 0; i < cur_around_loc.length; i++) {
    if (
      bomb_loc
        .map((loc) => loc.toString())
        .includes(cur_around_loc[i].toString())
    ) {
      count++;
    }
  }
  return count;
}

export function calcBombCountMap(bomb_loc: number[][]): number[][] {
  let result = [];

  for (let x = 0; x < FIELD_ROW; x++) {
    let line = [];
    for (let y = 0; y < FIELD_COL; y++) {
      if (bomb_loc.map((loc) => loc.toString()).includes([x, y].toString())) {
        line.push(-1);
      } else {
        const bomb_number = countAroundBombs(bomb_loc, [x, y]);
        line.push(bomb_number);
      }
    }
    result.push(line);
  }

  return result;
}

export function calcItemCheckMap(item_loc: number[][]): boolean[][] {
  let result = [];

  for (let x = 0; x < FIELD_ROW; x++) {
    let line = [];
    for (let y = 0; y < FIELD_COL; y++) {
      if (item_loc.map((loc) => loc.toString()).includes([x, y].toString())) {
        line.push(true);
      } else {
        line.push(false);
      }
    }
    result.push(line);
  }

  return result;
}

export function calcMinableMap(board: BOARD_TYPE[][]): BOARD_TYPE[][] {
  let result = Object.assign(board);

  board.map((line, x_index) => {
    line.map((value, y_index) => {
      if (value === BOARD_TYPE.MINED) {
        AROUND_LOC.map((around_loc) => {
          const calc_x_index = x_index + around_loc[0];
          const calc_y_index = y_index + around_loc[1];
          if (
            calc_x_index >= 0 &&
            calc_x_index < FIELD_ROW &&
            calc_y_index >= 0 &&
            calc_y_index < FIELD_COL &&
            board[calc_x_index][calc_y_index] === BOARD_TYPE.UNMINED
          ) {
            result[calc_x_index][calc_y_index] = BOARD_TYPE.MINABLE;
          }
        });
      }
    });
  });
  return result;
}

export function countFieldBombs(bomb_count_map: number[][]): number {
  let count = 0;

  bomb_count_map.map((line) => {
    line.map((value) => {
      if (value === -1) {
        count++;
      }
    });
  });

  return count;
}
