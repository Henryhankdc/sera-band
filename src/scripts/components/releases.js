import React from 'react';
import axios from 'axios/dist/axios';
import moment from 'moment';

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
          <li
            className='release__container'
            key={release.id}
          >
            <div
              className='release__background'
              style={{backgroundImage: 'url(' + release.acf.cover.url + ')'}}
            ></div>
            <div className='release__meta-container'>
              <div className='release__meta-img-container'>
                <img src={release.acf.cover.url} />
              </div>
              <div className='release__meta-info'>
                <h2 className='h2'>
                  {release.title.rendered}
                </h2>
                <p className='label'>
                  Released {moment(release.acf.release_date, 'YYYYMMDD').format('MMMM D, YYYY')}
                </p>
              </div>
            </div>
            <div className='release__listen-container'>
              <p className='h6'>Listen:</p>
              <ul className='release__listen-links-container'>
                <li>
                  <a className='listen-link__container' href={release.acf.soundcloud_link}>
                    <svg className='listen-link__icon icon'>
                      <use xlinkHref='#soundcloud' />
                    </svg>
                    <span className='listen-link__text'>
                      Soundcloud
                    </span>
                  </a>
                </li>
                <li>
                  <a className='listen-link__container' href={release.acf.bandcamp_link}>
                    <svg className='listen-link__icon icon'>
                      <use xlinkHref='#bandcamp' />
                    </svg>
                    <span className='listen-link__text'>
                      Bandcamp
                    </span>
                  </a>
                </li>
                <li>
                  <a className='listen-link__container' href={release.acf.spotify_link}>
                    <svg className='listen-link__icon icon'>
                      <use xlinkHref='#spotify' />
                    </svg>
                    <span className='listen-link__text'>
                      Spotify
                    </span>
                  </a>
                </li>
                <li>
                  <a className='listen-link__container' href={release.acf.youtube_link}>
                    <svg className='listen-link__icon icon'>
                      <use xlinkHref='#youtube' />
                    </svg>
                    <span className='listen-link__text'>
                      YouTube
                    </span>
                  </a>
                </li>
                <li>
                  <a className='listen-link__container' href={release.acf.apple_music_link}>
                    <svg className='listen-link__icon icon'>
                      <use xlinkHref='#apple-music' />
                    </svg>
                    <span className='listen-link__text'>
                      Apple Music
                    </span>
                  </a>
                </li>
                <li>
                  <a className='listen-link__container' href={release.acf.google_play_link}>
                    <svg className='listen-link__icon icon'>
                      <use xlinkHref='#google-play' />
                    </svg>
                    <span className='listen-link__text'>
                      Google Play
                    </span>
                  </a>
                </li>
                <li>
                  <a className='listen-link__container' href={release.acf.amazon_music_link}>
                    <svg className='listen-link__icon icon'>
                      <use xlinkHref='#amazon-music' />
                    </svg>
                    <span className='listen-link__text'>
                      Amazon Music
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
    );
  }

  render() {
    return (
      <section className='section'>
        <h2 className='h1'>Releases</h2>
        {this.state.loading ?
          this.renderLoading()
          : this.renderPosts()}
      </section>
    );
  }
}

export default Shows;
