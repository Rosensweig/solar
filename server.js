// server.js

// set up ======================================================================
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;

var morgan       = require('morgan');
var bodyParser   = require('body-parser');


// set up express application
if(process.env.NODE_ENV !== 'test') {	// Don't log with Morgan in test environment
	app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./app/routes.js')(app); // load routes and pass in app

app.listen(port);
console.log('Listening on port ' + port);
module.exports = app;	// for testing