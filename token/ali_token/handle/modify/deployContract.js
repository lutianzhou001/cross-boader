const fs = require('fs')
const env = require('../env/env')
const path = require('path')

const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../contracts/CRUDApp5_sol_CrudApp.abi'), String))
const bytecode = fs.readFileSync(path.resolve(__dirname, '../../contracts/CRUDApp5_sol_CrudApp.bin'))


async function deployContract(res, id) {

  const contractName = 'CRUDApp__' + id

  let myContract = env.chain.ctr.contract(contractName, abi)

  myContract.new(bytecode, {
    from: 'chiyun'
  }, (err, contract, data) => {
    console.log(err)
    var obj = {}
    if (err) { obj.success = 0; obj.hash = null } else { obj.success = 1; obj.hash = data.txhash }
    res.status(200).json(obj)
  })

}


module.exports = {

  deployContract

}
