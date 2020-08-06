import React, { Component } from 'react';

class Decoder extends Component {

  duration = 0;
  progress = 0;
  interval
  // _serverURL = 'http://localhost:8000/downloadmp3?url='
  _serverURL = 'https://frozen-thicket-30265.herokuapp.com/downloadmp3?url='

  componentDidMount() {
    this.interval = setInterval(this.listenForAudio, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  nextCallback = () => {
    this.props.next()
  }

  durationCallback = () => {
    this.props.duration(this.duration)
  }
  
  progressCallback = () =>{
    this.props.progress(this.progress)
  }

  listenForAudio = () =>{
    var audio = document.getElementById("audio")
    if(audio){
      this.duration = audio.duration
      this.progress = audio.currentTime
      this.durationCallback()
      this.progressCallback()
    }else{
      this.duration = 0
      this.progress = 0
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