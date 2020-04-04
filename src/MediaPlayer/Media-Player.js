import React, { Component } from 'react';


class MediaPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        serverURL: 'https://frozen-thicket-30265.herokuapp.com/downloadmp3?url='
    }
  }

  render() {

    return (
      <div className="App">
        {/* <audio src={this.state.serverURL + this.props.watchLink} controls autoPlay /> */}
      </div>
    );
  }
}

export default MediaPlayer;