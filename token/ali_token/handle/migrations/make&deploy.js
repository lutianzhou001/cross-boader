const fs = require('fs')
const env = require('../env/env')
const path = require('path')

const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../contracts/CRUDApp_sol_CrudApp.abi'), String))
const bytecode = fs.readFileSync(path.resolve(__dirname, '../../contracts/CRUDApp_sol_CrudApp.bin'))

const contractName = 'CRUDApp5'

let myContract = env.chain.ctr.contract(contractName, abi)

myContract.new(bytecode, {
  from: 'chiyun'
}, (err, contract, data) => {
  console.log(err)
  console.log(data)
})
