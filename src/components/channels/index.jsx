import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Channel from './Channel.jsx';
import ChannelForm from './ChannelForm.jsx';

const ChannelsWrapper = styled.section`
  display: flex;
  height: 400px;
  flex-direction: column;
`;

const ChannelsHeader = styled.header`
  flex: 0;
  padding: ${props => props.theme.spaceM};
  background: ${props => props.theme.color.a};
  color: white;

  > h2 {
    font-weight: bold;
  }
`;

const ChannelsBody = styled.div`
  flex: 1;
  padding: ${props => props.theme.spaceM};
`;

const ChannelsFooter = styled.footer`
  flex: 0;
`;

class ChannelSection extends Component {
  render() {
    const { channels, setChannel, addChannel } = this.props;
    return (
      <ChannelsWrapper>
        <ChannelsHeader>
          <h2>Channels</h2>
        </ChannelsHeader>

        <ChannelsBody>
          <ul>
            {
              channels.map((item) => (
                <Channel
                  key={item.name}
                  channel={item}
                  setChannel={setChannel}/>
              ))
            }
          </ul>
        </ChannelsBody>
        
        <ChannelsFooter>
          <ChannelForm addChannel={addChannel} />
        </ChannelsFooter>
      </ChannelsWrapper>
    );
  }
}

ChannelSection.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired,
};

export default ChannelSection;