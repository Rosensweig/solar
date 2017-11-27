import React, { Component } from 'react';



class Menu extends Component {
  render() {
    return (
      <div className="Menu">
      	<nav>
      		<a href="/" id="siteTitle" className="solstice">Solstice</a>
      		<a href="current" className="current">Current Bill</a>
      		<a href="bar" className="bar">History & Graphs</a>
      		<a href="admin" className="admin">Admin Panel</a>
      	</nav>
      </div>
    );
  }
}

export default Menu;
