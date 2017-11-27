import React, { Component } from 'react';
import './styles.css';

class Admin extends Component {

	constructor(props) {
		super(props);
		this.delete = this.delete.bind(this);
		this.openEdit = this.openEdit.bind(this);
		this.submitEdit = this.submitEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			month: 0,
			year: 0,
			kwh: 0,
			bill: 0,
			savings: 0
		}
	}

  render() {

  	const rows = [];
		for (let i=0; i<this.props.data.length; i++) {
			rows.push(
				<div className="row" key={i}>
					<h3>{this.props.monthString(this.props.data[i].month)}, {this.props.data[i].year} 
						<button className="tab openEdit" onClick={this.openEdit} refer={i}>Edit</button><button className="tab delete" onClick={this.delete} refer={i}>Delete</button>
					</h3>
				</div>
			);
		}

    return (
      <div className="Admin">
      	<h2>Admin Panel</h2>
      	<form onSubmit={this.submitEdit} className="inner">
      		{rows}
      		<div className="editForm">
      			<p>
	      			<select name="month" value={this.state.month} onChange={this.handleChange}>
							  <option value={0}>Select Month</option>
							  <option value={1}>January</option>
							  <option value={2}>February</option>
							  <option value={3}>March</option>
							  <option value={4}>April</option>
							  <option value={5}>May</option>
							  <option value={6}>June</option>
							  <option value={7}>July</option>
							  <option value={8}>August</option>
							  <option value={9}>September</option>
							  <option value={10}>October</option>
							  <option value={11}>November</option>
							  <option value={12}>December</option>
							</select>
							<select className="tab" name="year" value={this.state.year} onChange={this.handleChange}>
							  <option value={0}>Select Year</option>
							  <option value={2017}>2017</option>
							  <option value={2016}>2016</option>
							  <option value={2015}>2015</option>
							  <option value={2014}>2014</option>
							  <option value={2013}>2013</option>
							  <option value={2012}>2012</option>
							  <option value={2011}>2011</option>
							  <option value={2010}>2010</option>
							  <option value={2009}>2009</option>
							  <option value={2008}>2008</option>
							</select>
						</p>
						<p><input name="kwh" type="number" value={this.state.kwh} onChange={this.handleChange} /> <label htmlFor="kwh"> kwh used</label></p>
						<p>$<input name="bill" type="number" value={this.state.bill} onChange={this.handleChange} /> <label htmlFor="bill"> bill (USD)</label></p>
						<p>$<input name="savings" type="number" value={this.state.savings} onChange={this.handleChange} /> <label htmlFor="savings"> savings (USD)</label></p>
      			<button className="tab submitEdit" type="submit" refer={-1}>Submit Data</button>
      		</div>
      	</form>
      	
      </div>
    );
  } // closes Render

  // keeps React state in sync with DOM form elements
  handleChange(event) {

  	if (event.target.name === "month") {
  		this.setState({month : parseInt(event.target.value, 10)});
  	} else if (event.target.name === "year") {
  		this.setState({year : parseInt(event.target.value, 10)});
  	} else if (event.target.name === "kwh") {
  		this.setState({kwh : parseInt(event.target.value, 10) || ""});
  	} else if (event.target.name === "bill") {
  		this.setState({bill : Math.round(parseFloat(event.target.value)*100)/100 || ""});
  	} else if (event.target.name === "savings") {
  		this.setState({savings : Math.round(parseFloat(event.target.value)*100)/100 || ""});
  	}
  }

  openEdit(event) {
  	event.preventDefault();
  	event.stopPropagation();
  	const i = event.target.attributes.refer.value;
  	this.setState(this.props.data[i]);
  }

  submitEdit(event) {
  	event.preventDefault();
  	event.stopPropagation();
  	if (this.state.month===0) {
  		alert("Please select the month.");
  		return false;
  	} else if (this.state.year===0) {
  		alert("Please select the year.");
  		return false;
  	}
  	const data = {
  		month: this.state.month,
  		year: this.state.year,
  		kwh: this.state.kwh || 0,
  		bill: this.state.bill || 0,
  		savings: this.state.savings ||0
  	}

  	var headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
  	fetch('data', {
		  credentials: 'include',
		  method: 'PUT',
		  body: JSON.stringify(data),
		  headers: headers
		}).then((response) => {
			if (response.ok) {
				response.json()
				.then((json) => {
					this.props.update({
						data: [...json]
					});
					this.setState({
						month: 0,
						year: 0,
						kwh: 0,
						bill: 0,
						savings: 0
					});
				})
			} else {
				console.log("Error retrieving data from server.", response);
			}
		});


  } // closes submitEdit method


  delete (event) {
  	event.preventDefault();
  	event.stopPropagation();
  	const i = event.target.attributes.refer.value;
  	var headers = new Headers();
		headers.append('Accept', 'application/json'); 
		headers.append('Content-Type', 'application/json');
  	fetch('data', {
		  credentials: 'include',
		  method: 'DELETE',
		  body: JSON.stringify(this.props.data[i]),
		  headers: headers
		}).then((response) => {
			if (response.ok) {
				response.json()
				.then((json) => {
					this.props.update({
						data: [...json]
					});
				})
			} else {
				console.log("Error retrieving data from server.", response);
			}
		});
  }// closes delete method

} // closes Admin component

export default Admin;
