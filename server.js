const model = require('./token/ali_token/handle/model/model')
const contracts = require('./token/ali_token/handle/modify/contracts')
const chain = require('./token/ali_token/handle/chain/chain')
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/contracts/createContract', async function (req, res) {
    console.log("createContract")
    var contract_name = req.body.contract_name
    var content = JSON.stringify(req.body.content)
    var created = Date.now().toString()
    var result = await contracts.createContract(res, contract_name, content, created)
    var createTable = await contracts.createTable(res, req.body.contract_name, req.body.content)
})

app.get('/api/contracts/queryContracts', async function (req, res) {
    console.log("queryContracts")
    var result = await contracts.queryContracts(res)
})

app.get('/api/chain/queryBlock', async function (req, res) {
    console.log("queryBlock")
    var result = await chain.queryBlock(req.body.blockNumber, res)
})

app.get('/api/chain/queryTransaction', async function (req, res) {
    console.log("queryTransaction")
    var result = await chain.queryTransaction(req.body.txHash, res)
})

app.get('/api/chain/queryBalance', async function (req, res) {
    console.log("queryBalance")
    var result = await chain.queryBalance(req.body.account, res)
})

app.post('/api/models/saveData', async function (req, res) {
    console.log("saveData")
    var result = await model.batchSaveData(res, req.body.contract_name, req.body.content)
});


app.get('/api/models/queryData', async function (req, res) {
    console.log("queryData")
    var result = await model.queryData(res, req.body.contract_name, req.body.filter)
});


http.createServer(app).listen(3000, function () {
    console.log("server start");
});
