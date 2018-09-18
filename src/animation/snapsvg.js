import Snap from 'snapsvg-cjs';

function animationLogo(){
  let test1 = Snap('#test1');
  test1.removeClass('st2');
  //test1.animate({???},SPEED,mina.easein);
  test1.attr({fill: "r()#fff-#61DAFB"});
  //test1 = test1.pattern(0, 0, 10, 10);
  animationBomb();
  animationSpark();
  animationSpark1();
  animationSpark2();
  animationSpark3();
  animationSpark4();
  animationSpark5();
  animationSpark6();
}

//Bomb Animation
let svgBomb = Snap('#svg-bomb'),
    bombPath = ['M365.6,287.5c-5.9,87.1-79.5,153-164.4,147.3c-84.9-5.8-149-81-143.1-168.1s79.5-153,164.4-147.3S371.5,200.4,365.6,287.5z',
                'M393.6,289.4c-7,103-94,181-194.3,174.2C98.9,456.8,23.2,367.8,30.1,264.8s94-181,194.3-174.2C324.8,97.4,400.5,186.4,393.6,289.4z'],
    SPEED = 750;


let animationBomb_count = 0;
function animationBomb(){
  svgBomb.animate({d:bombPath[animationBomb_count]},SPEED,animationBomb);
  animationBomb_count++;
  if(animationBomb_count===bombPath.length){
    animationBomb_count = 0;
  }
}

//Spark Animation
let svgSpark = Snap('#svg-spark'),
    spark0 = Snap('#svg-spark0'),
    spark1 = Snap('#svg-spark1'),
    spark2 = Snap('#svg-spark2'),
    spark3 = Snap('#svg-spark3'),
    spark4 = Snap('#svg-spark4'),
    spark5 = Snap('#svg-spark5'),
    spark6 = Snap('#svg-spark6'),
    sparks = [spark0, spark1, spark2, spark3, spark4, spark5, spark6],
    sparkLine = [[["710.6","158.4"],["659.2","51.4"],["684.7","103"],["664.6","177.4"],["616","81.3"],["615.6","216.6"],["576.6","116.4"]],
                 [["702.6","155"],["656.6","62.1"],["705.7","93.3"],["684.7","195.6"],["611.7","54.2"],["616.5","204.3"],["566.6","112.9"]]];
let children = svgSpark.children();

let animationSpark_count = 0;
function animationSpark(){
  let point = sparkLine[animationSpark_count][0];
  sparks[0].animate({x2:point[0],y2:point[1]},100,animationSpark);
  //point = sparkLine[animationSpark_count][1];
  //sparks[1].animate({x2:point[0],y2:point[1]},300,mina.easein,animationSpark);
  //point = sparkLine[animationSpark_count][2];
  //sparks[2].animate({x2:point[0],y2:point[1]},300,mina.easein,animationSpark);
  //point = sparkLine[animationSpark_count][3];
  //sparks[3].animate({x2:point[0],y2:point[1]},300,mina.easein,animationSpark);
  //point = sparkLine[animationSpark_count][4];
  //sparks[4].animate({x2:point[0],y2:point[1]},300,mina.easein,animationSpark);
  //point = sparkLine[animationSpark_count][5];
  //sparks[5].animate({x2:point[0],y2:point[1]},300,mina.easein,animationSpark);
  //point = sparkLine[animationSpark_count][6];
  //sparks[6].animate({x2:point[0],y2:point[1]},300,mina.easein,animationSpark);

  animationSpark_count++;
  if(animationSpark_count===sparkLine.length){
    animationSpark_count = 0;
  }
}

let animationSpark1_count = 0;
function animationSpark1(){
  let point = sparkLine[animationSpark1_count][1];
  sparks[1].animate({x2:point[0],y2:point[1]},100,animationSpark1);
  animationSpark1_count++;
  if(animationSpark1_count===sparkLine.length){
    animationSpark1_count = 0;
  }
}

let animationSpark2_count = 0;
function animationSpark2(){
  let point = sparkLine[animationSpark2_count][2];
  sparks[2].animate({x2:point[0],y2:point[1]},100,animationSpark2);
  animationSpark2_count++;
  if(animationSpark2_count===sparkLine.length){
    animationSpark2_count = 0;
  }
}

let animationSpark3_count = 0;
function animationSpark3(){
  let point = sparkLine[animationSpark3_count][3];
  sparks[3].animate({x2:point[0],y2:point[1]},100,animationSpark3);
  animationSpark3_count++;
  if(animationSpark3_count===sparkLine.length){
    animationSpark3_count = 0;
  }
}

let animationSpark4_count = 0;
function animationSpark4(){
  let point = sparkLine[animationSpark4_count][4];
  sparks[4].animate({x2:point[0],y2:point[1]},100,animationSpark4);
  animationSpark4_count++;
  if(animationSpark4_count===sparkLine.length){
    animationSpark4_count = 0;
  }
}

let animationSpark5_count = 0;
function animationSpark5(){
  let point = sparkLine[animationSpark5_count][5];
  sparks[5].animate({x2:point[0],y2:point[1]},100,animationSpark5);
  animationSpark5_count++;
  if(animationSpark5_count===sparkLine.length){
    animationSpark5_count = 0;
  }
}

let animationSpark6_count = 0;
function animationSpark6(){
  let point = sparkLine[animationSpark6_count][6];
  sparks[6].animate({x2:point[0],y2:point[1]},100,animationSpark6);
  animationSpark6_count++;
  if(animationSpark6_count===sparkLine.length){
    animationSpark6_count = 0;
  }
}

export default animationLogo;
