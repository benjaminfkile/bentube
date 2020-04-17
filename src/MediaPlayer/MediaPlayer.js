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
            idx: 0,
            interval1: 1000,
            pause: false,
            trackDuration: null,
            trackProgress: -3,
            timer: 0
        }
    }

    componentDidMount() {
        this.listen4DB()
    }


    decoderNext = () => {
        this.next(this.state.queu[this.state.idx])
        this.setState({ trackProgress: -3 })
    }

    decoderProgress = (duration, progress) => {
        this.setState({ trackDuration: duration, trackProgress: this.state.trackProgress + 1 })
    }


    playTrack = (args) => {
        this.setState({ trackProgress: -3 })
        if (args) {
            this.setState(
                {
                    nowPlaying: args.id,
                    idx: args.idx,
                    pause: true
                })
        } else {

            if (this.state.nowPlaying) {
                var audio = document.getElementById("audio");
                this.setState({ pause: true })
                audio.play()
            }
            else {
                this.setState(
                    {
                        idx: 0,
                        nowPlaying: this.state.queu[0].id,
                        pause: true
                    })
            }
        }
    }

    pause = () => {
        this.setState({ trackProgress: -3 })

        var audio = document.getElementById("audio");
        this.setState({ pause: false })
        audio.pause()
    }

    next = (args) => {
        this.setState({ trackProgress: -3 })
        if (args.idx < this.state.queu.length - 1) {
            this.setState(
                {
                    idx: this.state.idx + 1,
                    nowPlaying: this.state.queu[this.state.idx + 1].id
                })
        } else {
            this.setState(
                {
                    idx: 0,
                    nowPlaying: this.state.queu[0].id

                })
        }
    }

    previous = (args) => {
        this.setState({ trackProgress: -3 })

        if (args.idx > 0) {
            this.setState(
                {
                    idx: this.state.idx - 1,
                    nowPlaying: this.state.queu[this.state.idx - 1].id

                })
        } else {
            this.setState(
                {
                    idx: this.state.queu.length - 1,
                    nowPlaying: this.state.queu[this.state.queu.length - 1].id
                })
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


    buildQueu = () => {
        let temp = []
        let idx = -1;
        if (this.props.response) {
            for (let i = 0; i < this.props.response.items.length; i++) {
                if (this.props.response.items[i].id.videoId) {
                    idx++
                    let date = this.props.response.items[i].snippet.publishedAt
                    date = date.split('T')
                    temp.push(
                        {
                            title: this.props.response.items[i].snippet.title,
                            description: this.props.response.items[i].snippet.description,
                            thumbnail: this.props.response.items[i].snippet.thumbnails.default.url,
                            id: this.props.response.items[i].id.videoId,
                            published: date[0],
                            idx: idx
                        })
                }
            }
            this.setState({ queu: temp })
        }
    }

    render() {

        if (this.state.trackDuration && this.state.trackProgress) {
            console.log(this.state.trackProgress + '/' + this.state.trackDuration)
        }


        return (
            <div className="Results">

                {this.state.queu && <div className="Controls">
                    <section>
                        <h1>
                            {this.state.queu[this.state.idx].title}
                        </h1>
                        <p>
                            {this.state.queu[this.state.idx].description}
                        </p>
                    </section>
                    {/* {this.state.trackDuration &&
                        <p>
                            {this.state.trackProgress + '/' + this.state.trackDuration}
                        </p>} */}
                    <ul>
                        <li onClick={() => this.previous(this.state.queu[this.state.idx])}>
                            &lt;
                            </li>
                        {!this.state.pause && <li onClick={() => this.playTrack()}>
                            play
                            </li>}
                        {this.state.pause && <li onClick={() => this.pause()}>
                            pause
                            </li>}
                        <li onClick={() => this.next(this.state.queu[this.state.idx])}>
                            &gt;
                            </li>
                    </ul>
                </div>}
                <div className="Divider"></div>
                {this.state.queu && <div className="List">
                    <ul>
                        {this.state.queu.map(videos =>
                            <div className="Item" tabIndex={videos.idx} key={Math.random() * Math.random()} onClick={() => this.playTrack(videos)} >
                                <div className="Image">
                                    <img src={videos.thumbnail} alt="Smiley face" height="90" width="120"></img>
                                </div>
                                <div className="Info">
                                    <li>{videos.title}</li>
                                    <p>{videos.published}</p>
                                </div>
                            </div>)}
                    </ul>
                </div>}
                <Decoder
                    videoId={this.state.nowPlaying}
                    next={this.decoderNext}
                    duration={this.decoderProgress}
                />
            </div>
        )
    }

}

export default MediaPlayer