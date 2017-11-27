import React, { Component } from 'react';
import './styles.css';
import Menu from './Menu';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Main />
      </div>
    );
  }
}

export default App;
