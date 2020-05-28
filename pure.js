const net = require('net');
var options = {host:"10.27.10.195"}
let socketclient = net.createConnection({
      host: options.host,
      port: options.port || 23,
    }, function () {
      console.log('connected');
    })
    let step = 0;
    socketclient.on("data", function (data) {            
      process.stdout.write(`${data}`.trim());
      // auto login
      if(data.includes('Username')){
        socketclient.write('zte\n')
        process.stdout.write(`zte`);        
      }
      if(data.includes('Password')){
        socketclient.write('zte\n')
        process.stdout.write(`zte`);        
      }
    });

    socketclient.on("close", function () {
      console.log('close');
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
