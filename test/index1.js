var et = require("expect-telnet"); 
var user = 'root'
var password = 'admin'
var bands = [10,20,30,50,100,200,1000,1001]
var addr = "10.10.1.12:23"
// prompt
// var prompt0 = /Please change the password./
// var prompt = /MA5680T>/
// var prompt1 = /MA5680T#/
// var prompt2 = /MA5680T\(config\)#/
// var p3= /Are you sure to log out/
// var a = [
//         // {expect:/User name:/,send:`root\r`,interact:true},
//         // {expect: /User password:/, send: `admin\r`,interact:false},
//         {expect:/User name:/,send:'root\r',interact:false},
//         {expect: /User password:/, send: 'admin\r',interact:false},
//         {expect: prompt0},
//         {expect: prompt       , send: `enable\r` ,interact:false},
//         {expect: prompt1, send: `config\r`,interact:false},
//         {expect: prompt2, send: `quit\r`,interact:false},
//         {expect: prompt1, send: `quit\r`,interact:false},
//         {expect: p3, send: `y\r`,interact:false},        
//     ]
// et(
//     addr, 
//     a,
//     {timeout: 1000},
//     function(err) {
//         if (err) console.error(err);
//         process.exit()
//     }
// );
var seq = `
User name:$root
User password:$admin
Warning$
MA5680T$enable
MA5680T$config
MA5680T$quit
MA5680T$quit
log out?$y`

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
    if (arr.length > 1 && arr[1] !='')
        obj.send = arr[1] + '\r'
    if (arr.length > 2 && arr[2] !='')
        obj.interact = arr[2]=='true'
    b.push(obj)
}
// console.log(b)
// console.log(seq)
et(
    addr, 
    b,
    {timeout: 1000},
    function(err) {
        if (err) console.error(err);
        process.exit()
    }
);
