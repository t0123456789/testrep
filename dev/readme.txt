
install Python 2.7.12+
	(win: certutil -hashfile python-2.7.15.amd64.msi MD5)
 
install emscripten sdk
	(win: download from git, >emsdk install sdk, >emsdk activate latest, emsdk_env.bat)
	
to check install 
	open emscripten cmd prompt (sets env in new window), by running emcmdprompt.bat (eg click on C:\usr\github\testrep\dev\emsdk\emcmdprompt.bat)
	new window>emcc -v 				(prints version)
	new window>cd ..\dev\test
	new window>emcc hello.c			(generates a.out.js and a.out.wasm)
	new window>node a.out.js		(runs output using node.js)

	WebAssembly file contain the compiled code, JavaScript file contains the runtime support to load and execute it.
	run it with the -v option to print out a lot of useful debug information
	build with -s WASM=0 to disable WebAssembly, and then emscripten will emit the compiled code as JavaScript
	
	new window>emcc hello.c -o h.html		(generates h.html which loads js)
	
	new window>python -m http.server 8000  		(	
	
	open html directly in browser -> fetching of the wasm failed
		 file:// XHR requests not supported by most browsers and can’t load extra files needed by the HTML (eg .wasm file). need to serve the files using a local webserver and then open http://localhost:8000/h.html).		 
		 eg. py3: python -m http.server 8000 or py2: python -m SimpleHTTPServer 8000