import React, { Component } from 'react';
import ChannelSection from './channels/index.jsx';
import styled, { ThemeProvider } from 'styled-components';

import Styles from './styles/index.js';
import Socket from '../socket.js';

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
      activeChannel: undefined,
      users: [],
      channels: [],
    };
  }

  componentDidMount() {
    let ws = new WebSocket('ws://localhost:4000');
    let socket = this.socket = new Socket(ws);

    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('channel add', this.onAddChannel.bind(this));
    socket.on('user add', this.onAddUser.bind(this));
    socket.on('user edit', this.onEditUser.bind(this));
    socket.on('user remove', this.onRemoveUser.bind(this));
    socket.on('message add', this.onMessageAdd.bind(this));
  }
  
  onConnect() {
    this.setState({ connected: true });
    this.socket.emit('channel subscribe');
    this.socket.emit('user subscribe');
  }

  onDisconnect() {
    this.setState({ connect: false });
  }

  // Server -> Client

  onMessageAdd(message) {
    let { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
  }

  onAddUser(user) {
    let { users } = this.state;
    users.push(user);
    this.setState({ users });
  }

  onRemoveUser(removeUser) {
    let { users } = this.state;
    users = users.filter(user => user.id !== removeUser.id);
    this.setState({ users });
  }

  onEditUser(editUser) {
    let { users } = this.state;
    users = users.map(user => {
      if (user.id === editUser.id) {
        return editUser;
      }
      return user;
    });
    this.setState({ users });
  }

  onAddChannel(channel) {
    let { channels } = this.state;
    channels.push(channel);
    this.setState({ channels });
  }

  // Client -> Server

  addChannel(name) {
    this.socket.emit('channel add', { name });
  }

  setChannel(activeChannel) {
    this.setState({ activeChannel });
    this.socket.emmit('message unsubscribe');
    this.setState({ messages: [] });
    this.socket.emmit('message subscribe', { channelId: activeChannel.id });
  }

  setUserName(name) {
    this.socket.emit('user edit', { name });
  }

  addMessage(body) {
    let { activeChannel } = this.state;
    this.socket.emmit('message add', {
      channelId: activeChannel.id,
      body,
    });
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