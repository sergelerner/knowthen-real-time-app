import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChannelItem = styled.li`
  margin: 15px 0;
  color: ${props => props.theme.color.b};
`;

class Channel extends Component {
  onClick() {
    const { channel, setChannel } = this.props;
    setChannel(channel);
  }

  render() {
    const { channel } = this.props;
    return (
      <ChannelItem>
        <a onClick={this.onClick.bind(this)}>
          { channel.name }
        </a>
      </ChannelItem>
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
