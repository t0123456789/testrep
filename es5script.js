// The standard for JavaScript is ECMAScript (possible versions could be ECMAScript 3, 5, 6 and 7)
// As of 2012, all modern browsers fully support ECMAScript 5.1. 
// Older browsers support at least ECMAScript 3. (explicit JavaScript versioning was Mozilla-specific & deprecated since JavaScript 1.8.5)

"use strict";	// "use strict" directive is new in ECMAScript version 5, ignored in <ECMA5, in ECMA6 it is default.

// check js version dependent feature support for es6 syntax (eg. Symbol objects, class keyword and arrow functions) 
// 		this is done using the eval() function or other equivalents (e.g. Function() ), 
//  	because writing invalid syntax will stop the script before its execution. 
function checkJsFeatures() {
    //if (typeof Symbol == "undefined") return false;
    try {
        eval("class Foo {}");
        eval("var bar = (x) => x+1");
    } catch (e) { return false; }

    return true;
}

// check whether strict mode is being applied by the browser
//    	in traditional js 'this' = valid global object (and all undeclared variables are implicitly defined on use in global scope.)
//		in strict mode 'this' is 'undefined', so '!this' becomes true.
function isStrictMode(){
    return !this;
} 

function checkAnimation(){
	var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
		elm = document.getElementById( 'rotdemo' ),
		message = document.getElementById( 'rottechnique' ),
		rotate = 0,
		animation = false,
		transformation = false,
		animationstring = 'animation',
		transformstring = 'transform',
		keyframeprefix = '',
		pfx = '';
		
	// check if standard CSS3 animation is supported first
	if( elm.style.animationName ) { animation = true; }    
	if( elm.style.transform ) { transformation = true; }    

	// else check if browser specific CSS animation is supported
	if( animation === false ) {
		for( var i = 0; i < domPrefixes.length; i++ ) {
			if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
				pfx = domPrefixes[ i ];
				animationstring = pfx + 'Animation';
				keyframeprefix = '-' + pfx.toLowerCase() + '-';
				animation = true;
				break;
			}
		}
	}
	if( transformation === false ) {
		for( var i = 0; i < domPrefixes.length; i++ ) {
			if( elm.style[ domPrefixes[i] + 'Transform' ] !== undefined ) {
				pfx = domPrefixes[ i ];
				transformstring = pfx + 'Transform';
				transformation = true;
				break;
			}
		}
	}
	
	// add CSS animation to the element elm
	if( animation === true ) {
		message.innerHTML = 'Animated with CSS3 animation';

		elm.style[ animationstring ] = 'rotate 1s linear infinite';

		var keyframes = '@' + keyframeprefix + 'keyframes rotate { '+
					'from {' + keyframeprefix + 'transform:rotate( 0deg ) }'+
					'to {' + keyframeprefix + 'transform:rotate( 360deg ) }'+
					'}';

		if( document.styleSheets && document.styleSheets.length ) {
			document.styleSheets[0].insertRule( keyframes, 0 );
		} else {
			var s = document.createElement( 'style' );
			s.innerHTML = keyframes;
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
		}
	}

	// use js animation 	
	if( animation === false ) {
		message.innerHTML += 'Using an animation loop';
		
		if( requestAnimationFrame.toString().indexOf( 'mation' ) !== -1 ) {
			message.innerHTML += ' with requestAnimationFrame';
		} else {
			message.innerHTML += ' without requestAnimationFrame';
		}		
		
		if ( !window.requestAnimationFrame ) {
			//Provides requestAnimationFrame in a cross browser way.
			// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
			window.requestAnimationFrame = ( function() {
				return window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function( callback, fps ) {
					window.setTimeout( callback, 1000 / fps );
				};
			} )();
		}

		if( transformation !== false ) {
			loop();
		} 
	} 
    
	function loop() {
		rotate += 4;
		elm.style[ transformstring ] = 'rotate(' + rotate + 'deg)';
		requestAnimationFrame( loop, 30 );
	}
}

(function() {
	
	if(document.body) {
		display("document.body is valid.");		
	}else{
		console.log("document.body is null atm.");
	}

	function display(msg) {
		var p = document.createElement('p');
		p.innerHTML = msg;
		document.body.appendChild(p);
	}
})()

if (isStrictMode()) {
	console.log("strict mode is applied by this browser.");
} else {
	console.log("strict mode NOT applied by this browser (ES3?).");
}
  
if (checkJsFeatures()) {
    // The engine supports ES6 features you want to use
    var s = document.createElement('script');
    s.src = "es6script.js";
    document.head.appendChild(s);
	console.log("ES6 features are supported by this browser.");
} else {
    // The engine doesn't support those ES6 features
    // Use ES5 
	console.log("ES6 features NOT supported by this browser.");
}



function es5doIt(elemId, data){
	var strstrict = '<br>Strict mode: ' + isStrictMode().toString();
	var strfeatures = '<br>JS ECMA6 feature support: ' + checkJsFeatures().toString();
	var struseragent = '<br>User-agent header: ' + navigator.userAgent;
	
	var strmsg = '<b>es5doIt:' + strstrict + strfeatures + struseragent;

	console.log(strmsg);
	display(strmsg);		
	
	checkAnimation();

	function display(msg) {
		if(document.body) {				
			var p = document.getElementById(elemId);
			if(p){
				p.innerHTML = msg;
			} else {
				p = document.createElement('p');
				p.innerHTML = msg;
				document.body.appendChild(p);
			}
		}else{
			msg += ' document.body is null atm.';
			console.log(msg);
		}
	}
	
}

