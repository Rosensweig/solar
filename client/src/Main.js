import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CurrentBill from './CurrentBill';
import HistGraphHeader from './HistGraphHeader';
import Admin from './Admin';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state={
			data: []
		}
		this.update = this.update.bind(this);
	}

  render() {
    return (
      <BrowserRouter>
      	<div className="Main">
      		<Route exact path="/" render={(props) => (<CurrentBill monthString={this.monthString} {...props} {...this.state.data[0]} />)} />
      		<Route exact path="/current" render={(props) => (<CurrentBill monthString={this.monthString} {...props} {...this.state.data[0]} />)} />
      		<Route exact path="/history" render={(props) => (<HistGraphHeader monthString={this.monthString} {...props} {...this.state} />)} />
      		<Route exact path="/line" render={(props) => (<HistGraphHeader monthString={this.monthString} {...props} {...this.state} />)} />
      		<Route exact path="/bar" render={(props) => (<HistGraphHeader monthString={this.monthString} {...props} {...this.state} />)} />
      		<Route exact path="/admin" render={(props) => (<Admin monthString={this.monthString} update={this.update} {...props} {...this.state} />)} />
      	</div>
      </BrowserRouter>
    );
  } // ends render()

  monthString(monthInt) {
		let month;
		switch (monthInt) {
			case 1: month = "January"; break;
			case 2: month = "February"; break;
			case 3: month = "March"; break;
			case 4: month = "April"; break;
			case 5: month = "May"; break;
			case 6: month = "June"; break;
			case 7: month = "July"; break;
			case 8: month = "August"; break;
			case 9: month = "September"; break;
			case 10: month = "October"; break;
			case 11: month = "November"; break;
			case 12: month = "December"; break;
			default: month = "";
		}
		return month;
	}

	update(newState) {
		this.setState(newState);
	}

	componentWillMount() {
		fetch('data', {
		  credentials: 'include',
		  method: 'GET',
		  headers: {
		    Accept: 'application/json'
		  }
		}).then((response) => {
			if (response.ok) {
				response.json()
				.then((json) => {
					this.setState({
						...json
					});
				})
			} else {
				console.log("Error retrieving data from server.\n", response)
			}
		})
	} // ends componentWillMount()

} // closes Main component

export default Main;
