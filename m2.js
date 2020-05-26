var Mustache = require('mustache')
var version = "1.2.5"
var view = {  
  v125: version =='1.2.5',
};
var str = `
config#service tont1 {{#v125}}type internet{{/v125}} gemport 1 vlan 100
`
var output = Mustache.render(str, view);
console.log(output)

