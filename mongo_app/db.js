//var mysql      = require('mysql');
//var connection = mysql.createConnection({
//  host     : 'localhost',
//  user     : 'root',
//  password : 'sparx',
//  database : 'mysql'
//});
//connection.connect(function(err){
//if(!err) {
//    console.log("Database is connected");
//} else {
//    console.log("Error while connecting with database");
//}
//});
//module.exports = connection;
var user_handler = require('./conn');
var url = "mongodb://localhost:27017/";

user_handler.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});