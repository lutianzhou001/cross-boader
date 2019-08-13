const mysql = require('mysql')


let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'contracts',
  port: '3399'
})

async function saveData(res, contract_name, content) {

  let queryTable = 'show full columns from ' + contract_name
  
  connection.query(queryTable, function (err, data) { if (err) { console.log(err) } else {

  var data_columns = ''
  
  for (i = 1; i < data.length -1 ; i++ ){
     data_columns = data_columns +  data[i].Field + ','
}
  data_columns = data_columns + data[i].Field

  var insert_columns = ''
  for (i=1; i<data.length -1 ;i++){
     insert_columns = insert_columns + '?' + ','
}
  insert_columns = insert_columns + '?'


  var obj = []
  
  for (i=0 ;i < content.length; i++){
    for( var key in content[i]){
      obj.push(content[i][key])}}


console.log(obj)


  let saveData = 'INSERT INTO '+ contract_name + '(' + data_columns + ') VALUES (' + insert_columns + ')' 


  connection.query(saveData, obj, (err,res){ if (err){console.log(err)} else {console.log("success")}})
  
} })

  

}



async function quereyData(res, req) {

}


module.exports = {
  saveData,
  quereyData
}
