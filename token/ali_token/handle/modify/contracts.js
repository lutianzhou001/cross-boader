const mysql = require('mysql')
const onChain = require('../../../../fisco/nodejs-sdk/packages/cli/onChain')


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

async function createContract(res, contract_name, content, created) {

  connection.query('INSERT INTO allcontracts(contract_name,content,type,created) VALUES(?,?,?,?)', [contract_name, content, 'CURD', created], (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log("success")
    connection.query('select * from allcontracts order by contractid desc LIMIT 1', function (err, data) { if (err) { res.status(200).json({ success: 0, id: 0 }).end(); } else { res.status(200).json({ success: 1, id: data[0]['contractid'] }).end() } })
  })

}

async function createTable(res, contract_name, content) {
  
  // first we will add in a sql
  let create = `create table if not exists ` + contract_name + `(id int primary key auto_increment ,`
  for (var i = 0; i < content.length; i++) {
    create = create + " " + content[i].name + " " + content[i].type + " not null, "
  }
  create = create + "blockNumber varchar(40), txHash varchar(100)  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;"
  connection.query(create, function (err, results, fields) {
    if (err) {
      console.log(err.message)
    }

  })

  // next we will add onChain
  await onChain.createTable(content)
}


async function queryContracts(res) {
  connection.query('SELECT * FROM allcontracts', async (err, results, fields) => {
    if (err) { console.log(err) } else {
      var response = []
      for (i = 0; i < results.length; i++) {
        var obj = {}
        obj.id = results[i].contractid
        obj.name = results[i].contract_name
        obj.type = results[i].type
        obj.created = results[i].created
        response.push(obj)
      }
      res.status(200).json(response).end()
    }
  })
}

module.exports = {

  createContract,
  queryContracts,
  createTable
}





