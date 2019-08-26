var Web3 = require('web3')
var contract = require("truffle-contract")
var provider = new Web3.providers.HttpProvider("http://119.3.43.136:8203")
var contract = require("truffle-contract")
var fs = require('fs')


async function insertOnChain(num, orderId, keys, values) {
  var promiseOnChain = new Promise(function (resolve, reject) {
    fs.readFile('../build/contracts/International.json', 'utf8', async function (err, data) {
      if (err) console.log(err);
      var International = JSON.parse(data)
      var MyContract = contract(International)
      MyContract.setProvider(provider)
      MyContract.at("0x56956D9E28356031395FbBC2D30dFaBCe9E1f958").then(function (instance) {
        return instance.insertconfirmPurchase(num, orderId, keys, values, {
          from: "0x14ca04ff85747def87d6c6c566db84cc24e4643b"
        })
      }).then(function (result) {
        resolve(result)
      })
    })
  })
  var res = await promiseOnChain.then(function (value) { return value })
  console.log(res.receipt.transactionHash)
}


async function queryOnChain(num, orderId) {
  var promiseQueryChain = new Promise(function (resolve, reject) {
    fs.readFile('../build/contracts/International.json', 'utf8', function (err, data) {
      if (err) console.log(err);
      var International = JSON.parse(data)
      var MyContract = contract(International)
      MyContract.setProvider(provider)
      MyContract.at("0x56956D9E28356031395FbBC2D30dFaBCe9E1f958").then(function (instance) {
        return instance.queryconfirmPurchase.call(num, orderId, "key002", ["value001", "value002"])
      }).then(function (result) {
        resolve(result)
      })
    })
  })
  var res = await promiseQueryChain.then(function (value) { return value })
  console.log(res)
}



async function queryTotalonChain() {
  var promiseQueryTotalChain = new Promise(function (resolve, reject) {
    fs.readFile('../build/contracts/International.json', 'utf8', function (err, data) {
      if (err) console.log(err);
      var International = JSON.parse(data)
      var MyContract = contract(International)
      MyContract.setProvider(provider)
      MyContract.at("0x56956D9E28356031395FbBC2D30dFaBCe9E1f958").then(function (instance) {
        return instance.queryTotalPurchase.call()
      }).then(function (result) {
        console.log(result)
      })
    })
  })
  var res = await promiseQueryTotalChain.then(function (value) { return, value })
  console.log(res)
}

module.exports = {

  insertOnChain,
  queryOnChain,
  queryTotalonChain

}
