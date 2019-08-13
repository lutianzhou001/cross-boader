const mysql = require('mysql')


let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'contracts',
  port: '3399'
})

async function saveData(response, contract_name, content) {
  console.log(content)
  let queryTable = 'show full columns from ' + contract_name
  connection.query(queryTable, function (err, data) {
    if (err) { console.log(err) } else {

      var data_columns = ''

      for (i = 1; i < data.length - 1; i++) {
        data_columns = data_columns + data[i].Field + ','
      }
      data_columns = data_columns + data[i].Field

      var insert_columns = ''
      for (i = 1; i < data.length - 1; i++) {
        insert_columns = insert_columns + '?' + ','
      }
      insert_columns = insert_columns + '?'
      var obj = []
      for (var key in content) {
          obj.push(content[key])
      }
      let saveData = 'INSERT INTO ' + contract_name + '(' + data_columns + ') VALUES (' + insert_columns + ')'
      console.log(saveData)
      connection.query(saveData, obj, (err, res) => {
        if (err) {
          console.log(err)
        }
        console.log("success")
        response.status(200).json({"success": 1 ,"errMessage":"" , "txHash":"0x11579857197520175015701725017047123095" , "blockNumber":"213011011","key":"0x172105723057350175031422"}).end()
      })
    }
  })
}



async function quereyData(res, req) {

}


module.exports = {
  saveData,
  quereyData
}
