
install Python 2.7.12+
	(win: certutil -hashfile python-2.7.15.amd64.msi MD5)
 
install emscripten sdk
	(win: download from git, >emsdk install sdk, >emsdk activate latest, emsdk_env.bat)
	
to check emsdk install 
	open emscripten cmd prompt (sets env in new window), by running emcmdprompt.bat (eg click on C:\usr\github\testrep\dev\emsdk\emcmdprompt.bat)
	new window>emcc -v 				(prints version)
	new window>cd ..\dev\test
	new window>emcc hello.c			(generates a.out.js and a.out.wasm)
	new window>node a.out.js		(runs output using node.js)

	WebAssembly file contain the compiled code, JavaScript file contains the runtime support to load and execute it.
	run it with the -v option to print out a lot of useful debug information
	build with -s WASM=0 to disable WebAssembly, and then emscripten will emit the compiled code as JavaScript
	
	new window>emcc hello.c -o h.html		(generates h.html which loads js & wasm)
	
	new window>python -m http.server 8000  		(	
	
	open html directly in browser -> fetching of the wasm failed
		 file:// XHR requests not supported by most browsers and can’t load extra files needed by the HTML (eg .wasm file). need to serve the files using a local webserver and then open http://localhost:8000/h.html).		 
		 eg. py3: python -m http.server 8000 or py2: python -m SimpleHTTPServer 8000
		 
	new window>emcc hello.c -s WASM=0 -o hnw.html		(generates hnw.html which loads js only version)	 
		this version is supported on iphone, but ipad asserts: JS engine does not provide full typed array support
		https://mozakai.blogspot.com/2011/12/typed-arrays-by-default-in-emscripten.html
		USE_TYPED_ARRAYS=0
		
	new window>emcc hello.c -s WASM=0 -s USE_TYPED_ARRAYS=0 -o hnwnta.html	
	
	
to check existing node & npm packages installed:
	node -v
	npm -v
	npm list 		(list local installed packages)
	npm list -g		(list globally installed packages)
	
	
install server side websockets for node.js:
	npm install ws			(cd wsserver, for simple server & client test code)
	
	test this by running:
		node server
		
	
	examples with more dependencies, eg express / socket.io :
		(https://www.js-tutorials.com/nodejs-tutorial/simple-websocket-example-with-nodejs/)
		(https://www.nodebeginner.org/blog/post/nodejs-tutorial-how-to-work-with-websockets/)
		npm install express
		npm install body-parser
	
	The WebSocket protocol, described in the specification RFC 6455 provides a way to exchange data between browser and server via a persistent connection. The data can be passed in both directions as "packets", without breaking the connection and additional HTTP-requests. WebSocket is especially great for services that require continuous data exchange
	While a WebSocket connection is functionally somewhat similar to standard Unix-style sockets, they are not related.
	
host node server on glitch.com:

	create default node app on glitch		(checkbox to make project private, eg https://glitch.com/~vaulted-spangled-tulip)
	copy server code to server.js
	edit port to use hosting environment configured port:
		change 8080 -> process.env.port
			// your host may independently configure the process.env.PORT variable for you
			// so can set option like, use port 3000 unless there exists a preconfigured port
			var port = process.env.port || 3000;
	get url of server:
		click 'share'>live app>'copy' url
	
use hosted node server in client js:
	edit websocket constructor to use external url:	
		//wsc.socket = new WebSocket('ws://localhost:8080');
		wsc.socket = new WebSocket('ws://vaulted-spangled-tulip.glitch.me');

	// example glitch node.js Express server uses https, but doesn't seem to load certificate files?
	//		Production systems may proxy requests to your nodejs app, then you'd only need to set up http server in nodejs.
	//		(using Nginx or HAProxy. eg You/they can setup nginx to handle the ssl requests and just speak http to your node app.js)
	//		(using AWS, can config EC2 Elastic Load Balancers to accept HTTPS connections and act as the SSL termination point, and allow regular HTTP traffic from ELBs to your EC2 web servers. For further security, setup your security group such that only the ELB is allowed to send HTTP traffic to the EC2 instances, which will prevent external unencrypted HTTP traffic from hitting your machines. There typically isn't a reason to have nodejs deal with SSL, because it's just extra processing overhead which can be handled up the stack at either the ELB level or at the HTTP Proxy level.)
	//		(using Heroku. SSL termination happens at the load balancer, before encrypted traffic reaches your node app. It is possible to test whether https was used to make the request with req.headers['x-forwarded-proto'] === 'https'. We don't need to concern ourselves with having local SSL certificates inside the app etc as you might if hosting in other environments. https://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect/23894573#23894573)




how to update old ipad/phone/pod to the max supported IOS:
	https://discussions.apple.com/thread/8410410
	
	
recharging battery after years:
	plug-in recharge battery cable & leave for 10 minutes or more.
	try device button on front or power switch on edge corner.
	try holding power switch down 4 seconds to reboot.
	leave recharge battery cable for an hour or more.
	
	
	