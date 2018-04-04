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