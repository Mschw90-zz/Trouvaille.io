import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker, Facebook } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { DOMAIN } from '../env.js';

export default class SettingsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {image: null}
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
            console.log(profile);
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
              console.log('response', response);
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Connect your Trouvaille account to your Facebook account"
          onPress={this.connectFacebook}
        />
       
        <Button
          title="Connect your Trouvaille account to your Spotify account"
          onPress={this.connectSpotify}
        />
       
        <Button
          title="Connect your Trouvaille account to Apple Music account"
          onPress={this.connectApple}
        />
       
      </View>
    );
  }

}