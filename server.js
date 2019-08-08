const utils = require('./token/ali_token/utils/utils')
const mutation = require('./token/ali_token/handle/mutation/mutation')
const createContract = require('./token/ali_token/handle/modify/createContract')
const {Issue} = require('./token/ali_token/handle/mutation/mutation')
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
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

app.post('/contracts/createContract', async function(req, res){
    console.log("aaa")
    console.log(req.body)
    var contract_name = req.body.contract_name
    var content = JSON.stringify(req.body.content)
    var created = Date.now().toString()
    console.log(created)
    var result = await createContract.createContract(res,contract_name,content,created)
});








http.createServer(app).listen(3000, function(){
    console.log("server start");
});
