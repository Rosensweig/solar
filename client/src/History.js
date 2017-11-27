import React, { Component } from 'react';
import './styles.css';

class History extends Component {
	
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
      <div className="History inner">
      	{console.log(this.props)}
      	{rows}
      </div>
    );
  } // closes Render

} // closes History component

export default History;
