const query = require('./query')
const utils = require('../../utils/utils')

async function QueryTotalSupply() {
    var res = await query.QueryTotalSuppy()
        console.log(res)
}

async function QueryBalanceOf(){
    var userId = '0xc1437b3992fd172ca55a676e5d6e44593e48ba1784d6597561fdc3a7c9ba78bd'
    var res = await query.QueryBalanceOf(userId)
    console.log(res)
}

async function QueryAccount(){
    var userId = 'xilaii53'
    var res = await query.QueryAccount(userId)
    console.log(res)
}

async function QueryTransaction(){
    var txhash = '0x80a86a068669c6f0e4178ba4fb9165d653a5ce370751b9e1e037d641a433a5c5'
    var hashData = await query.QueryTransaction(txhash)
    var res = await utils.Hex2Str(hashData.originData)
    var data = JSON.parse(res.str)
    console.log(data)
}

//QueryTotalSupply()
//QueryBalanceOf()
QueryAccount()
//QueryTransaction()
