import React from 'react';
import axios from 'axios/dist/axios';
import moment from 'moment';
import ListenLink from './listenLink';

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
              style={{backgroundImage: 'url(' + release.acf.cover.sizes.medium + ')'}}
            ></div>
            <div className='release__meta-container'>
              <div className='release__meta-img-container'>
                <img src={release.acf.cover.sizes.medium} />
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
                <ListenLink
                  iconId='soundcloud'
                  link={release.acf.soundcloud_link}
                  text='Soundcloud'
                />
                <ListenLink
                  iconId='bandcamp'
                  link={release.acf.bandcamp_link}
                  text='Bandcamp'
                />
                <ListenLink
                  iconId='spotify'
                  link={release.acf.spotify_link}
                  text='Spotify'
                />
                <ListenLink
                  iconId='youtube'
                  link={release.acf.youtube_link}
                  text='Youtube'
                />
                <ListenLink
                  iconId='apple-music'
                  link={release.acf.apple_music_link}
                  text='Apple Music'
                />
                <ListenLink
                  iconId='google-play'
                  link={release.acf.google_play_link}
                  text='Google Play'
                />
                <ListenLink
                  iconId='amazon-music'
                  link={release.acf.amazon_music_link}
                  text='Amazon Music'
                />
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
