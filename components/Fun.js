import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Fun extends Component {
  render() {
    return (
      <WebView
        source={{uri: this.props.navigation.state.params.trip_url}}
      />
    );
  }
}