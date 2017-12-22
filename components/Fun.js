import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Fun extends Component {
  static navigationOptions = {
    title: 'Landmarks'
  };
  render() {
    return (
      <WebView
        source={{uri: this.props.navigation.state.params.trip_url}}
      />
    );
  }
}
