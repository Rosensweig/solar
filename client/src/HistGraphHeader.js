import React, { Component } from 'react';
import './styles.css';
import { BrowserRouter, Route } from 'react-router-dom';
import History from './History';
import Line from './Line';
import Bar from './Bar';


class HistGraphHeader extends Component {
	
  render() {

  	const rows = [];
  	let i = 0;
		for (let dataPoint of this.props.data) {
			rows.push(
				<div className="row" key={i}>
					<h3>{this.props.monthString(dataPoint.month)}, {dataPoint.year}</h3>
	      	<h3 className="tab">Usage: {dataPoint.kwh} kwh</h3>
	      	<h3 className="tab">Bill: ${dataPoint.bill}</h3>
	      	<h3 className="tab">Savings: ${dataPoint.savings}</h3>
				</div>
			);
			i++;
		}

    return (
      <div className="HistGraphHeader">
      	{console.log(this.props)}
      	<h2>History & Graphs</h2>
      	<nav>
      		<a href="history" className="history">History</a>
      		<a href="line" className="line">Line Graph</a>
      		<a href="bar" className="bar">Bar Graph</a>
      	</nav>
      	<BrowserRouter>
          <div>
            <Route exact path="/history" render={(props) => (<History {...props} {...this.props} />)} /> 
            <Route exact path="/line" render={(props) => (<Line {...props} {...this.props} />)} /> 
            <Route exact path="/bar" render={(props) => (<Bar {...props} {...this.props} />)} /> 
          </div>
        </BrowserRouter>
      </div>
    );
  } // closes Render

} // closes History component

export default HistGraphHeader;
