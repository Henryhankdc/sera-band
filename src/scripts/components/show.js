import React from 'react';
import moment from 'moment';

class Show extends React.Component {
  render() {
    const show = this.props.show;

    return (
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

              {show.acf.ticket_url &&
                <span>
                  , <a href={show.acf.ticket_url}>tickets</a>
                </span>
              }
            )
          </p>
        </div>
      </li>
    );
  }
}

Show.propTypes = {
  show: React.PropTypes.object,
};

export default Show;
