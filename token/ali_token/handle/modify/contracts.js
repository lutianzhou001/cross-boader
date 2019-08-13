const mysql =  require('mysql')


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'contracts',
    port: '3399'
})

connection.connect(function (err) {
    if (err) {
        console.error(err)
        return;
    }
    console.log('连接成功 id ' + connection.threadId);
});

async function createContract(res,contract_name,content,created){

connection.query('INSERT INTO allcontracts(contract_name,content,type,created) VALUES(?,?,?,?)', [contract_name,content,'CURD',created], (err, results) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log("success")
                            connection.query('SELCT LAST_INSERT_ID()',function(err,data){if (err){res.status(200).json({success:0,id:0}).end();} else {res.status(200).json({success:1,id:data[0]['LAST_INSERT_ID()']}).end()}})
                        })

}

async function createTable(res,contract_name,content){


connection.query('CREATE TABLE ...')  


let create = `create table if not exists` + contract_name + ``


}



async function queryContracts(res){
connection.query('SELECT * FROM allcontracts', async(err,results,fields) => {if (err){console.log(err)} else {

var response  = []

for (i=0;i<results.length;i++)
{
  var obj = {}
  obj.id = results[i].contractid
  obj.name = results[i].contract_name
  obj.type = results[i].type
  obj.created = results[i].created
  console.log(obj)
  response.push(obj)
}

res.status(200).json(response).end()
}}) 
}

module.exports = {

createContract,
queryContracts
}





