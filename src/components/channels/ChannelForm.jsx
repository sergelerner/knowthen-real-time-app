import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChannelInput = styled.form`
  padding: ${props => props.theme.spaceM};

  > input {
    width: 100%;

    border: none;
    outline: none;
    background: transparent;

    font-size: 16px;
    font-weight: 100;

    border-bottom: solid 1px ${props => props.theme.color.a};
  }
`;

class ChannelForm extends Component {
  onSubmit(e) {
    e.preventDefault();
    const { addChannel } = this.props;
    const channelName = this.inputNode.value;
    addChannel(channelName);
    this.inputNode.value = '';
  }

  render() {
    return (
      <ChannelInput
        onSubmit={this.onSubmit.bind(this)}>
        <input
          type="text"
          ref={(node) => { this.inputNode = node; }} />
      </ChannelInput>
    );
  }
}

ChannelForm.propTypes = {
  addChannel: PropTypes.func.isRequired,
};

export default ChannelForm;
