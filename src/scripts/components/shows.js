import React from 'react';
import axios from 'axios/dist/axios';
import moment from 'moment';

class Shows extends React.Component {
  constructor(props) {
    super(props);

    this.togglePastShows = this.togglePastShows.bind(this);

    this.state = {
      displayPastShows: false,
      futureShows: [],
      loading: true,
      pastShows: [],
      error: null
    };
  }

  componentDidMount() {
    axios.get('http://sera.malaparte.media/wp-json/wp/v2/shows')
      .then(res => {
        const futureShows = res.data.filter(this.isFutureShow).sort(this.compareDates);
        const pastShows = res.data.filter(this.isPastShow).sort(this.compareDates).reverse();

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

  compareDates(showA, showB) {
    return moment(showA.acf.date, 'YYYYMMDD').format('X') - moment(showB.acf.date, 'YYYYMMDD').format('X');
  }

  isFutureShow(show) {
    return moment(show.acf.date, 'YYYYMMDD').isSameOrAfter(moment());
  }

  isPastShow(show) {
    return moment(show.acf.date, 'YYYYMMDD').isBefore(moment());
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  togglePastShows() {
    this.setState(prevState => ({
      displayPastShows: !prevState.displayPastShows
    }));
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
        {this.state.futureShows &&
          <div>
            <h3 className='h6'>Upcoming Shows</h3>
            <ul className='gutter-row--lg'>
              {this.state.futureShows.map(show =>
                <li
                  className='show__container'
                  key={show.id}
                >
                  {show.acf.image &&
                    <div className='show__img-container'>
                      <img src={show.acf.image.sizes.medium_large} />
                    </div>
                  }
                  <div className='show__info'>
                    <p className='h2'>
                      {moment(show.acf.date, 'YYYYMMDD').format('MMMM D, YYYY')}
                    </p>
                    <p className='label gutter-row--sm'>
                      {show.title.rendered}
                    </p>

                    <p className='h5'>
                      {show.acf.cost &&
                        <span>
                          <strong>
                            ${show.acf.cost}
                          </strong>
                          ,&nbsp;
                        </span>
                      }
                      {show.acf.start_time} <strong>@</strong> {show.acf.venue}
                      &nbsp;(
                        <a href={'http://maps.google.com/?q=' + show.acf.address.address}>directions</a>
                      )
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        }

        {!this.state.displayPastShows &&
          <button onClick={this.togglePastShows}>Browse Past Shows</button>
        }

        {this.state.displayPastShows &&
          <div>
            <h3 className='h6'>Past Shows</h3>
            <ul>
              {this.state.pastShows.map(show =>
                <li
                  className='show__container'
                  key={show.id}
                >
                  {show.acf.image &&
                    <div className='show__img-container'>
                      <img src={show.acf.image.sizes.medium_large} />
                    </div>
                  }
                  <div className='show__info'>
                    <p className='h2'>
                      {moment(show.acf.date, 'YYYYMMDD').format('MMMM D, YYYY')}
                    </p>
                    <p className='label gutter-row--sm'>
                      {show.title.rendered}
                    </p>

                    <p className='h5'>
                      {show.acf.cost &&
                        <span>
                          <strong>
                            ${show.acf.cost}
                          </strong>
                          ,&nbsp;
                        </span>
                      }
                      {show.acf.start_time} <strong>@</strong> {show.acf.venue}
                      &nbsp;(
                        <a href={'http://maps.google.com/?q=' + show.acf.address.address}>directions</a>
                      )
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        }
      </section>
    );
  }

  render() {
    return (
      <section className='section'>
        <h2 className='h1'>Live</h2>
        {this.state.loading ?
          this.renderLoading()
          : this.renderPosts()}
      </section>
    );
  }
}

export default Shows;
