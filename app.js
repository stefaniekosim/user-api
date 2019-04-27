var express = require('express');
var dbConn=require('./db');

dbConn.connectToServer( function( err, client ) {
  if (err) console.log(err);
} );

var app = express();
var usersRouter = require('./routes/UserController');      

app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  
app.use('/api/users', usersRouter);  

app.get('/api', function (req, res) {
  res.status(200).send('USER API.');
});

    
module.exports = app;  