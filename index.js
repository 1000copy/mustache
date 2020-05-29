const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('./'))
var expressWs = require('express-ws')(app);
var state = {}
var ws1 
expressWs.getWss().on('connection',(ws) => {	
	const net = require('net');
	var t
	var options = {host:"10.27.10.195",port:23}
	let telnet = net.createConnection(options, function () {
	  console.log('connected');
	})
	telnet.on("data", function (data) {            
	  // process.stdout.write(`${data}`.trim())	  	  
	  ws.send(data.toString())	  
	});
	telnet.on("close", function () {
	  console.log('close');	  
	});

	telnet.on("error", function (err) {
	  console.log(err);      
	});
	ws.telnet = telnet
})
app.ws('/echo', function(ws, req) {	
  ws.on('message', function(msg) {  	
    ws.telnet.write(msg+'\r')
  });
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))