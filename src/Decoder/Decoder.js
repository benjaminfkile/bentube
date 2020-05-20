import React, { Component } from 'react';

class Decoder extends Component {

  _duration = 0;
  _progress = 0;
  _interval
  // _serverURL = 'http://localhost:8000/downloadmp3?url='
  _serverURL = 'https://frozen-thicket-30265.herokuapp.com/downloadmp3?url='

  componentDidMount() {
    this._interval = setInterval(this.listenForAudio, 1000)
  }

  componentWillUnmount(){
    clearInterval(this._interval)
  }

  nextCallback = () => {
    this.props.next()
  }

  durationCallback = () => {
    this.props.duration(this._duration)
  }
  
  progressCallback = () =>{
    this.props.progress(this._progress)
  }

  listenForAudio = () =>{
    var audio = document.getElementById("audio")
    if(audio){
      this._duration = audio.duration
      this._progress = audio.currentTime
      this.durationCallback()
      this.progressCallback()
    }else{
      this._duration = 0
      this._progress = 0
    }

  }
  render() {

    return (
      <div className="Media_Player">
        {this.props.videoId && <audio id="audio" src={this._serverURL + this.props.videoId} onEnded={this.nextCallback} controls autoPlay />}
      </div>
    );
  }
}

export default Decoder;