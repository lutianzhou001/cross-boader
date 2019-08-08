const mysql =  require('mysql')



async function createContract(res,contract_name,content,created){

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'contracts',
    port: '3399'
})


connection.connect(function (err) {
    if (err) {
        console.error('connect failed')
        return;
    }
    console.log('连接成功 id ' + connection.threadId);
});


console.log("created is ..."+ created)

connection.query('INSERT INTO allcontracts(contract_name,content,type,created) VALUES(?,?,?,?)', [contract_name,content,'CURD',created], (err, results) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log("success")
                            connection.query('SELCT LAST_INSERT_ID()',function(err,data){if (err){res.status(200).json({success:0,id:0}).end();} else {res.status(200).json({success:1,id:data[0]['LAST_INSERT_ID()']}).end()}})
                        })

}

module.exports = {

createContract

}





