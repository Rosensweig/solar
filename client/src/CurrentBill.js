import React, { Component } from 'react';
import './styles.css';



class CurrentBill extends Component {


  render() {
    return (
      <div className="CurrentBill">
      	<h2>Viewing Current Bill</h2>
      	<div className="inner">
      		<h3>{this.props.monthString(this.props.month)}, {this.props.year}</h3>
	      	<h3 className="tab" >Usage: {this.props.kwh} kwh</h3>
	      	<h3 className="tab" >Bill: ${this.props.bill}</h3>
	      	<h3 className="tab" >Savings: ${this.props.savings}</h3>
      	</div>
      </div>
    );
  }

} //closes CurrentBill component

export default CurrentBill;
