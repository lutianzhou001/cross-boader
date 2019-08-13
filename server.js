const utils = require('./token/ali_token/utils/utils')
const mutation = require('./token/ali_token/handle/mutation/mutation')
//const models = require('./token/ali_token/handle/mutation/models')
const contracts = require('./token/ali_token/handle/modify/contracts')
const deploy =  require('./token/ali_token/handle/modify/deployContract')
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
    console.log("createContract")
    console.log(req.body)
    var contract_name = req.body.contract_name
    var content = JSON.stringify(req.body.content)
    var created = Date.now().toString()
    console.log(created)
    var result = await contracts.createContract(res,contract_name,content,created)
    var createTable = await contracts.createTable(res,req.body.contract_name,req.body.content)
});

app.get('/contracts/queryContracts',async function(req,res){
    console.log("queryContracts")
    console.log(req.body)
    var result = await contracts.queryContracts(res)
})


app.post('/contracts/deployContract', async function(req, res){
    console.log("deployContract")
    console.log(req.body)
    var id = req.body.id
    var result = await deploy.deployContract(res,id)
});

/*
app.post('api/models/saveData',async function(req,res){
    console.log("saveData")
    console.log(req.body)
    var result = await models.saveData(res,req.body.contract_name,req.body.content)
})

app.get('api/models/queryData',async function(req,res){
    console.log("queryData")
    console.log(req.body)
    var result = await models.queryData(res,req.body.contract_name,req.body.content)
})
*/

http.createServer(app).listen(3000, function(){
    console.log("server start");
});
