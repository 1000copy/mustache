
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('./'))
var expressWs = require('express-ws')(app);
var wson = require('./wson.js')
// expressWs.getWss().onWebSocketOpen = (ws,req)=>{ws.req = req;console.log('*',req.url)}  

var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
var options = {host:"10.27.10.195",port:23,timeout:1000,expects :[
  {expect:/Username/,send:'zte'},
  {expect:/Password/,send:'zte'},
  {expect:/ZXAN/,send:'en'},
  {expect:/Password/,send:'zxr10'},
  {expect:/ZXAN#/,send:'con t'},
  // {expect:/ZXAN/,send:'exit'},
  // {expect:/ZXAN/,send:'exit'},
  // {expect:/saving/,send:'yes'},
  ]}
// expressWs.getWss().on('connection',wson.onconnection(options))
var config = false
app.ws('/echo', function(ws, req) {	
  ws.on('message', wson.onmsg(ws));
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))