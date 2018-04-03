import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
    };
  }

  addChannel(name) {
    const { channels } = this.state;
    channels.push({ id: channels.length, name });
    this.setState({ channels });
    // TODO: Send to server
  }

  setChannel(activeChannel) {
    this.setState({ activeChannel });
    // TODO: Get channel messages
  }

  render() {
    const { channels } = this.state;

    return (
      <main>
        <ChannelSection 
          channels={channels}
          addChannel={this.addChannel.bind(this)}
          setChannel={this.setChannel.bind(this)}/>
      </main>
    );
  }
}

export default App;