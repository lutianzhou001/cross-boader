const mysql = require('mysql')
const coMysql = require('co-mysql')
const onChain = require('../../../../truffle/onChainFunction/onChainFunction')

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
      var result = await onChain.insertOnChain(data[0]['id'] + 1, orderId, keys, values)
      resolve(result)
    })
  })

  var txHash = await promiseOnChainSave.then(function (value) { return value })

  var promiseSaveData = new Promise(function (resolve, reject) {
    let queryTable = 'show full columns from ' + contract_name
    connection.query(queryTable, function (err, data) {
      if (err) { console.log(err) } else {
        var data_columns = ''
        for (i = 1; i < data.length - 3; i++) {
          data_columns = data_columns + data[i].Field + ','
        }
        data_columns = data_columns + data[i].Field + ',txHash'
        var insert_columns = ''
        for (i = 1; i < data.length - 3; i++) {
          insert_columns = insert_columns + '?' + ','
        }
        insert_columns = insert_columns + '?,?'
        var obj = []
        for (var key in content) {
          obj.push(content[key])
        }
        obj.push(txHash)
        let saveData = 'INSERT INTO ' + contract_name + '(' + data_columns + ') VALUES (' + insert_columns + ')'
        connection.query(saveData, obj, (err, res) => {
          if (err) {
            console.log(err)
          }
          console.log("success")
          resolve({ "success": 1, "errMessage": "", "txHash": txHash })
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
    response.status(200).json(obj).end()
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

  var res = await onChain.queryOnChain(1, filter.OrderId)
  console.log("res is ..." + JSON.stringify(res))
  /*
  let queryData = 'SELECT * FROM ' + contract_name
  connection.query(queryData, async (err, results, fields) => {
    var obj = []
    for (i = 0; i < results.length; i++) {
      var flag = 1
      for (var key in filter) {
        if (results[i][key] != filter[key]) { flag = 0; break }
      }
      if (flag == 1) {
        obj.push(results[i])
      }
    }
    response.status(200).json({ "success": 1, "errMessage": "", "contract_name": contract_name, "content": obj }).end()
  })
  */
}


module.exports = {
  saveData,
  queryData,
  batchSaveData,
  queryTotal
}
