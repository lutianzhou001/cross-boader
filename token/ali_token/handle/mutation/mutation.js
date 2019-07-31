const Chain = require("@alipay/mychain/index.node") //在 node 环境使用 TLS 协议
const env = require("../env/env")
const fs = require('fs')
const path = require('path')
const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../contracts/MyToken_sol_MyToken.abi'), String))
const contractName = 'MyTokenv2.0.3'
// 使用新创建的key创建账户

function CreateAccount(userId) {
  return new Promise((resolve, reject) => {
    const newKey = Chain.utils.generateECKey();
    const privateKey = newKey.privateKey.toString('hex')
    const publicKey = newKey.publicKey.toString('hex')
    env.chain.ctr.CreateAccount({
      from: 'chiyun',
      to: userId,
      data: {
        recover_key: '0x' + newKey.publicKey.toString('hex'),      // 新账户恢复公钥
        auth_key: '0x' + newKey.publicKey.toString('hex'),         // 新目标账户公钥
        auth_weight: 100                                          // 权重值
      }
    }, (err, data) => {
      if (err != null || data.return_code != 0) {
        reject(Error('create account failed', err))
      }
      resolve({
        privateKey,
        publicKey
      })
    })
  })
}

function Issue(to, value) {
  return new Promise((resolve, reject) => {
    let myContract = env.chain.ctr.contract(contractName, abi)
    myContract.transfer(to, value, { from: 'chiyun' }, (err, output, data) => {
      if (err != null) {
        reject(err)
        console.log(data)
      } else {
        var txhash = data.txhash
        resolve({ txhash, output })
      }
    })
  })
}

/*
from 转账发起用户id或者identity
publicKey 用户公钥
privateKey 用户私钥
to 转账目标账户identity
value 转账数量
*/
function Transfer(from, publicKey, privateKey, to, value) {
  return new Promise((resolve, reject) => {

    env.opt.userPublicKey = publicKey
    env.opt.userPrivateKey = privateKey
    env.opt.userRecoverPublicKey = publicKey
    env.opt.userRecoverPrivateKey = privateKey
    env.chain.setUserKey(env.opt)
    env.chain.setUserRecoverKey(env.opt)

    let myContract = env.chain.ctr.contract(contractName, abi)
    myContract.transfer(to, value, { from: from }, (err, output, data) => {
      if (err != null) {
        reject(err)
        console.log(data)
      } else {
        var txhash = data.txhash
        resolve({ txhash, output })
      }
    })
  })
}

function NativeDepositData(hashData) {
  console.log("begin")
  return new Promise((resolve, reject) => {
    env.chain.ctr.NativeDepositData({
      from: 'chiyun',
      to: 'chiyun',
      data: {
        payload: hashData  //存证的数据内容，被序列化为 16 进制
      }
    }, (err, data) => {
      if (err != null || data.return_code != 0) {
        reject(Error('native deposit data failed', err))
      } else {
        var txhash = data.txhash
        var blockNumber = data.block_number
        console.log(data)
        resolve({ txhash, blockNumber })
      }
    })
  })
}


module.exports = {
  CreateAccount,
  Issue,
  Transfer,
  NativeDepositData
}


