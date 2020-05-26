var Mustache = require('mustache')
var version = "1.2.5"
var fs = require('fs');
var view = JSON.parse(fs.readFileSync('./huawei.json', 'utf8'));
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('loading ' + filename);
  var output = Mustache.render(data, view);
  console.log(output)
});

