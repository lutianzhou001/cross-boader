const mysql = require('mysql')


let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'contracts',
  port: '3399'
})

async function saveData(res, contract_name, content) {

  let queryTable = 'shouw full columns from ' + contract_name

  connection.query(queryTable, function (err, data) { if (err) { console.log(err) } else { console.log(data) } })

  connection.query(' INSERT INTO ' + contract_name + ' (res,contract_name,content) VALUES(?,?,?)', [contract_name, content, 'CURD', created], (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log("success")
  }
},



async function quereyData(res, req) {

}


module.exports = {
  saveData,
  quereyData
}
