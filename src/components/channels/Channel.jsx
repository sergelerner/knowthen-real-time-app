import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Channel extends Component {
  onClick() {
    const { channel, setChannel } = this.props;
    setChannel(channel);
  }

  render() {
    const { channel } = this.props;
    return (
      <li>
        <a onClick={this.onClick.bind(this)}>
          { channel.name }
        </a>
      </li>
    );
  }
}

Channel.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  setChannel: PropTypes.func.isRequired,
};

export default Channel;
