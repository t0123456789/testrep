"use strict";

var client = {};

client.t = 0;
client.dt = 0;
client.interdt = 500;
client.maxstrike = 3;
client.prog = { score:0, qnum:0, level:0, strike:0, acc:0, star:0, state:"none" };


function startTimer() {
	var d = new Date();	
	var ms = d.getTime();	// millisecs since midnight January 1 1970
	if(client.t) {
		client.dt = client.t-ms;
	}
	client.t = ms;
	
	if(document.getElementById('dbgtimer')){
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		m = padDigit(m);
		s = padDigit(s);
		document.getElementById('dbgtimer').innerHTML =
			h + ":" + m + ":" + s + " ms:" + ms + " dt:" + client.dt;
	}
	
	function padDigit(i) {
	  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	  return i;
	}
}

function checkAnswer(n){
	var refqn = client.prog.qnum;	// makes ref vs copy

	switch(getState()) {
	case "start":
		vsetIS(true);
		setState("ready");
		nextQuestion();
		break;
	case "finish":
		switch(n) {
			case 0:
				vsetBlockDisplay("scoretext", false);
				client.prog.qnum = 0;
				vsetQA(0);
				setState("start");
				break;
			case 1:
				client.prog.qnum = 1;
				vsetQA(1);
				setState("ready");
				break;
			case 2:
			case 3:
			default:
				break;
		}
		break;
	case "ready":
		var q = client.quiz.arr[refqn];
		if(q.a==n){
			updateScore(q.val);
		}else{
			updateStrike(1);
		}
		vsetIS(false);
		break;
	}
	
	function updateScore(inc){
		client.prog.score += inc;
		client.prog.strike=0;	// reset strikes for each q
		nextQuestion();
	}
	
	function updateStrike(inc){
		client.prog.strike += inc;
		if(client.prog.strike==client.maxstrike){
			client.prog.strike=0;
			nextQuestion();
		}			
	}
	
	function nextQuestion(){	
		client.prog.qnum++;
		var maxidx = client.quiz.arr.length-1;
		if(client.prog.qnum<=maxidx){
			vsetQA(client.prog.qnum);			
			
			if(client.prog.qnum==maxidx){
				setState("finish");
				vsetBlockDisplay("infotext", true);
			}
		}
	}
}

function gameStart(){
	
	var intervalId = setInterval(startTimer, client.interdt);
	client.quiz = gameInit(0);	
	vsetQA(0);
	setState("start");
}

function setState(s){
	client.prog.state = s;
}
function getState(){
	return client.prog.state;
}

function vsetIS(reset){
	if(reset){
		client.prog.score = 0;
		client.prog.strike = 0;
		client.prog.acc = 0;
		client.prog.level = 0;	

		var infoelem = document.getElementById("infotext");
		infoelem.innerHTML = "Click the answer:";	
		vsetElemBlockDisplay(infoelem, true);
		vsetBlockDisplay("scoretext", true);
	}
	var str = "Coins:"+client.prog.score+"&nbsp Level:"+client.prog.level+"&nbsp Strike:"+client.prog.strike;
	document.getElementById("scoretext").innerHTML = str;
}

function vsetQA(n){
	var qn = client.quiz.arr[client.prog.qnum];
	var pq = document.getElementById("questiontext");
	pq.innerHTML = qn.q;
	
	var i;
	var maxi = qn.opt.length;	
	for( i = 0; i < maxi; i++){ 
		var idstr = "a"+i;
		document.getElementById(idstr).innerHTML = qn.opt[i];	
	}
}

function vsetBlockDisplay(elemId, enable) {
	var x = document.getElementById(elemId);
	vsetElemBlockDisplay(x,enable);
} 
function vsetElemBlockDisplay(elem, enable) {
  if (enable) {
		elem.style.display = "block";
  } else {
		elem.style.display = "none";
  }
  //elem.style.display = (enable)? "block":"none";  
} 

function gameInit(n){
	
	var defdata = { name:"default", steps:3, level:0, info:"test something",
		arr:[
			{ q: "Hello! Which player?", opt:[ "( \\__/ )<br>( ᵔ ᴥ ᵔ )", "/\\.../\\<br>(o . o)", "&nbsp;<br>~{'v'}~", "( )__( )<br>( ᵔ ᴥ ᵔ )" ], a:0, val:0 },
			{ q: "2 x 3 = ?", opt:[ "5", "8", "6", "23" ], a:2, val:6 },
			{ q: "5 + ? = 10", opt:[ "1", "4", "8", "5" ], a:3, val:5 },
			{ q: "7 x 8 = ?", opt:[ "48", "68", "56", "58" ], a:2, val:56 },
			{ q: "Finished!", opt:[ "reset", "next", "stats", "compete" ], a:0, val:0 },
		]};
		
	var quiz = defdata;
	
	return quiz;
}