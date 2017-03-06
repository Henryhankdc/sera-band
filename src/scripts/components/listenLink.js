import React from 'react';

class ListenLink extends React.Component {
  render() {
    return (
      <li>
        <a className='listen-link__container' href={this.props.link}>
          <svg className='listen-link__icon icon'>
            <use xlinkHref={'#' + this.props.iconId} />
          </svg>
          <span className='visuallyhidden listen-link__text'>
            {this.props.text}
          </span>
        </a>
      </li>
    );
  }
}

ListenLink.propTypes = {
  iconId: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default ListenLink;
