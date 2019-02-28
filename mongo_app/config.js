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

var MongoClient = require('mongodb').MongoClient;

module.exports = MongoClient;