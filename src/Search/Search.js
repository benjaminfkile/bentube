import React, { Component } from 'react'
import MediaPlayer from '../MediaPlayer/MediaPlayer'
import '../Search/Search.css'
// import DummyStore from './DummyStore'

class Search extends Component {
    constructor() {
        super();
        this.state = {
            //this key is restricted due to a scumbag that kept stealing it so you will have to come up with your own to get it working
            apiKey: 'AIzaSyDCWWJLRXoNkdEhcpgJbmnkoWI-8tOgl10',
            searchURL: 'https://www.googleapis.com/youtube/v3/search',
            baseURL: 'https://www.youtube.com/watch?v=',
            response: null,
            value: '',
            maxResults: 50,
            requests: 0,
            error: false
        }
        this.keyPress = this.keyPress.bind(this);
    }
    componentDidMount() {
        this.getVideos('new songs lyrics', 50)
        // this.setState({ response: DummyStore })
    }

    handleSubmit = () => {
        this.setState({response: null})
        let value = document.getElementById("text").value
        if (value !== "Search for Music, News, Lyrics...") {
            this.getVideos(value, this.state.maxResults)
            document.getElementById("text").value = ""
        }

    }

    keyPress = (e) => {
        let value = document.getElementById("text").value
        if (value === "Search for Music, News, Lyrics...") {
            document.getElementById("text").value = ""
        }
        if (e.keyCode === 13) {
            this.handleSubmit()
        }
    }

    formatQueryParams = (params) => {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }


    getVideos = (query, maxResults) => {
        this.setState({ requests: this.state.requests + 1 })
        this.setState({ error: false })
        const params = {
            key: this.state.apiKey,
            q: query,
            part: 'snippet',
            maxResults
        };
        const queryString = this.formatQueryParams(params)
        const url = this.state.searchURL + '?' + queryString;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => this.setState({ response: responseJson }))
            .catch(err => {
                console.log(err.message)
                this.setState({ error: true })
            });
    }

    render() {

        return (
            <div className="Search">
                <form className="Search_Form">
                    <textarea id="text" type="text" onKeyDown={this.keyPress}/>
                    <img id="Go_Btn" src="./res/go.png" alt="=&gt;" onClick={() => this.handleSubmit()}></img>
                </form>
                {this.state.error &&
                    <div className="Error">
                        <h1>
                            Sorry, something went wrong :(
                        </h1>
                    </div>}

                {!this.state.error &&
                    <MediaPlayer key={Math.random()}
                        response={this.state.response}
                    />}
            </div>
        )
    }
}

export default Search