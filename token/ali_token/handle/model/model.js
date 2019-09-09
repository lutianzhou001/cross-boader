const mysql = require('mysql')
const coMysql = require('co-mysql')
const onChain = require('../../../../truffle/onChainFunction/onChainFunction')
const countOccurences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);

let pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'contracts',
  port: '3399'
})

const connection = coMysql(pool)

async function saveData(response, contract_name, content, orderId) {

  var keys = []
  for (var key in content) {
    keys.push(key)
  }

  var values = []
  for (var key in content) {
    values.push(content[key])
  }


  var promiseOnChainSave = new Promise(function (resolve, reject) {
    connection.query('select * from ' + contract_name + ' order by id desc LIMIT 1', async function (err, data) {
      if (data.length) {
        var result = await onChain.insertOnChain(data[0]['id'] + 1, orderId, contract_name, keys, values)
        resolve(result)
      } else {
        var result = await onChain.insertOnChain(1, orderId, contract_name, keys, values)
        resolve(result)
      }
    })
  })

  var onChainData = await promiseOnChainSave.then(function (value) { return value })

  var promiseSaveData = new Promise(function (resolve, reject) {
    let queryTable = 'show full columns from ' + contract_name
    connection.query(queryTable, function (err, data) {
      if (err) { console.log(err) } else {
        var data_columns = ''
        for (i = 1; i < data.length - 3; i++) {
          data_columns = data_columns + data[i].Field + ','
        }
        data_columns = data_columns + data[i].Field + ',blockNumber,txHash'
        var insert_columns = ''
        for (i = 1; i < data.length - 3; i++) {
          insert_columns = insert_columns + '?' + ','
        }
        insert_columns = insert_columns + '?,?,?'
        var obj = []
        for (var key in content) {
          obj.push(content[key])
        }
        obj.push(onChainData.blockNumber)
        obj.push(onChainData.txHash)
        let saveData = 'INSERT INTO ' + contract_name + '(' + data_columns + ') VALUES (' + insert_columns + ')'
        connection.query(saveData, obj, (err, res) => {
          if (err) {
            console.log(err)
          }
          console.log("success")
          resolve({ "success": 1, "errMessage": "", "blockNumber": onChainData.blockNumber, "txHash": onChainData.txHash })
        })
      }
    })
  })
  var res = await promiseSaveData.then(function (value) { return value })
  return res
}


async function batchSaveData(response, contract_name, content) {
  var obj = []
  for (j = 0; j < content.length; j++) {
    var res = await saveData(response, contract_name, content[j], content[j].orderId)
    obj.push(res)

  }
  if (obj.length == 1) {
    response.status(200).json(obj[0]).end()
  }
  else {
    response.status(200).json({ "success": obj.length, "errMessage": "" }).end()
  }
}

async function queryTotal() {
  var res = await onChain.queryTotalonChain()
  return res
}


async function queryData(response, contract_name, filter) {

  var promiseOnChainSave = new Promise(function (resolve, reject) {
    connection.query('select * from ' + contract_name + ' order by id desc LIMIT 1', async function (err, data) {
      if (data.length) {
        var result = data[0]['id'] + 2
        resolve(result)
      } else {
        var result = 2
        resolve(result)
      }
    })
  })
  var dbNumber = await promiseOnChainSave.then(function (value) { return value })
  
  var orderId
  if (filter.orderId) {
    orderId = filter.orderId
  } else {
    orderId = "NA"
  }
  var res = await onChain.queryOnChain( dbNumber ,1, orderId, contract_name)
  res = res.substring(1)
  var arr = res.split(",")
  var count = countOccurences(arr, "orderId")
  var content = []
  for (j = 0; j < count; j++) {
    var obj = {}
    for (i = 0 + j * arr.length / count; i < 0 + j * arr.length / count + arr.length / count / 2; i++) {
      obj[arr[i]] = arr[i + arr.length / count / 2]
    }
    content.push(obj)
  }
  content = await filt(content, filter)

  response.status(200).json({ "success": 1, contract_name: contract_name, content: content }).end()
}

async function filt(obj, filter) {
  var result = []
  for (i = 0; i < obj.length; i++) {
    var flag = 1
    for (var key in filter) {
      if (obj[i][key] != filter[key]) { flag = 0; break }
    }
    if (flag == 1) {
      result.push(obj[i])
    }
  }
  return result
}

module.exports = {
  saveData,
  queryData,
  batchSaveData,
  queryTotal
}
