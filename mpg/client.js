"use strict";

var client = {};

client.t = 0;
client.dt = 0;
client.interdt = 500;
client.maxstrike = 3;
client.prog = { score:0, qnum:0, level:0, strike:0, acc:0, state:"none" };


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

	console.log( "checkAnswer: ", refqn );
	
	switch(getState()) {
	case "start":
		setIS(true);
		setState("ready");
		nextQuestion();
		break;
	case "finish":
		switch(n) {
			case 0:
				client.prog.qnum = 0;
				setQA(0);
				setState("start");
				break;
			case 1:
				client.prog.qnum = 1;
				setQA(1);
				setState("ready");
				break;
			case 2:
			case 3:
			default:
				break;
		}
		break;
	default:
		var q = client.quiz.arr[refqn];
		if(q.a==n){
			updateScore(q.val);
		}else{
			updateStrike(1);
		}
		setIS(false);
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
			setQA(client.prog.qnum);			
			
			if(client.prog.qnum==maxidx){
				// finished!
				setState("finish");
			}
		}
	}
}

function gameStart(){
	
	var intervalId = setInterval(startTimer, client.interdt);
	client.quiz = gameInit(0);	
	setQA(0);
	setState("start");
}

function setState(s){
	client.prog.state = s;
}
function getState(){
	return client.prog.state;
}

function setIS(reset){
	if(reset){
		document.getElementById("infotext").innerHTML = "Click the answer:";	
		client.prog.score = 0;
		client.prog.strike = 0;
		client.prog.acc = 0;
		client.prog.level = 0;			
	}
	var str = "Coins:"+client.prog.score+"&nbsp Level:"+client.prog.level+"&nbsp Strike:"+client.prog.strike;
	document.getElementById("scoretext").innerHTML = str;
}

function setQA(n){
	var qn = client.quiz.arr[client.prog.qnum];
	var pq = document.getElementById("questiontext");
	pq.innerHTML = qn.q;
	
	for(var i = 0; i < qn.opt.length; i++){ 
	//for(let i = 0; i < 4; i++){ 
		var idstr = "a"+i;
		document.getElementById(idstr).innerHTML = qn.opt[i];	
	}
}

function gameInit(n){
	
	var defdata = { name:"default", steps:3, level:0, info:"test something",
		arr:[
			{ q: "Hello! Which player?", opt:[ "( \\__/ )<br>( ᵔ ᴥ ᵔ )", "&nbsp;/\\.../\\<br>(o . o)", "&nbsp;<br>~{'v'}~", "( )__( )<br>( ᵔ ᴥ ᵔ )" ], a:0, val:0 },
			{ q: "question0a2", opt:[ "o0", "o1", "o2", "o3" ], a:2, val:2 },
			{ q: "question1a3", opt:[ "o10", "o11", "o12", "o13" ], a:3, val:3 },
			{ q: "question2a0", opt:[ "o20", "o21", "o22", "o23" ], a:0, val:2 },
			{ q: "Finished!", opt:[ "reset", "next", "stats", "anim" ], a:0, val:0 },
		]};
		
	var quiz = defdata;
	
	return quiz;
}