const modeButton = document.getElementById('modeButton');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const message = document.getElementById('message');

const barGame = document.getElementById('barGame');
const numberGame = document.getElementById('numberGame');
const movingBar = document.getElementById('movingBar');
const number = document.getElementById('number');

let modeIndex = 0; // 0:バー,1:数字
const modes = ['バー','数字'];
let playing = false;
let waitingForPress = false;
let triggerTime;
let animationId;
let pos=0, speed=2;
let startTime;

function showMode(){
  [barGame,numberGame].forEach(el=>el.classList.add('hidden'));
  if(modeIndex===0) barGame.classList.remove('hidden');
  if(modeIndex===1) numberGame.classList.remove('hidden');
  modeButton.textContent=`モード切替 (今: ${modes[modeIndex]})`;
  message.textContent="";
}

modeButton.onclick=()=>{
  modeIndex=(modeIndex+1)%2;
  showMode();
};

startButton.onclick=()=>{
  scoreDisplay.textContent='0';
  timeDisplay.textContent='0 ms';
  message.textContent='';
  message.style.color='';
  waitingForPress=false;

  if(modeIndex===0){ // バー
    playing=true; pos=0; startTime=Date.now(); moveBar();
  }
  else if(modeIndex===1){ // 数字
    number.textContent='1';
    setTimeout(()=>{ number.textContent='2';
      setTimeout(()=>{
        number.textContent='3';
        triggerTime=Date.now(); waitingForPress=true;
      },1000+Math.random()*1000);
    },1000+Math.random()*1000);
  }
};

stopButton.onclick=handlePress;
document.onkeydown=e=>{if(e.code==='Space') handlePress();};

function handlePress(){
  if(modeIndex===0 && playing){ // バー
    playing=false; cancelAnimationFrame(animationId);
    const diff=Math.abs(pos-145);
    const score=Math.max(0,100-diff);
    scoreDisplay.textContent=score.toFixed(0);
    const t=Date.now()-startTime;
    timeDisplay.textContent=`${t} ms`;
    message.textContent='';
  }
  else if(waitingForPress){
    const t=Date.now()-triggerTime;
    timeDisplay.textContent=`+${t} ms`;
    scoreDisplay.textContent=Math.max(0,500-t);
    message.textContent=`成功！+${t} ms`;
    message.style.color='#4caf50';
    waitingForPress=false;
  }
  else if(!waitingForPress && modeIndex===1){
    const fake=- (100+Math.floor(Math.random()*200));
    timeDisplay.textContent=`${fake} ms`;
    scoreDisplay.textContent='-100';
    message.textContent=`失敗！フライング！${fake} ms`;
    message.style.color='#e74c3c';
  }
}

function moveBar(){
  pos+=speed;
  if(pos>290||pos<0) speed*=-1;
  movingBar.style.left=pos+'px';
  if(playing) animationId=requestAnimationFrame(moveBar);
}

showMode(); // 初期表示
