import React, { Component } from 'react';

class Decoder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // serverURL: 'https://frozen-thicket-30265.herokuapp.com/downloadmp3?url=',
      serverURL: 'http://localhost:8000/downloadmp3?url=',
      interval: 1000,
      duration: 0,
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.listenForAudio()
    }, this.state.interval);
  }

  nextCallback = () => {
    this.props.next()
    this.setState({progress: 0})
  }

  progressCallback = () => {
    this.props.duration(this.state.duration)
  }

  listenForAudio = () =>{
    var audio = document.getElementById("audio")
    if(audio){
      this.setState({duration: audio.duration})
      this.progressCallback()
    }else{
      this.setState({duration: 0})
    }

  }

  render() {

    return (
      <div className="Media_Player">
        {this.props.videoId && <audio id="audio" src={this.state.serverURL + this.props.videoId} onEnded={this.nextCallback} controls autoPlay />}
      </div>
    );
  }
}

export default Decoder;