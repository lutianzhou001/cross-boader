var http = require("http");
var express = require("express");
var app = express();

app.post('/apply', function(req, res){
    //你可以在这里处理post请求
    var userId = req.body.userId
    var userName = req.body.userName
    var value = req.body.value
    var shopId = req.body.shopId
    var shopName = req.body.shopName
    var time  = req.body.time
    res.send("hello world");
    res.end();
});

http.createServer(app).listen(3000, function(){
    console.log("server start");
});
