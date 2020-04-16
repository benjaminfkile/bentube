import React, { Component } from 'react'
import MediaPlayer from '../MediaPlayer/MediaPlayer'
import '../Search/Search.css'
import DummyStore from './DummyStore'


class Search extends Component {
    constructor() {
        super();
        this.state = {
            apiKey: 'AIzaSyCyDGjcu0UgCCIWV1ZRB2Tv-i3M9i1iaa0',
            searchURL: 'https://www.googleapis.com/youtube/v3/search',
            baseURL: 'https://www.youtube.com/watch?v=',
            response: null,
            value: '',
            maxResults: 50,
            requests: 0,
            error: false
        }
        this.handleChange = this.handleChange.bind(this)

    }


    componentDidMount() {
        // this.getVideos('new music', 50)
        this.setState({response: DummyStore})
    }

    handleSubmit = () => {
        this.getVideos(this.state.value, this.state.maxResults)
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ value: event.target.value })
    }

    formatQueryParams = (params) => {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }


    getVideos = (query, maxResults) => {
        this.setState({ requests: this.state.requests + 1 })
        this.setState({ error: false })
        console.log(this.state.requests)
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
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <li onClick={() => this.handleSubmit()}>=&gt;</li>
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