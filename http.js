const http = require('http');

var server = http.createServer(function(req,res){
    console.log(req.method);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end("is ok");
});

server.listen(8080);
console.log("server is running at localhost:8080");