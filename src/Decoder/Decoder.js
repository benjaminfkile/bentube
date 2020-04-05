import React, { Component } from 'react';


class MediaPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serverURL: 'https://frozen-thicket-30265.herokuapp.com/downloadmp3?url=',
      videoId: this.props.videoId,
    }
  }

  render() {

    return (
      <div className="Media_Player">
        {this.props.videoId && <audio src={this.state.serverURL + this.props.videoId} controls autoPlay />}
      </div>
    );
  }
}

export default MediaPlayer;