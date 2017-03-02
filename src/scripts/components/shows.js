import React from 'react';
import axios from 'axios/dist/axios';
import moment from 'moment';

class Shows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      futureShows: [],
      loading: true,
      pastShows: [],
      error: null
    };
  }

  componentDidMount() {
    axios.get('http://sera.malaparte.media/wp-json/wp/v2/shows')
      .then(res => {
        function compareDates(showA, showB) {
          return moment(showA.acf.date, 'YYYYMMDD').format('X') - moment(showB.acf.date, 'YYYYMMDD').format('X');
        }

        function isFutureShow(show) {
          return moment(show.acf.date, 'YYYYMMDD').isSameOrAfter(moment());
        }

        function isPastShow(show) {
          return moment(show.acf.date, 'YYYYMMDD').isBefore(moment());
        }

        const futureShows = res.data.filter(isFutureShow).sort(compareDates).reverse();
        const pastShows = res.data.filter(isPastShow).sort(compareDates).reverse();

        this.setState({
          futureShows,
          loading: false,
          pastShows,
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
      <section>
        <h3>Future Shows</h3>
        <ul>
          {this.state.futureShows.map(show =>
            <li key={show.id}>
              <p>{show.acf.date}</p>
              <p>{show.title.rendered}</p>
            </li>
          )}
        </ul>

        <h3>Past Shows</h3>
        <ul>
          {this.state.pastShows.map(show =>
            <li key={show.id}>
              <p>{show.acf.date}</p>
              <p>{show.title.rendered}</p>
            </li>
          )}
        </ul>
      </section>
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
