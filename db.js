var MongoClient = require('mongodb').MongoClient;
// use if want to use shared mongo (from token api)
// var url = 'mongodb://stefanie-token-mongo:27017';
var url = 'mongodb://mongo:27017';
var _db;

module.exports = {
    connectToServer: function() {
        MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
            if(err){
                console.log("can't connect to stefanie-userDB");   
            }else{
                console.log("connected to stefanie-userDB");   
                _db = client.db('stefanie-userDB');  
                // if table already created, this code unused           
                _db.createCollection("user", function(err, res) {
                    if (err) throw err;
                });
                _db.createIndex("user", {accountNumber:1},{unique:1},function(err, res) {
                    if (err) throw err;
                });
                _db.createIndex("user", {idNumber:1},{unique:1},function(err, res) {
                    if (err) throw err;
                });
                _db.createIndex("user", {userName:1},{unique:1},function(err, res) {
                    if (err) throw err;
                });
            }
        } );
    },
    getDb: function() {
        return _db;
    },
    disconnectDB: function() {
        _db.close();
    } 

}