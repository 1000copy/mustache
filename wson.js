
exports.onmsg = function(ws){	
    return (msg)=>{	    
      if(!ws.config){
      	console.log(msg.toString())
      	ws.config = true
      	var options = JSON.parse(msg.toString())
      	onconnection(options)(ws)
      }
      else
	  	ws.telnet.write(msg+'\r')  
	}
}
onconnection=(options)=>{
  return (ws) => {	  	
	const net = require('net');
	var t	
	let step = 0;
    var t
    var interval = options.timeout || 1000
	let telnet = net.createConnection(options, function () {		
		console.log('connected');
	})
	var trimhead =  false
	telnet.on("data", function (data) {            	  
	  // console.log(data.toString())
	  if(!trimhead){
	  	data = data.toString().slice(16)
	  	trimhead = true
	  }
	  ws.send(data.toString())	 
	  if(options.expects.length >= step + 1){
        var item = options.expects[step]        
        if(data.toString().match(new RegExp(item.expect))){
          clearTimeout(t)
          telnet.write(`${item.send}\n`)
          // process.stdout.write(`${item.send}\n`);
          ws.send(`${item.send}`)
          step++
        }else{
          t = setTimeout(function(){
            console.log('timeout,'+options.expects[step].expect)
            process.exit()
          },interval)
        }
      } 
	});
	telnet.on("close", function () {
	  console.log('close')
	});

	telnet.on("error", function (err) {
	  console.log(err);      
	});
	ws.telnet = telnet
   }	
}