var options = {host:"10.27.10.195"}
var expects =[
  {expect:/Username/,send:'zte'},
  {expect:/Password/,send:'zte'},
  {expect:/ZXAN/,send:'en'},
  {expect:/Password/,send:'zxr10'},
  {expect:/ZXAN#/,send:'con t'},
  ]
const net = require('net');

let socketclient = net.createConnection({
      host: options.host,
      port: options.port || 23,
    }, function () {
      console.log('connected');
    })
    let step = 0;
    socketclient.on("data", function (data) {            
      process.stdout.write(`${data}`.trim());      
      if(expects.length >= step + 1){
        var item = expects[step]        
        if(data.toString().match(item.expect)){          
          socketclient.write(`${item.send}\n`)
          process.stdout.write(`${item.send}\n`);
          step++
        }
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
