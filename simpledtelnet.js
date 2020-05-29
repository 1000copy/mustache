var options = {host:"10.27.10.195"}
const net = require('net');
var t
var interval = 1000
let socketclient = net.createConnection({
  host: options.host,
  port: options.port || 23,
}, function () {
  console.log('connected');
})
socketclient.on("data", function (data) {            
  process.stdout.write(`${data}`.trim())
});
socketclient.on("close", function () {
  console.log('close');
  process.exit()
});

socketclient.on("error", function (err) {
  console.log(err);      
});
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.on('line', function(line){
    socketclient.write(line+'\r')
})
