var http = require('http');
var promise = require('promise');
var foo = function(req,res)
{
var body = "this is test case";
var length = body.length;
/*res.writeHead(200,{
	'Content-Type':'text/plain',
	'Content-Length': '6'
});*/
//res.end('shekhar');

 var a = new promise()

var a = xyz('5',function(aa){
    console.log(aa);
    return aa;
});
 res.end(a);
}

function xyz(arg,callback)
{
    var aa = 55;
	return callback(aa);
}




http.createServer(foo).listen(8000);
console.log('start server');
