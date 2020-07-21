

const port = process.env.port || 8080;

const d = new Date();
let ms = d.getTime();
console.log("New ws date,time: ", d, ms);

const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello, World!</h1>')
  //res.end('Hello, World!');
}

const server = http.createServer(requestListener);

const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ server });

//const wss = new WebSocket.Server({ port: process.env.PORT })
//console.log("ws app is listening on port "+ process.env.PORT);


// check connection is responsive by sending ping message to each client every 30 secs
const interval = setInterval(function ping() {
	//msint = parseInt(Date.now());
	ms = Date.now();
	var str = "ping "+wss.clients.size+" clients, at "+ms;
	console.log(str);
	wss.clients.forEach(function each(ws) {
		// terminate immediately destroys the connection
		//if (ws.isAlive === false) return ws.terminate();
		if (ws.isAlive === false)
			console.log("ws connection is dead.");
			
		ws.isAlive = false;
		var pstr = ms + ' ' + ws.uid;
		//ws.ping(ms, noop);	// sends data as a Buffer containing bytes of string...
		ws.ping(pstr, noop);	
	});
}, 30000);

function noop() {}

let uidnext=0;
function uid() {
	var id = uidnext;
	uidnext++;
	return id;
}


wss.on('connection', (ws, request) => {
	// when connection is checked with ping messages...
	ws.isAlive = true;
	ws.uid = uid();
	
	ws.on('pong', data => {	//Pong messages are automatically sent by clients in response to ping messages
		ws.isAlive = true;
		try {
			var words = data.toString().split(' ');
			dint = parseInt(words[0]);
			dt = Date.now()-dint;
			console.log("pong from: uid ms: ", words[1], dt);
		} catch (error) {
			console.error(error);
			console.log("exception parsing pong data: ", data); //, dt);
		}
	});	

	// basic example to print message received from client and send initial message from server
	ws.on('message', message => {
		var useragent = request.headers['user-agent'];
		console.log(`Received message => ${message} from user ${ws.uid} ${useragent}`)	
	})
	ws.send('Hello! Message From Server!!')
	
	ws.on('close', function (ws, code, reason) {
		console.info("user connection closed: uid code reason: ", ws.uid, code, reason);
	});
	ws.on('error', function (err) {
		console.info("user connection error: uid error: ", ws.uid, error);
	});
	ws.on('unexpected-response', function (request, response) {
		console.info("user connection unexpected-response: uid clientrequest.method/hdrs/codeurl: ", ws.uid, request.method );
		console.log(request.headers);
		console.log(request.statusCode, request.url);
		console.info("unexpected-response: uid response.method/hdrs/url: ", ws.uid, response.method );
		console.log(response.headers);
		console.log(response.statusCode, request.url);
	});
})

wss.on('close', function close() {
  clearInterval(interval);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

console.log("main done");