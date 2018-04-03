import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Channel from './Channel.jsx';
import ChannelForm from './ChannelForm.jsx';

class ChannelSection extends Component {
  render() {
    const { channels, setChannel, addChannel } = this.props;
    return (
      <div>
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
        
        <ChannelForm addChannel={addChannel} />
      </div>
    );
  }
}

ChannelSection.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired,
};

export default ChannelSection;