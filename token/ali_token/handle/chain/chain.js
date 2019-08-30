const Web3 = require('web3')

var web3 = new Web3(new Web3.providers.HttpProvider("http://119.3.43.136:8203"));

async function queryBlock(blockNumber, response) {
    await web3.eth.getBlock(blockNumber, function (err, res) {
        if (err) {
            response.status(200).json(err).end()
        } else {
            response.status(200).json(res).end()
        }
    })
}

async function queryBalance(account, response) {
    await web3.eth.getBalance(account, function (err, res) {
        if (err) {
            response.status(200).json(err).end()
        } else {
            response.status(200).json(res).end()
        }
    })
}


async function queryTransaction(txHash, response) {
    await web3.eth.getTransaction(txHash, function (err, res) {
        if (err) {
            response.status(200).json(err).end()
        } else {
            response.status(200).json(res).end()
        }
    })
}


async function queryTransactionReceipt(txHash, response) {
    await web3.eth.getTransactionReceipt(txHash, function (err, res) {
        if (err) {
            response.status(200).json(err).end()
        } else {
            response.status(200).json(res).end()
        }
    })
}

module.exports = {
    queryBlock,
    queryBalance,
    queryTransaction,
    queryTransactionReceipt
}




