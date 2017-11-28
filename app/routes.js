const path = require('path');
const express  = require('express');

// Source data was modified slightly to conform to JSON standards.
// Specifically, it needed to be an object rather than an array,
// so I wrapped the provided array in an object, and the entire
// original array is inside the "data" key.
// Note also that, for expediency, we're loading and changing data
// in memory, which will be lost if the server restarts.
// For a production app, it would need to be stored in a database,
// or at least modifying a file that will retain state through server updates.
const utilData = require('../config/utilData.json');

module.exports = function(app) {

	//return static assets such as JS bundle
	app.use(express.static(path.resolve(__dirname, '..', 'client/build'))); // allows browser to access static files, such as bundle.js

	// return built react app for production (root will only be called on client in dev)
	app.get('/', (req, res) => {
	  res.sendFile(path.resolve(__dirname, '..', 'client/build', 'index.html')); // renders React app on browser call to home directory
	});

	// Return current utility data
	app.get('/data', (req, res) => {
		res.json(utilData);
	});

	//update utility data for a particular month and year
	app.put('/data', (req, res) => {
		// Make sure update data specifies a year and month
		if (!req.body.year || !req.body.month) {
			return res.status(500).send({error: "Update data must contain valid year and month."});
		}
		for (let i=0; i<utilData.data.length; i++) {
			let dataPoint = utilData.data[i];
			//check whether year and month match on this dataPoint
			if (dataPoint.year === req.body.year && dataPoint.month === req.body.month) {
				// update data fields, with failsafe in case of empty field in req.body
				dataPoint.kwh = req.body.kwh || dataPoint.kwh;
				dataPoint.bill = req.body.bill || dataPoint.bill;
				dataPoint.savings = req.body.savings || dataPoint.savings;
				return res.json(utilData.data);
			} else if (dataPoint.year <= req.body.year && dataPoint.month < req.body.month) {
				//data is sorted by date, so we don't have to check the rest of the array
				// insert data here so that it stays sorted.
				utilData.data.splice(i,0,req.body);
				return res.json(utilData.data);
			}
		}
		// We didn't find a matching dataPoint, so add a new one (and return it)
		// Adding to the end of the array because we checked dates in utilData.data
		// if we got here, our new data point is older than all existing data.
		utilData.data.push(req.body);
		return res.json(utilData.data);
	});

	//delete data for a particular year and month
	app.delete('/data', (req, res) => {
		// Make sure delete data specifies a year and month
		if (!req.body.year || !req.body.month) {
			return res.status(500).send("Delete requests must specify valid year and month.");
		}
		for (let i=0; i<utilData.data.length; i++) {
			//check whether year and month match
			if (utilData.data[i].year === req.body.year && utilData.data[i].month === req.body.month) {
				utilData.data.splice(i,1);	//delete current datapoint from our data store
				return res.json(utilData.data);	//send complete copy of current data
			}
		}
		return res.json({data: "Date not found!"});	//No match, so tell the client that
	});

} // ends module.exports