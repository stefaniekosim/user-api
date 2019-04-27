var app = require('./app');
var port = process.env.PORT || 14102;

var server = app.listen(port, function() {
  console.log('User server listening on port ' + port);
});