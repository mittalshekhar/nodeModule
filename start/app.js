var http = require('http');

var foo = async function(req, res){
  var a = await xyz('149'); 
  res.write("", a);
  res.writeHead(200, {'content-type':'text/html'});
  res.write(a);

  res.write("test", a);
  console.log(a);
}

function xyz(arg){
  var aa = 51;
  return aa;
}

http.createServer(foo).listen(8000);
console.log('start server');

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