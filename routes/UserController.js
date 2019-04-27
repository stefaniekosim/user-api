var express = require('express');
var router = express.Router();
var user=require('../Models/user');
const uuidv4 = require('uuid/v4');
var ValidateToken = require('./ValidateToken');
var usr;
function setUser(req){
    usr = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        idNumber: req.body.idNumber
    };
}
router.post('/findAllUser',ValidateToken,function(req,res,next){
    user.getAll(req, function(err,result){
        if(err){
            res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
        }else{
            res.status(200).send({ respCode: '0', data: result.data });
        }
    });    
});

router.post('/findUserByUserName',ValidateToken,function(req,res,next){
    setUser(req);
    user.getByUser(usr, function(err,result){
        if(err){
            res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
        }else{
            res.status(200).send({ respCode: '0', data: result.data });
        }
    });    
});


router.post('/findUserByAccNo',ValidateToken,function(req,res,next){
    setUser(req);
    user.getByAccNo(usr, function(err,result){
        if(err){
            res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
        }else{
            res.status(200).send({ respCode: '0', data: result.data });
        }
    });    
});


router.post('/findUserByIdNo',ValidateToken,function(req,res,next){
    setUser(req);
    user.getByIdNo(usr, function(err,result){
        if(err){
            res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
        }else{
            res.status(200).send({ respCode: '0', data: result.data });
        }
    });    
});


router.post('/findUserByAccAndIdNo',ValidateToken,function(req,res,next){
    setUser(req);
    user.getByIdAndAccNo(usr, function(err,result){
        if(err){
            res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
        }else{
            res.status(200).send({ respCode: '0', data: result.data });
        }
    });    
});
router.post('/addUser',ValidateToken,function(req,res,next){
    setUser(req);
    usr.id= uuidv4() ;
    var cnt=1;
    // check user exists by UserName
    user.countByUserName(usr.userName, function(err,result){
        if(err){
            res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
        }
        cnt = result;
        if(cnt == 0){
            user.save(usr, function(err,result){
                if(err){
                    res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
                }else{
                    if(result == 1){
                        res.status(200).send({ respCode:'0', message: "Username succesfully saved." });
                    }else{
                        res.status(200).send({ respCode: '5', message: "Error save username." });
                    }
                }
            });
        }else{
            res.status(200).send({ respCode: '5', message: "UserName Already Exists." });
        }
    });
    
    
});

router.post('/editUser',ValidateToken,function(req,res,next){
    setUser(req);
    var cnt=0;
    // check user exists by UserName
    user.countByUserName(usr.userName, function(err,result){
        if(err){
            res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
        }
        cnt = result;
        if(cnt != 0){
            user.update(usr, function(err,result){
                if(err){
                    res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
                }else{
                    if(result == 1){
                        res.status(200).send({ respCode:'0', message:  "Username succesfully updated." });
                    }else{
                        res.status(200).send({ respCode: '5', message: "Error update username." });
                    }
                }
            });
        }else{
            res.status(200).send({ respCode: '5', message:  "UserName Not Registered." });
        }
    });
        
});

router.post('/removeUser',ValidateToken,function(req,res,next){
    setUser(req);
    var cnt=0;
    // check user exists by UserName
    user.countByUserName(usr.userName, function(err,result){
        if(err){
            res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
        }
        cnt = result;
        if(cnt != 0){
            user.delete(usr, function(err,result){
                if(err){
                    res.status(500).send({ respCode: '99', message: 'Internal Server Error.' });
                }else{
                    if(result== 1){
                        res.status(200).send({ respCode:'0', message: "Username succesfully deleted." });
                    }else{
                        res.status(200).send({ respCode: '5', message:  "Error delete username." });
                    }
                }
            });
        }else{
            res.status(200).send({ respCode: '5', message:  "UserName Not Registered." });
        }
    });    
});
module.exports=router;