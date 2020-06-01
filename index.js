
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.redirect('/index.html'))
app.use(express.static('./'))
var expressWs = require('express-ws')(app);
var wson = require('./wson.js')
app.ws('/echo', function(ws, req) {	
  ws.on('message', wson.onmsg(ws));
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))