import '../../css/Board.css';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { clickSquare } from '../../actions';
import {
  BOARD_TYPE,
  FIELD_COL,
  FIELD_ROW,
  FIELD_STATE,
} from '../../utils/parameter';
import Bomb from './panel/Bomb';
import Current from './panel/Current';
import Explode from './panel/Explode';
import Square from './panel/Square';

interface State {
  cur_loc: [number, number];
  board: any;
  field_state: FIELD_STATE;
}

const mapState = (state: State) => ({
  cur_loc: state.cur_loc,
  board: state.board,
  field_state: state.field_state,
});

const mapDispatch = {
  clickSquare: (x: number, y: number) => ({ type: 'MOVE_SQUARE', x: x, y: y }),
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function Board(props: Props) {
  let field: Array<React.ReactElement> = [];

  if (props.field_state === FIELD_STATE.GAMEOVER) {
    for (let x = 0; x < FIELD_ROW; x++) {
      for (let y = 0; y < FIELD_COL; y++) {
        if (props.board.bomb_count_map[x][y] === -1) {
          field.push(<Bomb />);
        } else if (props.board.field_status_map[x][y] === BOARD_TYPE.MINED) {
          field.push(<Explode value={props.board.bomb_count_map[x][y]} />);
        } else {
          field.push(<Explode value={null} />);
        }
      }
    }
  } else {
    for (let x = 0; x < FIELD_ROW; x++) {
      for (let y = 0; y < FIELD_COL; y++) {
        if (props.cur_loc.toString() === [x, y].toString()) {
          field.push(<Current value={props.board.bomb_count_map[x][y]} />);
        } else {
          switch (props.board.field_status_map[x][y]) {
            case BOARD_TYPE.G:
              field.push(
                <Square
                  value={'G'}
                  disabled={false}
                  onClick={() => alert('mine')}
                />,
              );
              break;
            case BOARD_TYPE.O:
              field.push(
                <Square
                  value={'O'}
                  disabled={true}
                  onClick={() => alert('mine')}
                />,
              );
              break;
            case BOARD_TYPE.A:
              field.push(
                <Square
                  value={'A'}
                  disabled={true}
                  onClick={() => alert('mine')}
                />,
              );
              break;
            case BOARD_TYPE.L:
              field.push(
                <Square
                  value={'L'}
                  disabled={true}
                  onClick={() => alert('mine')}
                />,
              );
              break;
            case BOARD_TYPE.MINED:
              field.push(
                <Square
                  value={props.board.bomb_count_map[x][y]}
                  disabled={false}
                  onClick={() => alert('mine')}
                />,
              );
              break;
            case BOARD_TYPE.MINABLE:
              field.push(
                <Square
                  value={null}
                  disabled={false}
                  onClick={() => props.clickSquare(x, y)}
                />,
              );
              break;
            default:
              field.push(
                <Square
                  value={null}
                  disabled={true}
                  onClick={() => alert('mine')}
                />,
              );
          }
        }
      }
    }
  }

  return (
    <div className="Board">
      {field}
      {/* <Bomb />
      <Current value={2} />
      <Bombed />
      <Explode value={3} />
      <Square value={1} disabled={false} onClick={() => alert('mine')} />
      <Marking onDoubleClick={() => alert('marking')} /> */}
    </div>
  );
}

export default connector(Board);
