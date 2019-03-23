var http = require('http');
<<<<<<< HEAD
var foo = function(req,res)
{
var body = "this is test case";
var length = body.length;
/*res.writeHead(200,{
	'Content-Type':'text/plain',
	'Content-Length': '6'
});*/
//res.end('shekhar');
var a = xyz('5',function(aa){
    console.log(aa);
    return aa;
});
res.end(a);
console.log(a);
=======

var foo = async function(req, res){
  var a = await xyz('149'); 
  res.write("", a);
  res.writeHead(200, {'content-type':'text/html'});
  res.write(a);

  res.write("test", a);
  console.log(a);
>>>>>>> 581c7c1ab4c82d4ec2ba5103173901ada8ae1bf0
}

function xyz(arg){
  var aa = 51;
  return aa;
}

http.createServer(foo).listen(8000);
console.log('start server');
<<<<<<< HEAD
=======

// var http = require('http');

// var foo = function(req, res){
//     xyz('5',function(aa){
//         console.log(aa);
//         var ress = aa;
//         res.end("tes", ress);
//         return aa;
//     });
    
// }

// function xyz(arg,callback){
//     var aa = 55;
//     return callback(aa);
// }

// http.createServer(foo).listen(8000);
// console.log('start server');
>>>>>>> 581c7c1ab4c82d4ec2ba5103173901ada8ae1bf0
