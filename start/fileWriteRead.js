var http = require('http');
var foo = function(req,res)
{
var body = "this is test case";
var length = body.length;
res.writeHead(200,{
	'Content-Type':'text/plain',
	'Content-Length': '7'
});
res.end('shekhar');
}

http.createServer(foo).listen(8000);
console.log('start server');
