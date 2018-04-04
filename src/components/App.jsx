import React, { Component } from 'react';
import ChannelSection from './channels/index.jsx';
import styled, { ThemeProvider } from 'styled-components';

import Styles from './styles/index.js';

const AppWrapper = styled.main`
  display: flex;
  flex-direction: row;
  margin: ${props => props.theme.spaceL};
  box-shadow: 0 0 50px rgba(0,0,0,.1);
`;

const AppSidePanel = styled.aside`
  width: ${props => props.theme.sidePanelW};
`;

const AppMainPanel = styled.section`
  width: calc(100% - ${props => props.theme.sidePanelW});
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: #ededed;
`;

const theme = {
  spaceM: '15px',
  spaceL: '50px',
  sidePanelW: '300px',
  color: {
    a: 'deepskyblue',
    b: 'lightsteelblue',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      channels: [],
    };
  }

  componentDidMount() {
    let ws = this.ws = new WebSocket('wss://echo.websocket.org');
    ws.onmessage = this.message.bind(this);
    ws.onopen = this.open.bind(this);
    ws.onclose = this.close.bind(this);
  }

  message(e) {
    const event = JSON.parse(e.data);
    if (event.name === 'channel add') {
      this.newChannel(event.data);
    }
  }

  open() {
    console.log('%c connected', 'background: gold;');
    this.setState({ connected: true });
  }

  close() {
    this.setState({ connected: false });
  }

  newChannel(channel) {
    const { channels } = this.state;
    channels.push(channel);
    this.setState({ channels });
  }

  addChannel(name) {
    const { channels } = this.state;
 
    const msg = {
      name: 'channel add',
      data: {
        id: channels.length,
        name,
      },
    };

    this.ws.send(JSON.stringify(msg));
  }

  setChannel(activeChannel) {
    this.setState({ activeChannel });
    // TODO: Get channel messages
  }

  render() {
    const { channels } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <AppSidePanel>
            <ChannelSection 
              channels={channels}
              addChannel={this.addChannel.bind(this)}
              setChannel={this.setChannel.bind(this)}/>
          </AppSidePanel>

          <AppMainPanel>
            <p>comming soon...</p>
          </AppMainPanel>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;