var dbConn=require('../db');

module.exports = {
    getByUser: function(req,result) {
        var _db = dbConn.getDb();
        _db.collection('user').find(
            {userName:req.userName}
            ).toArray(function(err, docs){
            if (err) {
                result(err, null);
            }else{
                result(null, {data: docs});
            }
        });
    },
    getByIdNo: function(req,result) {
        var _db = dbConn.getDb();
        _db.collection('user').find(
            {idNumber:req.idNumber}
            ).toArray(function(err, docs){
            if (err) {
                result(err, null);
            }else{
                result(null, {data: docs});
            }
        });
    },
    getByAccNo: function(req,result) {
        var _db = dbConn.getDb();
        _db.collection('user').find(
            {accountNumber:req.accountNumber}
            ).toArray(function(err, docs){
            if (err) {
                result(err, null);
            }else{
                result(null, {data: docs});
            }
        });
    },
    getByIdAndAccNo: function(req,result) {
        var _db = dbConn.getDb();
        _db.collection('user').find(
            {
                idNumber:req.idNumber,
                accountNumber:req.accountNumber
            }
            ).toArray(function(err, docs){
            if (err) {
                result(err, null);
            }else{
                result(null, {data: docs});
            }
        });
    },
    getAll: function(req,result) {
        var _db = dbConn.getDb();
        _db.collection('user').find().toArray(function(err, docs){
            if (err) {
                result(err, null);
            }else{
                result(null, {data: docs});
            }
        });
    },
    save: function(req,result) {
        var _db = dbConn.getDb();
        _db.collection("user").insertOne(req, function(err, res) {
            if (err) {
                result(err, null);
            }else{
                result(null, res.message.documents[0].ok);
            }
        });
        
    },
    update: function(req,result) {
        var _db = dbConn.getDb();
        _db.collection("user").updateOne(
            {userName : req.userName},
            {$set:req}, 
            {upsert:true},
            function(err, res) {
            if (err) {
                result(err, null);
            }else{
                result(null, res.message.documents[0].ok);
            }
        });
    },
    delete: function(req,result) {
        var _db = dbConn.getDb();
        _db.collection("user").deleteMany(
            {userName : req.userName},
            function(err, res) {
            if (err) {
                result(err, null);
            }else{
                result(null, res.message.documents[0].ok);
            }
        });
    },
    countByUserName:function(req,result) {
        var _db = dbConn.getDb();
        _db.collection('user').find({userName : req}).count(function (e, count) {
            result(e, count);
        });
    },

}