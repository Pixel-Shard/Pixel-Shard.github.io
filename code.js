var adminUser;
var mainUser;

var state = 0;
var time;
var code;
var codeGen;
var currentCode = "";


//admin


onEvent("adminBtn", "click", function( ) {
  setScreen("adminScreen");
  setAdminUser();
});

onEvent("adminStartBtn", "click", function( ) {
  time = getNumber("adminTimeInput");
  setScreen("adminGameScreen");
  start();
});

onEvent("adminResetBtn", "click", function( ) {
  reset();
});


//Main User


onEvent("mainBtn", "click", function( ) {
  setScreen("mainScreen");
  setMainUser();
});


onEvent("muStartBtn", "click", function( ) {
  setScreen("mainGameScreen");
  start();
});

onEvent("mainResetBtn", "click", function( ) {
  reset();
});


//Secondary User

onEvent("secUserBtn", "click", function( ) {
  setScreen("secondWaitScreen");
});



onEvent("key0", "click", function( ) {
  currentCode = currentCode + "0";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key1", "click", function( ) {
  currentCode = currentCode + "1";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key2", "click", function( ) {
  currentCode = currentCode + "2";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key3", "click", function( ) {
  currentCode = currentCode + "3";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key4", "click", function( ) {
  currentCode = currentCode + "4";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key5", "click", function( ) {
  currentCode = currentCode + "5";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key6", "click", function( ) {
  currentCode = currentCode + "6";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key7", "click", function( ) {
  currentCode = currentCode + "7";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key8", "click", function( ) {
  currentCode = currentCode + "8";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("key9", "click", function( ) {
  currentCode = currentCode + "9";
  setText("curCode", currentCode);
  checkCode();
});
onEvent("resetCodeBtn", "click", function( ) {
  currentCode = "";
  setText("curCode", currentCode);
});




//Functions


function start(){
  startTime();
  generateCode();
  hideElement("mainResetBtn");
  if((getUserId() != adminUser) && (getUserId != mainUser)){
    setScreen("secondGameScreen");
  }
  if(getUserId() == adminUser){
    setScreen("adminGameScreen");
  }
  if(getUserId() == mainUser){
    setScreen("mainGameScreen");
  }
  
}

function generateCode() {
  codeGen = randomNumber(1000000, 9999999);
  code = codeGen.toString();
  setKeyValue("keyCode", code, function () {
    console.log("Set code: " + code);
  });
  getKeyValue("keyCode", function (keyC) {
    code = keyC;
    console.log("Got code : " + code);
  });
  console.log(code);
  setText("adminCode", code);
  setText("mainCode", code);
  
}

function startTime(){
  time = getNumber("adminTimeInput");
  setText("adminTimer", time);
  setText("mainTime", time);
  if(isNaN(time)){
    time = 145;
    setText("adminTimer", time);
    setText("mainTime", time);
    setText("secondTime", time);
  }
  timedLoop(1000, function() {
    time--;
    setText("adminTimer", time);
    setText("mainTime", time);
    if((time == 0) & (state == 0)){
      stopTimedLoop();
      timeExp();
    } else if ((time == 0) & (state == 1)){
      stopTimedLoop();
      spikeDetonated();
    }
  });
}

function checkCode(){
  if((currentCode == code) & (state == 0)){
    setText("curCode", currentCode);
    spikePlant();
  }else if((currentCode == code) & (state == 1)){
    stopTimedLoop();
    spikeDefused();
  }
}

function timeExp(){
  setText("adminStatus", "Time Expired");
  setText("mainStatus", "Time Expired");
   setText("secondStatus", "Time Expired");
  showElement("mainResetBtn");
}

function spikePlant(){
  time = 45;
  state = 1;
  setText("adminTimer", time);
  setText("mainTime", time);
  setText("secondTimer", time);
  setText("adminStatus", "Spike Planted");
  setText("mainStatus", "Spike Planted");
   setText("secondStatus", "Spike Planted");
  currentCode = "";
  setText("curCode", currentCode);
}

function spikeDetonated(){
  setText("adminStatus", "Spike Detonated");
  setText("mainStatus", "Spike Detonated");
  showElement("mainResetBtn");
}

function spikeDefused(){
  setText("adminStatus", "Spike Defused");
  setText("mainStatus", "Spike Defused");
   setText("secondStatus", "Spike Defused");
  showElement("mainResetBtn");
}

function reset(){
  setText("adminStatus", "");
  setText("mainStatus", "");
  setText("secondStatus", "");
  stopTimedLoop();
  if((getUserId() != adminUser) && (getUserId != mainUser)){
    setScreen("secondWaitScreen");
  }
  if(getUserId() == adminUser){
    setScreen("adminScreen");
  }
  if(getUserId() == mainUser){
    setScreen("mainScreen");
  }
}

function setAdminUser(){
  adminUser = getUserId();
  console.log("Admin id: " + adminUser);
}

function setMainUser(){
  mainUser = getUserId();
  console.log("Main id: " + mainUser);
}