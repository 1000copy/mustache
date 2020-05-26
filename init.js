var et = require("expect-telnet"); 
var user = 'root'
var password = 'admin'
var bands = [10,20,30,50,100,200,1000,1001]
var addr = "10.10.1.12:23"

var Mustache = require('ejs')
var fs = require('fs');
var view = JSON.parse(fs.readFileSync('./data/huawei.json', 'utf8'));
var fs = require('fs')
var data = fs.readFileSync('./data/huawei.cmd', 'utf8')
console.log('loading ...');
var template = Mustache.compile(data);
var output = template(view)
// console.log(output)
// return 
var seq = output
var s = seq.trim()
var item = s.split('\n')
var b = []
for (var i = 0; i < item.length; i++) {
    var arr = item[i].split('$')
    if (arr.length <=1 ){
        console.log(`error on line ${i}:${item[i]}`  )
    }
    // console.log(arr)
    var obj = {expect:new RegExp(arr[0])} 
    if (arr.length > 1 && arr[1] !=''){        
    	if(arr[1].trim() =='ENTER')
    		obj.send = '\r'
    	else
        	obj.send = arr[1].trim() + '\r'
    }
    if (arr.length > 2 && arr[2] !='')
        obj.interact = arr[2]=='true'
    b.push(obj)
}
// console.log(b)
// console.log(seq)
et(
    addr, 
    b,
    {timeout: 3000},
    function(err) {
        if (err) console.error(err);
        process.exit()
    }
);
