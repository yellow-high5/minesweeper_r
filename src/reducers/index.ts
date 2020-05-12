import { combineReducers } from 'redux';

import { calcMinableMap } from '../utils/calculator';
import { generateBoard, generateItemMap } from '../utils/generator';
import { BOARD_TYPE, FIELD_STATE } from '../utils/parameter';

// 現在のフィールドの状態
const field_state = (state: FIELD_STATE = FIELD_STATE.EXPLORE, action: any) => {
  switch (action.type) {
    case 'RESET_GAME':
      return FIELD_STATE.EXPLORE;
    case 'MINE_BOMB':
      return FIELD_STATE.GAMEOVER;
    default:
      return state;
  }
};

// １つ前のフィールドの状態
const pre_field_state = (
  state: FIELD_STATE = FIELD_STATE.EXPLORE,
  action: any,
) => {
  switch (action.type) {
    case 'RESET_GAME':
      return FIELD_STATE.EXPLORE;
    default:
      return state;
  }
};

// ステージレベル
const stage_level = (state: 1 | 2 | 3 = 1, action: any) => {
  switch (action.type) {
    case 'RESET_GAME':
      return 1;
    default:
      return state;
  }
};

// 現在地
const cur_loc = (state: [number, number] = [5, 0], action: any) => {
  switch (action.type) {
    case 'RESET_GAME':
      return [5, 0];
    case 'MOVE_SQUARE':
      return [action.x, action.y];
    default:
      return state;
  }
};

// ボード
const board = (state: any = generateBoard(10, 5), action: any) => {
  switch (action.type) {
    case 'RESET_GAME':
      return generateBoard(10, 5);
    case 'MOVE_SQUARE':
      state.field_status_map[action.x][action.y] = BOARD_TYPE.MINED;
      state.field_status_map = calcMinableMap(state.field_status_map);
      return state;
    default:
      return state;
  }
};

// アイテムリスト
const item_list = (state = generateItemMap(), action: any) => {
  switch (action.type) {
    case 'RESET_GAME':
      return generateItemMap;
    default:
      return state;
  }
};

export default combineReducers({
  field_state,
  pre_field_state,
  stage_level,
  cur_loc,
  board,
  item_list,
});
