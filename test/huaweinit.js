var et = require("expect-telnet"); 
var user = 'root'
var password = 'admin'
var bands = [10,20,30,50,100,200,1000,1001]
var addr = "10.10.1.12:23"

var seq = `
User name:$root
User password:$admin
Warning$
MA5680T$enable
MA5680T$config
MA5680T$dba-profile add profile-id 122 type4 max 10240  priority 1 weight 1
MA5680T$ont-lineprofile gpon profile-id 122 profile-name profile122
MA5680T$tcont 1 dba-profile-id 122
MA5680T$gem add 0 eth tcont 1
cascade$ENTER
MA5680T$gem mapping 0 1 vlan 100
transparent$ENTER
MA5680T$commit
MA5680T$quit
MA5680T$ont-srvprofile gpon profile-id 122
profile$ENTER
MA5680T$ont-port pots adaptive eth adaptive
catv$ENTER
MA5680T$commit
MA5680T$quit
MA5680T$traffic table ip name  1M  cir 1024 cbs 1023 pir 1524  pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
MA5680T$traffic table ip name  2M  cir 2048 cbs 1023 pir 2548  pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
MA5680T$traffic table ip name  3M  cir 3072 cbs 1023 pir 3572  pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
MA5680T$traffic table ip name  4M  cir 4096 cbs 1023 pir 4596  pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
MA5680T$traffic table ip name  1001M  cir 1025024 cbs 1023 pir 1025524  pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
MA5680T$quit
MA5680T$quit
log out?$y
`

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
    	if(arr[1] =='ENTER')
    		obj.send = '\r'
    	else
        	obj.send = arr[1] + '\r'
    if (arr.length > 2 && arr[2] !='')
        obj.interact = arr[2]=='true'
    b.push(obj)
}
console.log(b)
// console.log(seq)
et(
    addr, 
    b,
    {timeout: 5000},
    function(err) {
        if (err) console.error(err);
        process.exit()
    }
);
