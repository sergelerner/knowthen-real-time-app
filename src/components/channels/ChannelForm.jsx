import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <form
        onSubmit={this.onSubmit.bind(this)}>
        <input
          type="text"
          ref={(node) => { this.inputNode = node; }} />
      </form>
    );
  }
}

ChannelForm.propTypes = {
  addChannel: PropTypes.func.isRequired,
};

export default ChannelForm;
