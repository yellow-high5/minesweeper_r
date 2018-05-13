import React, { Component } from 'react';
import Navigation from './Navigation';
import Board from './Board';
import Itemlist from './Itemlist';
import '../css/Game.css';

//とりあえずSTAGE1を作る。const STAGE     = {'STAGE1':{bomb_number:20,item_number:5,}, 'STAGE2':{bomb_number:30,item_number:10,}, 'STAGE3':{bomb_number:40,item_number:10,}};
const ITEMS      = ['Marking', 'Scope', 'Drone', 'Switch', 'Detectar', 'Demine'];
const FIELD_ROW  = 12;
const FIELD_COL  = 18;
const START_LOC  = [[4,0], [5,0], [6,0], [7,0]];
const GOAL_LOC   = {'G':[4,17], 'O':[5,17], 'A':[6,17], 'L':[7,17]};
const AROUND_LOC = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];


class Game extends Component {
  constructor(props) {
    super(props);

    // It defines each state.
    let cur_loc = [5,0];
    let mined_loc = new Array(12);
    for(let i = 0; i < 12; i++){
      mined_loc[i] = new Array(18).fill(null);
    }
    let bomb_loc = this.deployRandom(30);
    let item_loc = this.deployRandom(10);

    // It set start and goal.
    START_LOC.map((loc) => mined_loc[loc[0]][loc[1]] = this.countBombs(bomb_loc, [loc[0],loc[1]]))
    for(let[key] in GOAL_LOC){mined_loc[GOAL_LOC[key][0]][GOAL_LOC[key][1]] = key}

    this.state = {
      cur_loc: cur_loc,
      mined_loc: mined_loc,   //[[Array18] * 12]
      bomb_loc: bomb_loc,     //[[x,y]...]
      item_loc: item_loc,     //[[x,y]...]
      stage: '',
    };
  }

  handleClick(i,j) {
    const cur_loc = [i, j];
    const mined_loc = this.state.mined_loc.slice();

    //GOALだったら、、、
    //採掘済みだったら、、、
    if(this.state.mined_loc[i][j] !== null){
      this.setState({
        cur_loc: [i, j],
      });
      return;
    }
    //爆弾だったら、、、ゲームオーバーを返す
    if(this.state.bomb_loc.map((loc) => loc.toString()).includes(cur_loc.toString())){
      alert('GAMEOVER');
      return;
    }
    //アイテムがあったら、、、
    if(this.state.item_loc.map((loc) => loc.toString()).includes(cur_loc.toString())){
      alert('you get an item!!');
      //items_loc配列からlocを削除する。this.setState('')
    }
    //安全地帯だったら、、、stateにmined_locを追加
    mined_loc[i][j] = this.countBombs(this.state.bomb_loc, cur_loc);
    this.setState({
      cur_loc: [i, j],
      mined_loc: mined_loc,
    })

  }

  deployRandom(number) {
    let random_loc = [];
    let no_choices = [].concat(START_LOC).concat(GOAL_LOC);

    for(let i = 0; i < number; i++){
      let new_loc = [getRandomInt(12), getRandomInt(18)];
      // not include no_choices array
      if(!no_choices.map((loc) => loc.toString()).includes(new_loc.toString())){
        random_loc.push(new_loc);
        no_choices.push(new_loc);
      }
      // include no_choices array -> again
      else{
        i--;
      }
    }
    return random_loc;
  }

  countBombs(bomb_loc, cur_loc) {
    const cur_around = AROUND_LOC.map((loc) => [cur_loc[0]+loc[0], cur_loc[1]+loc[1]]);

    let count = 0;
    for(let i = 0; i < cur_around.length; i++){
      if(bomb_loc.map((loc) => loc.toString()).includes(cur_around[i].toString())){
        count++;
      }
    }
    return count;
  }

  getMinable(mined_loc) {
    // It extracts mined (x,y) coordinate
    let mined_loc_xy = [];
    for(let i = 0; i < FIELD_ROW; i++){
      for(let j = 0; j < FIELD_COL; j++){
        let xy_state = mined_loc[i][j]
        if(xy_state !== null && !'GOAL'.includes(xy_state)){
          mined_loc_xy.push([i,j])
        }
      }
    }
    // It calculates minable location
    let minable_loc_xy = [];
    for(let i = 0; i < mined_loc_xy.length; i++){
      let xy_around = AROUND_LOC.map((loc) => [mined_loc_xy[i][0]+loc[0], mined_loc_xy[i][1]+loc[1]])
      minable_loc_xy = minable_loc_xy.concat(xy_around);
    }
    minable_loc_xy = minable_loc_xy.filter((loc_xy) => loc_xy[0] >= 0 && loc_xy[0] < 12 && loc_xy[1] >= 0 && loc_xy[1] < 18)

    //not minable location sets disabled
    let minable_loc = new Array(12);
    for(let i = 0; i < 12; i++){
      minable_loc[i] = new Array(18).fill('disabled');
    }
    //minable location sets null
    for(let xy of minable_loc_xy){
      let x = xy[0];
      let y = xy[1];
      minable_loc[x][y] = null;
    }

    return minable_loc;
  }

  render() {
    const cur_loc = this.state.cur_loc;
    const mined_loc = this.state.mined_loc;
    const minable_loc = this.getMinable(mined_loc);
    const bomb_number = this.state.bomb_loc.length;
    return (
      <div className="Game">
        <Navigation bomb_number={bomb_number}/>
        <Board
          cur_loc={cur_loc}
          mined_loc={mined_loc}
          minable_loc={minable_loc}
          onClick={(i,j) => this.handleClick(i,j)}
        />
        <Itemlist />
      </div>
    );
  }
}



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



export default Game;
