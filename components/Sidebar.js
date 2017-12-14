import React, { Component } from 'react';
import { Dimensions, Button, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import {Content } from 'native-base';
import { DOMAIN } from '../env.js';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    }
  }

  previousTrips = () => {
    this.props.navigation.navigate('PreviousTrips')
  }

  popularTrips = () => {
    this.props.navigation.navigate('PopularTrips')
  }

  exploreTrips = () => {
    this.props.navigation.navigate('ExploreTrips')
  }

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

  componentDidMount() {
    fetch(`${DOMAIN}/profileImage`, {
      method: 'GET',
    }
    ).then((response) => {
      console.log(response);
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson);
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
       if(responseJson.success){
           // return this.props.navigation.goBack();
          this.setState({image: responseJson.photo})
       }else{
           console.log('THERE WAS AN ERROR FINDING PICTURE', responseJson.error);
       }
    })
    .catch((err) => {
        console.log('no picture found');
        alert(err)
      /* do something if there was an error with fetching */
    });
  }


  render() {
    return (
          <View style={{flex: 1, alignItems: 'center', backgroundColor:'rgba(28,28,28,.9)'}}>
            <Image
              style={{width:75, height: 75, marginTop: 25}}
              source={{ uri: this.state.image }}
            />
            <Button onPress={ () => this.profileScreen() } title='Profile'></Button>
            <Button onPress={ () => this.exploreTrips() } title='Explore Local Trips'></Button>
            <Button onPress={ () => this.previousTrips() } title='Previous Trips'></Button>
            <Button onPress={ () => this.popularTrips() } title='Popular Trips'></Button>
            <Button onPress={ () => this.settingPage() } title='Settings'></Button>
            <Button onPress={ () => this.logout() } title='Logout'></Button>
          </View>
    );
  }
}

module.exports = Sidebar;
