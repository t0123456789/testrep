mpscene = (function () {

    // lots of code/definitions that have local scope
    var internallyDefinedItem1 = function (n) { 
		console.log("internallyDefinedItem1 input: ", n); 
		return " ok-internallyDefinedItem1:"+n;
		}
    var internallyDefinedItem2 = {
        foo: internallyDefinedItem1(532),
        bar: totallyPrivateNeverExportedFunction(17)
    }
    var totallyPrivateNeverExportedVar = 'blahblahblah';
    function totallyPrivateNeverExportedFunction (x) {
       console.log("totallyPrivateNeverExportedFunction input: ", x); 
	   return " ok-totallyPrivateNeverExportedFunction:"+x;
    }

// when internallyDefinedItem2 is instatiated, both local scope fns run 
// can global call to exportedItem1(99) runs internal fn
// can global access value of exportedItem2.foo=..., exportedItem2.bar=ok17

/*    return {
        exportedItem1: internallyDefinedItem1,
        exportedItem2: internallyDefinedItem2
    }*/
	
	
			var input = {
			rx: 0,
			ry: 0,           
            mx: 0,
            my: 0,
            cx: 0,
            cy: 0
            };
			
		window.onmousemove = function(e) {
			input.mx = e.clientX;
			input.my = e.clientY;
			var mstr = "mousemove: "+ input.mx +","+ input.my;
			printFunction(e, mstr);
		}
		var count = 0;
		var ecount = 0;

		
	var drawScene =	function(canvas, ctx){
		
			// filled, erased then outlined
			ctx.fillStyle = 'rgb(0, 255, 0)';
			ctx.fillRect(25, 25, 100, 100);
			ctx.clearRect(45, 45, 60, 60);
			ctx.strokeRect(50, 50, 50, 50);
			// intersecting rects, opaque red & transparent blue
		    ctx.fillStyle = 'rgb(200, 0, 0)';
			ctx.fillRect(10, 210, 50, 50);	// xy origin is left,top corner. rect params are: (posx,posy,w,h)
			ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
			ctx.fillRect(30, 230, 50, 50);
			
			// Create gradient 
			var lingrad = ctx.createLinearGradient(0, 0, 0, 200); // gradient between start and end points (startx,starty,endx,endy)
			lingrad.addColorStop(0, '#00ABEB');	// setup interpolate color from start=0 to end=1
			lingrad.addColorStop(0.8, '#fff');
			lingrad.addColorStop(0.8, '#a6e0ff');
			lingrad.addColorStop(1, '#26C000');
			ctx.fillStyle = lingrad;
			ctx.fillRect(150, 0, 150, 200);
		
			// images
			/*var img = document.getElementById("leaves");
			ctx.drawImage(img, 150, 200, 150, 100);
			var imga = document.getElementById("acoin");
			ctx.drawImage(imga, 150, 150);*/
			
			if (canvas.addEventListener) {                // For all major browsers, except IE 8 and earlier
				canvas.addEventListener("click", function(e) { 
					updateInputCanvasXY(e);
					printFunction(e, "addEventListener clicked"); 
				} );
			} else if (canvas.attachEvent) {              // For IE 8 and earlier versions
				canvas.attachEvent("onclick", function(e) { 
					updateInputCanvasXY(e);
					printFunction(e, "attachEvent clicked"); } );
			} else {
				printError("canvas.addEventListener or canvas.attachEvent NOT supported.");
			}			

			function updateInputCanvasXY(e) {
				if(canvas.getBoundingClientRect){
					var r = canvas.getBoundingClientRect();
					input.rx = r.left;
					input.ry = r.top;
				} else {
					printError("canvas.getBoundingClientRect NOT supported.");
					// ?recurse parent elements .clientTop and .clientLeft
				}	
				input.cx = e.clientX - input.rx;
				input.cy = e.clientY - input.ry;
			}
		}
		
		function printFunction(e, src) {
			var position = " x,y: "+input.cx+","+input.cy+" exy: "+e.clientX+","+e.clientY + " canvasxy: "+input.rx+","+input.ry;
			document.getElementById("debug").innerHTML = "debug print "+ count + ": "+ src + position;
			count++;
		}	

		function printError(src) {
			document.getElementById("error").innerHTML = "Error print "+ ecount + ": "+ src;
			ecount++;
			console.log(src);
		}		


return {
        draw: drawScene
    }
	
})();

