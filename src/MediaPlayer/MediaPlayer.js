import React, { Component } from 'react'
import MediaPlayer from '../Decoder/Decoder';
import '../MediaPlayer/MediaPlayer.css'

class Results extends Component {

    constructor() {
        super();
        this.state = {
            nowPlaying: null
        }
    }

    playVideo = (args) => {
        this.setState({ nowPlaying: args })
    }

    play = (args) => {
        console.log(args)
    }

    pause = (args) => {
        console.log(args)
        this.setState({nowPlaying: null})
    }

    next = (args) => {
        console.log(args)
    }

    previous = (args) => {
        console.log(args)
    }
    render() {

        console.log(this.props.response)

        return (
            <div className="Results">
                <MediaPlayer
                    videoId={this.state.nowPlaying}
                />
                {this.props.response && <div className="Result_List">
                    <div className="Controls">
                        <ul>
                            <li onClick={() => this.play('play')}>
                                >
                            </li>
                            <li onClick={() => this.pause('pause')}>
                                ||
                            </li>
                            <li onClick={() => this.previous('previous')}>
                                &lt;
                            </li>
                            <li onClick={() => this.next('next')}>
                                &gt;
                            </li>
                        </ul>
                    </div>
                    <div className="List">
                        <ul>
                            {this.props.response.items.map(videos => <li key={Math.random() * Math.random()} onClick={() => this.playVideo(videos.id.videoId)}>{videos.snippet.title}</li>)}
                        </ul>
                    </div>


                </div>}
            </div>
        )
    }

}

export default Results