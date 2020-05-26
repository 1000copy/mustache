var Mustache = require('ejs')
var fs = require('fs');
var view = JSON.parse(fs.readFileSync('./huawei.json', 'utf8'));
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('loading ' + filename);
  var template = Mustache.compile(data);
  output = template(view)
  console.log(output)
});

