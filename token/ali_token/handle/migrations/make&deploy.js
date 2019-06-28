const fs = require('fs')
const env = require('../env/env')
const path = require('path')

const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../contracts/MyToken_sol_MyToken.abi'), String))
const bytecode = fs.readFileSync(path.resolve(__dirname, '../../contracts/MyToken_sol_MyToken.bin'))

const contractName = 'MyTokenv2.0.3'

let myContract = env.chain.ctr.contract(contractName, abi)

myContract.new(bytecode, {
  from: 'qinxi'
}, (err, contract, data) => {
  console.log(err)
  console.log(data)
})
