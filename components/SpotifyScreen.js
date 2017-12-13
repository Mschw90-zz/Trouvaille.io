import React, { Component } from 'react';
import { WebView, Linking, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { DOMAIN } from '../env.js';


export default class SpotifyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ure: this.props.url
        }
      }

      componentDidMount() {
        console.log(`This is the URI ${this.state.ure}`)
      }
    
  render() {
    const uri = this.state.ure;
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
        onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    );
  }
}