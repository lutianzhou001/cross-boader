var Web3 = require('web3')
var contract = require("truffle-contract")
var provider = new Web3.providers.HttpProvider("http://119.3.43.136:8203")
var contract = require("truffle-contract")
var fs = require('fs')


async function insertOnChain(num, orderId, contract_name, keys, values) {
  var promiseOnChain = new Promise(function (resolve, reject) {
    fs.readFile('./truffle/build/contracts/International.json', 'utf8', async function (err, data) {
      if (err) console.log(err);
      var International = JSON.parse(data)
      var MyContract = contract(International)
      MyContract.setProvider(provider)
      MyContract.at("0xF0fF7846039857B1051f0820E25C408c8AFEAEC0").then(function (instance) {
        return instance.insertconfirmPurchase(num, orderId, contract_name, keys, values, {
          from: "0x14ca04ff85747def87d6c6c566db84cc24e4643b"
        })
      }).then(function (result) {
        resolve(result)
      })
    })
  })
  var res = await promiseOnChain.then(function (value) { return value })
  return {
    txHash: res.receipt.transactionHash,
    blockNumber: res.receipt.blockNumber
  }
}

async function queryOnChain(num, orderId, contract_name) {
  var promiseQueryChain = new Promise(function (resolve, reject) {
    fs.readFile('./truffle/build/contracts/International.json', 'utf8', function (err, data) {
      if (err) console.log(err);
      var International = JSON.parse(data)
      var MyContract = contract(International)
      MyContract.setProvider(provider)
      MyContract.at("0xF0fF7846039857B1051f0820E25C408c8AFEAEC0").then(function (instance) {
        return instance.queryconfirmPurchase.call(num, orderId, contract_name, "key002", ["value001", "value002"], {
          from: "0x14ca04ff85747def87d6c6c566db84cc24e4643b"
        })
      }).then(function (result) {
        resolve(result)
      })
    })
  })
  var res = await promiseQueryChain.then(function (value) { return value })
  return res
}


async function queryTotalonChain() {
  var promiseQueryTotalChain = new Promise(function (resolve, reject) {
    fs.readFile('./truffle/build/contracts/International.json', 'utf8', function (err, data) {
      if (err) console.log(err);
      var International = JSON.parse(data)
      var MyContract = contract(International)
      MyContract.setProvider(provider)
      MyContract.at("0xF0fF7846039857B1051f0820E25C408c8AFEAEC0").then(function (instance) {
        return instance.queryTotalPurchase.call()
      }).then(function (result) {
        console.log(result)
      })
    })
  })
  var res = await promiseQueryTotalChain.then(function (value) { return value })
  return res
}

module.exports = {

  insertOnChain,
  queryOnChain,
  queryTotalonChain

}
