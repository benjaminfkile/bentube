import React, { Component } from 'react'
import Results from '../MediaPlayer/MediaPlayer'


class Search extends Component {
    constructor() {
        super();
        this.state = {
            apiKey: 'AIzaSyCyDGjcu0UgCCIWV1ZRB2Tv-i3M9i1iaa0',
            searchURL: 'https://www.googleapis.com/youtube/v3/search',
            baseURL: 'https://www.youtube.com/watch?v=',
            response: null
        }
    }


    componentDidMount() {
        this.getVideos('sweet but psycho')
    }


    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
    }


    getVideos(query, maxResults = 50) {
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
            });
    }

    render() {

        return (
            <div className="Search">

                <Results
                    response={this.state.response}
                />
            </div>
        )
    }

}

export default Search