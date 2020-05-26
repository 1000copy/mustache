var Mustache = require('mustache')
var version = "1.2.5"
var view = {
  "bandwidths": [1,2,3,1000],  
  'prompt':"config#",
}

var str =`
{{prompt}}dba-profile add profile-id 101 type4 max 10240
{{prompt}}ont-lineprofile gpon profile-id 101
{{prompt}}tcont 1 dba-profile-id 101
{{prompt}}gem add 0 eth tcont 1
{{prompt}}gem mapping 0 1 vlan 100
{{prompt}}commit
{{prompt}}quit
{{prompt}}ont-srvprofile gpon profile-id 101
{{prompt}}ont-port pots adaptive eth adaptive
{{prompt}}commit
{{prompt}}quit
{{#bandwidths}}
{{prompt}}traffic table ip name  {{.}}M  cir 2048 cbs 1023 pir 2200 pbs 2000 color-mode color-blind color-policy dei priority 0 priority-policy tag-In-package
{{/bandwidths}}
`
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('loading ' + filename);
  var output = Mustache.render(data, view);
  console.log(output)
});

