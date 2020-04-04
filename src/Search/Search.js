import React, { Component } from 'react'
import MediaPlayer from '../MediaPlayer/Media-Player'
import Results from '../Results/Results'


class Search extends Component {
    constructor() {
        super();
        this.state = {
            apiKey: 'AIzaSyCyDGjcu0UgCCIWV1ZRB2Tv-i3M9i1iaa0',
            searchURL: 'https://www.googleapis.com/youtube/v3/search',
            baseURL: 'https://www.youtube.com/watch?v=',
            videoId: 'tOPyNJig74w',
            response: null
        }
    }


    componentDidMount() {
        // this.getYouTubeVideos('spm')
    }


    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
    }


    getYouTubeVideos(query, maxResults = 50) {
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



        if (this.state.response) {
            for (let i = 0; i < this.state.response.items.length; i++) {
                console.log(this.state.response.items[i].snippet.title)
                console.log(this.state.response.items[i].id.videoId)

            }
        }




        return (
            <div className="Search">
                <MediaPlayer
                    watchLink={this.state.baseURL + this.state.videoId}
                />
                <Results
                    response={this.state.response}
                />
            </div>
        )
    }

}

export default Search