const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('./'))
var expressWs = require('express-ws')(app);
app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))