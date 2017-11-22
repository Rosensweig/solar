const path = require('path');
const express  = require('express');

module.exports = function(app) {

	app.use(express.static(path.resolve(__dirname, '..', 'client/build'))); // allows browser to access static files, such as bundle.js

	app.get('/', (req, res) => {
	  res.sendFile(path.resolve(__dirname, '..', 'client/build', 'index.html')); // renders React app on browser call to home directory
	});

	app.get('/test', (req, res) => {
		res.json({"message": "Hello world!"});
	})

} // ends module.exports