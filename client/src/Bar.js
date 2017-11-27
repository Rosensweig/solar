import React, { Component } from 'react';
import './styles.css';
import Chart from 'chart.js';

class Bar extends Component {

	constructor(props) {
		super(props);
		this.drawChart = this.drawChart.bind(this);
	}
	
  render() {
  	if (document.querySelector('.HistGraphHeader')) {	// check for whether container exists yet
  		// set graph width/height based on container width.
  		const width = document.querySelector('.HistGraphHeader').offsetWidth - 40;
  		const height = (width>610) ? width*0.7 : width;	//Show shorter graph in wide screens
  		// User can scroll to see full graph on thin screens, so it's not too tiny!
  		// Note that proportions are set once — they will update only on refresh.
  		// Resizing the window without refresh will change the size of the graph,
  		// but not the width:height proportions

  		return (
	      <div className="Bar inner" >
	      	{console.log(this.props)}
	      	<h3>Electricity Usage, Bill, and Savings</h3>
	      	<canvas id="barGraph" width={width} height={height}></canvas>
	      </div>
	    );
  	} else return null; // don't render until we have size for parent component.
  	// React takes care of rendering again after this happens, but we would throw errors
  	// if we tried to access these properties before they're initialized

    
  } // closes Render


  // We'll do all our chart drawing in the componentDidUpdate hook
  componentDidUpdate() {
  	// Make sure the canvas exists before going ahead. Because of the strategy we've taken
  	// not rendering anything until we have parent container widths, we have to be careful
  	// we don't try to modify things that don't exist yet.
  	if (document.getElementById('barGraph')) { 
  	  console.log("Hello from barGraph check in componentDidUpdate");
  	  this.drawChart();
  	} else {
  		console.log("No barGraph to chart yet in componentDidUpdate.");
  		// setTimeout(this.waitForChart, 100);
  	}
  }

  drawChart() {
		var ctx = document.getElementById("barGraph").getContext('2d');

		var rawData = this.props.data;
		var labels = [];
		var kwh = [];
		var bill = [];
		var savings = [];
		for (var i=0; i<rawData.length; i++) {
			labels.unshift(this.props.monthString(rawData[i].month)+ " " + rawData[i].year);
			kwh.unshift(rawData[i].kwh);
			bill.unshift(rawData[i].bill);
			savings.unshift(rawData[i].savings);
		}

		var datasets = [
  		{
  			label: "Electricity usage (kwh)",
  			borderColor: "blue",
  			backgroundColor: "blue",
  			yAxisID: 'kwh',
  			data: kwh
  		}, {
  			label: "Bill (USD)",
  			borderColor: "red",
  			backgroundColor: "red",  			
  			yAxisID: 'USD',
  			data: bill
  		}, {
  			label: "Savings (USD)",
  			borderColor: "green",
  			backgroundColor: "green",  			
  			yAxisID: 'USD',
  			data: savings
  		}
		]

		var data = {
			labels,
			datasets
		};
		var options = {
		  scales: {
		    yAxes: [{
		      id: 'kwh',
		      type: 'linear',
		      position: 'left',
		      ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
	              return '' + value + ' kwh';
	          }
	        }
		    }, {
		      id: 'USD',
		      type: 'linear',
		      position: 'right',
		      ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
	              return '$' + value;
	          }
	        }
		    }]
		  }
		}

		var bar = new Chart(ctx, {
			type: 'bar',
			data,
			options
		})
  }

} // closes Bar component

export default Bar;
