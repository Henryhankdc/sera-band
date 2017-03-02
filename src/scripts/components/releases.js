import React from 'react';
import axios from 'axios/dist/axios';

class Shows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      releases: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    axios.get('http://sera.malaparte.media/wp-json/wp/v2/releases')
      .then(res => {
        const releases = res.data;

        this.setState({
          releases,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return (
      <div>
        Uh oh: {this.state.error.message}
      </div>
    );
  }

  renderPosts() {
    if(this.state.error) {
      return this.renderError();
    }

    return (
      <ul>
        {this.state.releases.map(release =>
          <li key={release.id}>
            <img src={release.acf.cover.url} />
            <h2>{release.title.rendered}</h2>
            <p>{release.acf.release_date}</p>
            <ul>
              <li>
                <svg className="icon">
                  <use xlinkHref="#soundcloud" />
                </svg>
                <a href={release.acf.soundcloud_link}>Soundcloud</a>
              </li>
              <li>
                <svg className="icon">
                  <use xlinkHref="#bandcamp" />
                </svg>
                <a href={release.acf.bandcamp_link}>Bandcamp</a>
              </li>
              <li>
                <svg className="icon">
                  <use xlinkHref="#spotify" />
                </svg>
                <a href={release.acf.spotify_link}>Spotify</a>
              </li>
              <li>
                <svg className="icon">
                  <use xlinkHref="#youtube" />
                </svg>
                <a href={release.acf.youtube_link}>Youtube</a>
              </li>
              <li>
                <svg className="icon">
                  <use xlinkHref="#apple-music" />
                </svg>
                <a href={release.acf.apple_music_link}>Apple Music</a>
              </li>
              <li>
                <svg className="icon">
                  <use xlinkHref="#google-play" />
                </svg>
                <a href={release.acf.google_play_link}>Google Play</a>
              </li>
              <li>
                <svg className="icon">
                  <use xlinkHref="#amazon-music" />
                </svg>
                <a href={release.acf.amazon_music_link}>Amazon Music</a>
              </li>
            </ul>
          </li>
        )}
      </ul>
    );
  }

  render() {
    return (
      <section>
        <h2>Releases</h2>
        {this.state.loading ?
          this.renderLoading()
          : this.renderPosts()}
      </section>
    );
  }
}

export default Shows;
