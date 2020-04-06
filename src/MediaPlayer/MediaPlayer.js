import React, { Component } from 'react'
import Decoder from '../Decoder/Decoder';
import '../MediaPlayer/MediaPlayer.css'

class MediaPlayer extends Component {

    constructor() {
        super();
        this.state = {
            nowPlaying: null,
            queu: null,
            waiting4DB: true,
            interval1: '',
            interval2: '',
            idx: 0,
            pause: false,
            trackDuration: null,
            timer: 0

        }
    }

    componentDidMount() {
        this.setState({ interval1: setInterval(this.listen4DB, 1000) })
        this.setState({ interval2: setInterval(this.listen4Duration, 1000) })
        this.setState({ interval2: setInterval(this.trackTimer, 1000) })
    }

    playClicked = (id, idx) => {
        this.setState({ nowPlaying: id, idx: idx })
        this.setState({timer: 0})
    }

    playByIndex = (args) => {
        this.setState({ nowPlaying: args.id })
        this.setState({timer: 0})
    }

    pause = () => {
        this.setState({ nowPlaying: null })
    }

    next = () => {
        if (this.state.idx < this.state.queu.length - 1) {
            this.setState({ idx: this.state.idx + 1 })
            this.playByIndex(this.state.queu[this.state.idx + 1])
        }
    }

    previous = () => {
        if (this.state.idx > 0) {
            this.setState({ idx: this.state.idx - 1 })
            this.playByIndex(this.state.queu[this.state.idx - 1])
        }
    }

    listen4DB = () => {
        if (this.props.response) {
            this.setState({ waiting4DB: false })
            this.stopListening4DB()
        }
    }

    stopListening4DB = () => {
        clearInterval(this.state.interval1);
        this.buildQueu()
    }

    listen4Duration = () => {
        if (this.state.nowPlaying) {
            var audio = document.getElementById("audio");
            if (audio.readyState > 0) {
                var seconds = parseInt(audio.duration);
                this.setState({ trackDuration: seconds })
            }
        }
    }

    trackTimer = () => {
        this.setState({timer: this.state.timer + 1})
        if(this.state.trackDuration && (this.state.timer > this.state.trackDuration)){
            this.next()
        }
        console.log(this.state.timer)
        console.log(this.state.trackDuration)
    }



    buildQueu = () => {

        let temp = []
        if (this.props.response) {
            for (let i = 0; i < this.props.response.items.length; i++) {
                if (this.props.response.items[i].id.videoId) {
                    temp.push(
                        {
                            title: this.props.response.items[i].snippet.title,
                            description: this.props.response.items[i].snippet.description,
                            thumbnails: this.props.response.items[i].snippet.thumbnails,
                            id: this.props.response.items[i].id.videoId,
                            idx: i,
                            playing: false,
                        })
                }
            }
            this.setState({ queu: temp })
        }
    }

    render() {

        return (
            <div className="Results">

                {this.props.response && <div className="Result_List">
                    <div className="Controls">
                        <ul>
                            <li onClick={() => this.previous()}>
                                &lt;
                            </li>
                            {!this.state.nowPlaying && <li onClick={() => this.playClicked(this.state.queu[this.state.idx].id, this.state.idx)}>
                                play
                            </li>}
                            {this.state.nowPlaying && <li onClick={() => this.pause()}>
                                pause
                            </li>}
                            <li onClick={() => this.next()}>
                                &gt;
                            </li>
                        </ul>
                    </div>
                    <div className="List">
                        <ul>
                            {this.state.queu && this.state.queu.map(videos => <li key={Math.random() * Math.random()} onClick={() => this.playClicked(videos.id, videos.idx)}>{videos.title}</li>)}
                        </ul>
                    </div>
                </div>}
                <Decoder
                    videoId={this.state.nowPlaying}
                />
            </div>
        )
    }

}

export default MediaPlayer