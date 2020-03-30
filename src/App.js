import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      baseURL: 'https://frozen-thicket-30265.herokuapp.com/downloadmp3?url=',
      watchURL: 'https://www.youtube.com/watch?v=gPTGR4FYCMA&list=PLOFF70X5RBfBBBNM-vODkYHjf2wXqLm46'
    }
  }

  render() {
    return (
      <div className="App">
        <audio src={this.state.baseURL + this.state.watchURL} controls autoPlay />
      </div>
    );
  }
}

export default App;
