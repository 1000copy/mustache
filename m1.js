var Mustache = require('mustache')
var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};
var str = `{{title}} spends {{calc}}
`
var output = Mustache.render(str, view);
console.log(output)