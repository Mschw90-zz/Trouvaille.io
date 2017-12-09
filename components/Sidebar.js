import React, { Component } from 'react';
import { Dimensions, Button, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import {Content } from 'native-base';
import { DOMAIN } from '../env.js';

export default class Sidebar extends Component {

  logout = () => {
    fetch(`${DOMAIN}/logout`, {
      method: 'GET',
    }
    ).then((response) => {
      console.log(response);
      return response.json()
    })
    .then( async (responseJson) => {
      console.log(responseJson);
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
       if(responseJson.success){
           // return this.props.navigation.goBack();
           try {
             let logoutAwait = await AsyncStorage.removeItem('user')
             console.log(logoutAwait,'^^^^^^^^^^^^');

           } catch (e) {
             console.log('error in await async logout: ', e);
           }
           return this.props.navigation.navigate('Login');

       }else{
           alert(responseJson.error)
           console.log('THERE WAS AN ERROR SIGNING OUT', responseJson.error);
       }
    })
    .catch((err) => {
        console.log('caught error in catch of submt');
        console.log(`${DOMAIN}/register`);
        alert(err)
      /* do something if there was an error with fetching */
    });
  }

  profileScreen() {
    this.props.navigation.navigate('Profile')
  }
  settingPage() {
    this.props.navigation.navigate('Settings')
  }

  render() {
    return (
          <View style={{flex: 1, alignItems: 'center', backgroundColor:'rgba(28,28,28,.9)'}}>
            <Image
              style={{width:100, height: 100}}
              source={require('../assets/rick_ricknmorty.png')}
            />
            <Button onPress={ () => this.profileScreen() } title='Profile'></Button>
            <Button title='Explore Local Trips'></Button>
            <Button title='Previous Trips'></Button>
            <Button title='Popular Trips'></Button>
            <Button onPress={ () => this.settingPage() } title='Settings'></Button>
            <Button onPress={ () => this.logout() } title='Logout'></Button>
          </View>
    );
  }
}

module.exports = Sidebar;
