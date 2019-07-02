const utils = require('./token/ali_token/utils/utils')
const mutation = require('./token/ali_token/handle/mutation/mutation')
const {Issue} = require('./token/ali_token/handle/mutation/mutation')
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/', async function(req, res){
    console.log(req.body)
    var dataStr = JSON.stringify(req.body)
    var hashData = await utils.Str2Hex(dataStr)
    var result = await mutation.NativeDepositData(hashData.hex)
    console.log(result)
    res.send(result.txhash);
    res.end();
});

http.createServer(app).listen(3000, function(){
    console.log("server start");
});
