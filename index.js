const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('./'))
var expressWs = require('express-ws')(app);
var state = {}
expressWs.getWss().on('connection',(ws) => {
	if(buffer){
		ws.send(buffer.toString())
		buffer = undefined
	}    
})
app.ws('/echo', function(ws, req) {
	
  ws.on('message', function(msg) {
  	console.log('from client:'+msg)
    state.ws = ws// ws.send(msg);    
    telnet.write(msg+'\r')
  });
});
var options = {host:"10.27.10.195"}
const net = require('net');
var t
var interval = 1000
let telnet = net.createConnection({
  host: options.host,
  port: options.port || 23,
}, function () {
  console.log('connected');
})
telnet.on("data", function (data) {            
  // process.stdout.write(`${data}`.trim())
  if(state.ws)
  	state.ws.send(data.toString())
  else
  	buffer = data
});
telnet.on("close", function () {
  console.log('close');
  process.exit()
});

telnet.on("error", function (err) {
  console.log(err);      
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))