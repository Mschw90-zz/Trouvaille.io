import React from 'react';
import { Button, Image, View, TouchableOpacity, Text } from 'react-native';
import { ImagePicker, Facebook, LinearGradient } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { DOMAIN } from '../env.js';
import styles from '../styles.js'
import { StackNavigator } from 'react-navigation';

export default class SettingsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        image: null
      }
    }

    static navigationOptions = {
      title: 'Settings'
    }

    // connectSpotify() {
    //   this.props.navigation.navigate('HoldingSpot');
    // }

    addCard = () => {
      this.props.navigation.navigate('Payment')
    }

    viewCards = () => {
      this.props.navigation.navigate('Payment2')
    }

    connectFacebook = async () => {
        try {
          const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '1201211719949057', // Replace with your own app id in standalone app
            { permissions: ['public_profile'] }
          );

          switch (type) {
            case 'success': {
              // Get the user's name using Facebook's Graph API
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
              const profile = await response.json();
                await fetch(`${DOMAIN}/fbupdate`, {
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    facebookName: profile.name,
                    facebookID: profile.id,
                  })
                })
                .then((response) => {
                  return response.json();
                })
                .catch(function(error){
                    console.log(`There was an error\n${error}`)
                })
                Alert.alert(
                    'Logged in!',
                    `Hi ${profile.name}!`,
                  );
                  break;
             }
             case 'cancel': {
                Alert.alert(
                  'Cancelled!',
                  'Login was cancelled!',
                );
                break;
              }
              default: {
                Alert.alert(
                  'Oops!',
                  'Login failed!',
                );
              }
            }
            } catch (e) {
                Alert.alert(
                    `Oops!`,
                    `Facebook login failed! Try again`
                );
        }
    }

  render() {
    return (
      <LinearGradient colors={['#833ab4', '#fd1d1d', '#fcb045']} style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
        <TouchableOpacity onPress={this.connectFacebook.bind(this)} style={[styles.spotifyButton, styles.buttonBlue]}>
          <Image
          style={{width:30, height: 30, marginRight: 15}}
          source={require('../assets/facebookLogo.png')}
          />
          <Text style={styles.buttonLabel}>Connect to your Facebook account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.addCard.bind(this)}
        style={{alignSelf: 'stretch',
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 50,
          marginLeft: 5,
          marginRight: 5,
          borderRadius: 5,
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: '#39824A'
        }}>
        <View style={{marginRight: 80, marginLeft: 60}}>
          <Image
            style={{width:30, height: 30}}
            source={require('../assets/cards.png')}
          />
        </View>

          <Text style={styles.buttonLabel}>Add a card</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.viewCards.bind(this)} style={[styles.spotifyButton, styles.buttonPurple]}>
          <Text style={styles.buttonLabel}>View account payment options</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

}
