import React, { Component } from 'react';
import './App.css';
import Search from './Search/Search'



class App extends Component {

  constructor() {
    super();
    this.state = {

    }
  }



render() {

  return (
    <div className="App">
      <Search />
    </div>
  );
}
}

export default App;
