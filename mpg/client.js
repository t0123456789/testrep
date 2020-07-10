"use strict";



function startTimer() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	if(document.getElementById('dbgtimer')){
		m = padDigit(m);
		s = padDigit(s);
		document.getElementById('dbgtimer').innerHTML =
			h + ":" + m + ":" + s;
	}
	var t = setTimeout(startTimer, 500);		
}

function padDigit(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function gameStart(){
	
	startTimer();
	
}

function gameInit(n){
	
	var puzzledefault = { name:"default", size:3, level:0, info:"test something",
		arr:[
			{ q: "question0a2", opt:[ "o0", "o1", "o2", "o3" ], a:2, val:2 },
			{ q: "question1a3", opt:[ "o10", "o11", "o12", "o13" ], a:3, val:3 },
			{ q: "question2a0", opt:[ "o20", "o21", "o22", "o23" ], a:0, val:2 },
		]};
		
	var gamedata = puzzledefault;
	

	return gamedata;
}