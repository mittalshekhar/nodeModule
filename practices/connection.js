var mysql      = require('mysql');
var connect = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sparx',
  database : 'nodeSetup'
});
connect.connect(function(err){
  //res.end('This is in connection file');
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

module.exports = connect;
