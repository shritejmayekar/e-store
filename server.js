
var express = require('express');
var app = express();
// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;
var http = require('http').Server(app);
app.use(express.static('public'));
//app.use(session({ secret: 'phantom'}));

http.listen(port,host, function() {
  console.log('listening :'+host+':'+port);
})
