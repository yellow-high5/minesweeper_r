import React, { Component } from 'react';
import Navigation from './Navigation';
import Board from './Board';
import Itemlist from './Itemlist';
import '../css/Game.css';
import Timer from 'easytimer'
import swal from '@sweetalert/with-react';

// ステージレベル
const STAGES      = {'STAGE-1':{bomb_number:20,item_number:4,},
                     'STAGE-2':{bomb_number:30,item_number:8,},
                     'STAGE-3':{bomb_number:40,item_number:12,}
                   };

const ITEMS       = ['Marking', 'Scope', 'Drone', 'Switch'];
const FIELD_ROW   = 12;
const FIELD_COL   = 18;
//フィールドの状態:'EXPLORE'=挑戦中,'MARKING'=アイテムマーキング使用中,'GOAL'=ステージクリア,'GAMEOVER'=ゲームオーバー
const FIELD_STATE = ['EXPLORE','MARKING','GOAL','GAMEOVER'];
const START_LOC   = [[4,0], [5,0], [6,0], [7,0]];
const GOAL_LOC    = {'G':[4,17], 'O':[5,17], 'A':[6,17], 'L':[7,17]};
const GOAL_CHECK  = [[4,17],[5,17],[6,17],[7,17]];
const AROUND_LOC  = [[0,0], [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];


class Game extends Component {
  constructor(props) {

    super(props);

    //ステータスの初期値設定(初めはSTAGE-1から)
    let stage = 'STAGE-1'
    let stage_settings = STAGES[stage];
    let cur_loc = [5,0];
    let marking_loc = new Array();
    let bombed_loc = new Array();
    let mined_loc = new Array(12);
    for(let i = 0; i < 12; i++){
      mined_loc[i] = new Array(18).fill(null);
    }
    let bomb_loc = this.deployBomb(stage_settings['bomb_number']);
    let item_loc = this.deployItem(stage_settings['item_number'], bomb_loc);  //!これじゃいけないかも...
    let item_map = {
                    'Marking':{'description':'', 'number':bomb_loc.length},
                    'Scope'  :{'description':'', 'number':0},
                    'Drone'  :{'description':'', 'number':0},
                    'Switch' :{'description':'', 'number':0}
                  };

    //スタートとゴールを設定する
    //スタートの位置を掘り起こし済みにし、周りの爆弾カウントを設定
    START_LOC.map((loc) => mined_loc[loc[0]][loc[1]] = this.countBombs(bomb_loc, [loc[0],loc[1]]))
    //ゴールの位置を掘り起こし済みにし、G,O,A,Lのアルファベットを設定
    for(let[key] in GOAL_LOC){
      mined_loc[GOAL_LOC[key][0]][GOAL_LOC[key][1]] = key
    }

　　 //ゲームのステータス
    this.state = {
      stage: stage,                //現在のステージレベル
      cur_loc: cur_loc,            //現在地                     [x,y]
      marking_loc: marking_loc,    //マーキングされた場所         [[x,y]...]
      bombed_loc: bombed_loc,      //安全地帯(=爆弾破壊済み)      [[x,y]...]
      mined_loc: mined_loc,        //掘った場所                 [[Array18] * 12]
      bomb_loc: bomb_loc,          //爆弾の場所                 [[x,y]...]
      item_loc: item_loc,          //アイテムの場所              [[[x,y], "item_name"]...]
      item_map: item_map,          //アイテムのリストマップ       {'item_name':{'description':'', 'number':1}, ...}
      field_state: 'EXPLORE',      //フィールドの状態
      pre_field_state: 'EXPLORE',  //場所を移動する前のフィールドの状態を保存する
    };

    //時間を動かす
    startTimer();
  }

  //ボードを指定したステージで実装する(引数をしてしなければ、STAGE-1でボードを初期化する)
  //前のステージで持っていたアイテムは引き継げる(リセット時は引数を指定しない)
  exploreClick(stage = 'STAGE-1', pre_item_number = {'Scope':0,'Drone':0,'Switch':0}){
    let stage_settings = STAGES[stage];
    let cur_loc = [5,0];
    let marking_loc = new Array();
    let bombed_loc = new Array();
    let mined_loc = new Array(12);
    for(let i = 0; i < 12; i++){
      mined_loc[i] = new Array(18).fill(null);
    }
    let bomb_loc = this.deployBomb(stage_settings['bomb_number']);
    let item_loc = this.deployItem(stage_settings['item_number'], bomb_loc);
    let item_map = {
                    'Marking':{'description':'', 'number':bomb_loc.length},
                    'Scope'  :{'description':'', 'number':pre_item_number['Scope']},
                    'Drone'  :{'description':'', 'number':pre_item_number['Drone']},
                    'Switch' :{'description':'', 'number':pre_item_number['Switch']}
                  };

    START_LOC.map((loc) => mined_loc[loc[0]][loc[1]] = this.countBombs(bomb_loc, [loc[0],loc[1]]))
    for(let[key] in GOAL_LOC){mined_loc[GOAL_LOC[key][0]][GOAL_LOC[key][1]] = key}

    this.setState({
      stage: stage,
      cur_loc: cur_loc,
      marking_loc: marking_loc,
      bombed_loc: bombed_loc,
      mined_loc: mined_loc,
      bomb_loc: bomb_loc,
      item_loc: item_loc,
      item_map: item_map,
      field_state: 'EXPLORE',
      pre_field_state: 'EXPLORE',
    });

    startTimer();
  }

  //!Squareを押したときの処理
  handleClick(i,j) {
    let stage = this.state.stage;
    const cur_loc = [i, j];
    let marking_loc = this.state.marking_loc;
    const mined_loc = this.state.mined_loc;
    const bomb_loc = this.state.bomb_loc;
    let item_loc = this.state.item_loc;
    let item_map = this.state.item_map;
    const field_state = this.state.field_state;
    const pre_field_state = this.state.pre_field_state;

    //GOALに到着したら、次のステージの案内をする
    if(GOAL_CHECK.map((loc)=>loc.toString()===cur_loc.toString()).includes(true)){
      let next_stage = 'STAGE-' + String((Number(stage[6])+1));
      let pre_item_number  = {'Scope':item_map['Scope']['number'],'Drone':item_map['Drone']['number'],'Switch':item_map['Switch']['number']};
      //アラートを表示(次のステージに進むorこのステージにとどまる)
      swal({
        text: "Congratulations! Proceed to the Next Stage?",
        icon: "success",
        buttons: {
          confirm: "Let's go!",
          cancel: "Not yet.",
        },
      })
      .then((value) => {
        if(value)this.exploreClick(next_stage, pre_item_number);
      });

      //フィールドのステータスを'GOAL'にする
      this.setState({
        pre_field_state: field_state,
        field_state: FIELD_STATE[2],
      });
    }
    //ステータスがMARKINGだったら、クリックするとSquareがMarkingに変わり、mined_locの位置だったら現在地へ
    let squares = document.getElementsByClassName('Board')[0].childNodes
  　if(field_state===FIELD_STATE[1]){
      //まだ掘られていない場所であればmarking_locに座標を追加
      if(mined_loc[i][j] === null){
        marking_loc.push([i,j]);
        this.setState({
          marking_loc: marking_loc,
        });
        for(let i = 0;i < FIELD_ROW * FIELD_COL;i++){
          squares[i].style.cursor = ""
        }
        this.setState({
          field_state: pre_field_state,
        });
        this.usedItem('Marking')
      }
      //すでに掘っている場所であれば、field_stateのみ変更
      else{
        this.setState({
          cur_loc: [i, j],
          field_state: pre_field_state,
        });
        for(let i = 0;i < FIELD_ROW * FIELD_COL;i++){
          squares[i].style.cursor = ""
        }
      }
      return;
    }

    //採掘済みだったら、現在地の場所を変更するだけ
    if(this.state.mined_loc[i][j] !== null){
      this.setState({
        cur_loc: [i, j],
      });
      return;
    }
    //爆弾だったら、ゲームオーバーを返す
    if(bomb_loc.map((loc) => loc.toString()).includes(cur_loc.toString())){
      this.setState({
        pre_field_state: field_state,
        field_state: 'GAMEOVER',
      });
      return;
    }
    //!アイテムがあったら、アイテムリストにアイテムを追加し、獲得したアイテムのアラートを出す
    if(item_loc.map((item) => item[0].toString()).includes(cur_loc.toString())){
      let get_item_name;
      for(let i = 0;i < item_loc.length;i++){
        if(item_loc[i][0].toString() === cur_loc.toString()){
           get_item_name = item_loc[i][1];
           //items_loc配列から削除する
           item_loc.splice(i,1);
        }
      }
      let map_count = item_map[get_item_name]['number'] + 1 //ゲットしたアイテムの数を増やす
      item_map[get_item_name]['number'] = map_count
      this.setState({
        item_loc: item_loc,
        item_map: item_map,
      });
      //アラートを表示
      swal({
        text: 'You get ' + get_item_name + '!!',
        buttons: {
          confirm: "OK",
        },
      });
    }

    //安全地帯だったら、、、stateにmined_locを追加
    mined_loc[i][j] = this.countBombs(bomb_loc, cur_loc);
    this.setState({
      cur_loc: [i, j],
      mined_loc: mined_loc,
    });
  }

  //爆弾の場所を決定する(number=爆弾の数)  return [[x,y]...]
  deployBomb(number) {
    let bomb_loc = [];
    let no_choices = [].concat(START_LOC).concat(GOAL_CHECK); //選んではいけない場所

    for(let i = 0; i < number; i++){
      let new_loc = [getRandomInt(12), getRandomInt(18)];
      // 選んではいけない場所じゃなかったら、ランダム配列に追加する
      if(!no_choices.map((loc) => loc.toString()).includes(new_loc.toString())){
        bomb_loc.push(new_loc);
        no_choices.push(new_loc);  //追加した場所は選んではいけない場所にも追加しておく
      }
      // 選んではいけない場所だったらやり直し
      else{
        i--;
      }
    }
    return bomb_loc;
  }

  //アイテムの場所を決定する(number=アイテムの数)爆弾の場所はアイテムの場所にしない  return [[[x,y], "item_name"]...]
  deployItem(number, bomb_loc) {
    let item_loc = [];  //[[[x,y], "item_name"]...]
    let no_choices = [].concat(bomb_loc).concat([5,0]); //選んではいけない場所(スタート時に選択されているパネルも除く)
    for(let i = 0; i < number; i++){
      let new_loc = [getRandomInt(12), getRandomInt(18)];
      // 選んではいけない場所じゃなかったら、ランダム配列に追加する
      if(!no_choices.map((loc) => loc.toString()).includes(new_loc.toString())){
        let item_name = ITEMS[getRandomInt(ITEMS.length-1) + 1];
        let new_item = [new_loc, item_name];
        item_loc.push(new_item);
        no_choices.push(new_loc);  //追加した場所は選んではいけない場所にも追加しておく
      }
      // 選んではいけない場所だったらやり直し
      else{
        i--;
      }
    }
    return item_loc;
  }


  //現在の場所の周りの爆弾の数を数える  return n
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

  //掘ることのできる場所を配列で返す  return [[Array18] * 12]
  getMinable(mined_loc, field_state) {
    // 掘った場所の配列mined_locをxy座標に変換する　　　つまり、[[Array18] * 12] => [[x,y]...]
    let mined_loc_xy = [];
    for(let i = 0; i < FIELD_ROW; i++){
      for(let j = 0; j < FIELD_COL; j++){
        let xy_state = mined_loc[i][j]
        //もし、フィールドのステータスがゴールだったら
        if(field_state === FIELD_STATE[2]){
          if(xy_state !== null){
            mined_loc_xy.push([i,j])
          }
        }
        //もし、フィールドのステータスがチャレンジだったら
        else{
          if(xy_state !== null && !'GOAL'.includes(xy_state)){
            mined_loc_xy.push([i,j])
          }
        }
      }
    }
    // 掘った場所から掘ることのできる場所を算出する
    let minable_loc_xy = [];
    for(let i = 0; i < mined_loc_xy.length; i++){
      let xy_around = AROUND_LOC.map((loc) => [mined_loc_xy[i][0]+loc[0], mined_loc_xy[i][1]+loc[1]])
      minable_loc_xy = minable_loc_xy.concat(xy_around);
    }
    minable_loc_xy = minable_loc_xy.filter((loc_xy) => loc_xy[0] >= 0 && loc_xy[0] < 12 && loc_xy[1] >= 0 && loc_xy[1] < 18)

    //minable_loc [[Array18] * 12]　すべての値にdisabledを設定
    let minable_loc = new Array(12);
    for(let i = 0; i < 12; i++){
      minable_loc[i] = new Array(18).fill('disabled');
    }
    //掘ることのできる場所にはnullを設定
    for(let xy of minable_loc_xy){
      let x = xy[0];
      let y = xy[1];
      minable_loc[x][y] = null;
    }

    return minable_loc;
  }


  //*****ITEM FUNCION*****

  //そのアイテムを持っているかどうか確認
  checkItem(item_name){
    const item_map = this.state.item_map;
    const item_number = item_map[item_name]['number'];
    if(item_number === 0){
      return false
    }
    else {
      return true
    }
  }

  //アイテム使用後、アイテムの数を１減らす
  usedItem(item_name){
    let item_map = this.state.item_map;
    let item_number = item_map[item_name]['number'];
    let bomb_loc = this.state.bomb_loc;
    let marking_loc = this.state.marking_loc;
    item_map['Marking']['number'] = bomb_loc.length - marking_loc.length;
    if(item_name !== 'Marking'){
      item_map[item_name]['number'] = item_number - 1;
    }
    this.setState({
      item_map: item_map,
    });
  }

  //*Marking...爆弾と思われる場所(掘ることのできる場所)にマーキングしてdisabledにする
  handleMarking() {
    if(!this.checkItem('Marking')){
      swal({
        title: "No Item",
        text: "You cannot use Marking...",
        icon: "warning",
        button: "OK",
      });
      return;
    }

    let cur_loc = this.state.cur_loc;
    let mined_loc = this.state.mined_loc;                       //[[Array18] * 12]
    let field_state = this.state.field_state;
    let minable_loc = this.getMinable(mined_loc,field_state);   //[[Array18] * 12]


    //マーキングをつけることができる場所を算出
      //掘ることのできる場所を[[x,y]...]の形にする
      let minable_loc_xy = [];
      for(let i = 0;i < FIELD_ROW; i++){
        for(let j = 0;j < FIELD_COL; j++){
          if(minable_loc[i][j] === null){
            minable_loc_xy.push([i,j]);
          }
        }
      }
      //掘った場所を[[x,y]...]の形にする
      let mined_loc_xy = [];
      for(let i = 0; i < FIELD_ROW; i++){
        for(let j = 0; j < FIELD_COL; j++){
          if(mined_loc[i][j] !== null){
            mined_loc_xy.push([i,j]);
          }
        }
      }
      let mined_loc_xy_comparable = mined_loc_xy.map((loc) => loc.toString()) //比較対象になるようにする
    let markable_loc = minable_loc_xy.filter((loc) => !mined_loc_xy_comparable.includes(loc.toString()));    //[[x,y]...]
    //カーソルをマーキングカーソルに変更
    let squares = document.getElementsByClassName('Board')[0].childNodes
    for(let loc of markable_loc){
      let position = FIELD_COL * loc[0] + loc[1];
      squares[position].style.cursor = "url('/img/marking.png'), auto";
    }
    this.setState({
      pre_field_state: field_state,
      field_state: FIELD_STATE[1],
    })

  }
  //マーキングをダブルクリックしたときマーキングを消す処理
  handledbClick(i,j) {
    let bomb_loc = this.state.bomb_loc;
    let marking_loc = this.state.marking_loc;
    let item_map = this.state.item_map;
    let delete_index;
    for(let index = 0;index < marking_loc.length;index++){
      if(marking_loc[index].toString() === [i,j].toString()){
        delete_index = index;
      }
    }
    marking_loc.splice(delete_index,1);
    item_map['Marking']['number'] = bomb_loc.length - marking_loc.length;
    this.setState({
      marking_loc: marking_loc,
      item_map: item_map,
    });
  }
  //*Scope...周囲を安全に掘り起こす
  handleScope() {
    if(!this.checkItem('Scope')){
      swal({
        title: "No Item",
        text: "You cannot use Scope...",
        icon: "warning",
        button: "OK",
      });
      return;
    }

    let cur_loc = this.state.cur_loc;
    let bombed_loc = this.state.bombed_loc;
    let mined_loc = this.state.mined_loc;
    let bomb_loc = this.state.bomb_loc;
    const cur_around = AROUND_LOC.map((loc) => [cur_loc[0]+loc[0], cur_loc[1]+loc[1]]).filter((loc_xy) => loc_xy[0] >= 0 && loc_xy[0] < 12 && loc_xy[1] >= 0 && loc_xy[1] < 18);
    for(let i = 0; i < cur_around.length; i++){
      for(let j = 0; j < bomb_loc.length; j++){
        if(cur_around[i].toString() === bomb_loc[j].toString()){
          let scoped_loc = bomb_loc.splice(j, 1);
          bombed_loc.push(scoped_loc);
        }
      }
    }
    let new_mined_loc = this.minedRendering(bomb_loc, mined_loc);
    cur_around.map((loc) => this.handleClick(loc[0],loc[1]));
    this.setState({
      cur_loc: cur_loc,
      bombed_loc: bombed_loc,
      mined_loc: new_mined_loc,
      bomb_loc: bomb_loc,
    });
    this.usedItem('Scope')
  }
  //!*Drone...ランダムに安全な場所に着地する
  handleDrone() {
    if(!this.checkItem('Drone')){
      swal({
        title: "No Item",
        text: "You cannot use Drone...",
        icon: "warning",
        button: "OK",
      });
      return;
    }

    let mined_loc = this.state.mined_loc;
    let bomb_loc = this.state.bomb_loc;
    let excluded_loc = mined_loc.concat(bomb_loc,START_LOC,GOAL_CHECK)
    let flag = true;
    let launch_loc = [];
    while(flag){
      launch_loc = [getRandomInt(12), getRandomInt(18)];
      if(!excluded_loc.map((loc) => loc.toString()).includes(launch_loc.toString())){
        flag = false;
      }
    }
    this.handleClick(launch_loc[0], launch_loc[1]);
    this.usedItem('Drone')
  }
  //*Switch...適当に爆弾を破壊する
  handleSwitch() {
    if(!this.checkItem('Switch')){
      swal({
        title: "No Item",
        text: "You cannot use Switch...",
        icon: "warning",
        button: "OK",
      });
      return;
    }

    let bombed_loc = this.state.bombed_loc;
    let mined_loc = this.state.mined_loc;
    let bomb_loc = this.state.bomb_loc;
    let switched_loc = bomb_loc.splice(getRandomInt(bomb_loc.length), 1);
    bombed_loc.push(switched_loc);
    let new_mined_loc = this.minedRendering(bomb_loc, mined_loc);

    this.setState({
      bombed_loc: bombed_loc,
      mined_loc: new_mined_loc,
      bomb_loc: bomb_loc,
    })
    this.usedItem('Switch');
  }

  //change bomb_loc using items
  minedRendering(bomb_loc, mined_loc) {
    for(let i = 0; i < 12; i++){
      for(let j = 0; j < 18; j++){
        if(mined_loc[i][j] !== null && !'GOAL'.includes(mined_loc[i][j])){
          mined_loc[i][j] = this.countBombs(bomb_loc, [i, j]);
        }
      }
    }

    return mined_loc;
  }





  render() {
    const stage = this.state.stage;
    const field_state = this.state.field_state;
    const cur_loc = this.state.cur_loc;
    const marking_loc = this.state.marking_loc;
    const bombed_loc = this.state.bombed_loc;
    const mined_loc = this.state.mined_loc;
    const minable_loc = this.getMinable(mined_loc,field_state);  //掘ることができる場所     [[Array18] * 12]
    const item_map = this.state.item_map;
    const bomb_loc = this.state.bomb_loc;
    const bomb_number = bomb_loc.length;
    console.log(minable_loc); //確認用:レンダリングするたびに掘れる場所をコンソールに表示

    return (
      <div className="Game">
        <Navigation
          stage={stage}
          field_state={field_state}
          bomb_number={bomb_number}
          resetClick={() => this.exploreClick()}
        />
        <Board
          field_state={field_state}
          cur_loc={cur_loc}
          marking_loc={marking_loc}
          bombed_loc={bombed_loc}
          mined_loc={mined_loc}
          minable_loc={minable_loc}
          bomb_loc={bomb_loc}
          onClick={(i,j) => this.handleClick(i,j)}
          onDoubleClick={(i,j) => this.handledbClick(i,j)}
        />
        <Itemlist
          field_state={field_state}
          item_map={item_map}
          onMarking={() => this.handleMarking()}
          onScope={() => this.handleScope()}
          onDrone={() => this.handleDrone()}
          onSwitch={() => this.handleSwitch()}
        />
      </div>
    );
  }
}


//タイマーを生成し、タイマーを更新する
let timer;
function startTimer() {
  timer = new Timer();
  let elapseTime = (e) => {document.getElementById('basicUsage').textContent = timer.getTimeValues().toString();}
  timer.start();
  timer.addEventListener('secondsUpdated', elapseTime);
}


//ランダム数を生成する(max=最大値、maxが10なら0~9)
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



export default Game;
