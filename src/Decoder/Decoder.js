import React, { Component } from 'react';

class Decoder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // serverURL: 'https://frozen-thicket-30265.herokuapp.com/downloadmp3?url=',
      serverURL: 'http://localhost:8000/downloadmp3?url=',
    }
  }

  render() {

    return (
      <div className="Media_Player">
        {this.props.videoId && <audio id="audio" src={this.state.serverURL + this.props.videoId} controls autoPlay />}
      </div>
    );
  }
}

export default Decoder;