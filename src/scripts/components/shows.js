import React from 'react';
import axios from 'axios/dist/axios';

class Shows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    axios.get('http://sera.malaparte.media/wp-json/wp/v2/shows')
      .then(res => {
        const shows = res.data;

        this.setState({
          shows,
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
        {this.state.shows.map(show =>
          <li key={show.id}>
            <p>{show.acf.date}</p>
            <p>{show.title.rendered}</p>
          </li>
        )}
      </ul>
    );
  }

  render() {
    return (
      <section>
        <h2>Shows</h2>
        {this.state.loading ?
          this.renderLoading()
          : this.renderPosts()}
      </section>
    );
  }
}

export default Shows;
