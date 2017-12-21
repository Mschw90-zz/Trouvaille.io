import React, { Component } from 'react';
import { WebView, Linking, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { DOMAIN } from '../env.js';


export default class SpotifyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: null
        }
      }

      componentDidMount() {
        fetch(`${DOMAIN}/spotifyUpdate`, {
          method: 'get',
          })
          .then( (response) => {
          console.log(response)
          return response.json()
          })
          .then((responseJson) =>{
              console.log(`Found the url ${responseJson.url}`)
              this.setState({url: responseJson.url})
          })
          .catch((error)=>{
          console.log(`There was an error making the initial spoftify request`)
          })
      }

  render() {
    var uri = this.state.url
    console.log(uri)
    return uri !== null ? (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri  }}
        onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    ) : <Text> Loading.... </Text>
  }
}
