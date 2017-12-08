import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants, Facebook } from 'expo';
import { DOMAIN } from '../env.js';
import styles from '../styles.js'


//Register Page
export default class RegisterScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {error: '', username: '', password: '', passwordRepeat: '', email: '' }
    }
    static navigationOptions = {
      title: 'Register to Catch a Ride!'
    };

    setEmail(text){
      let update = Object.assign({}, this.state, {email: text})
      let newText = text.split('')
      if(text.length > 0){
          this.setState(update)
      } else {
          alert('Not a Vaild Email')
      }
    }

    setUsername(text){
      let update = Object.assign({}, this.state, {username: text})
      if(text.length > 0 ){
          this.setState(update)
      } else {
          alert('Username must be entered')
      }
    }

    setPassword(text){
      let update = Object.assign({}, this.state, {password: text})
      if(text.length > 0 ){
          this.setState(update)
      } else {
          alert('Password must be entered')
      }
    }

    setPasswordRepeat(text){
      let update = Object.assign({}, this.state, {passwordRepeat: text})
      if(text === this.state.password){
          this.setState(update)
      }
    }

    submit(username, password, passwordRepeat, email) {

      fetch(`${DOMAIN}/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password,
          passwordRepeat: passwordRepeat,
          email: email
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        /* do something with responseJson and go back to the Login view but
         * make sure to check for responseJson.success! */
         if(responseJson.success){
             // return this.props.navigation.goBack();
             return this.props.navigation.navigate('UserFeed');

         }else{
             alert(responseJson.error)
             console.log('THERE WAS AN ERROR', responseJson.error);
         }
      })
      .catch((err) => {
          console.log('caught error in catch of submt');
          console.log(`${DOMAIN}/register`);
          alert(err)
        /* do something if there was an error with fetching */
      });
    }

  render() {
    return (
    <View style={styles.background}>
        <Image style={styles.backgroundColor} source={require('../assets/registerScreen.jpg')}/>
        <View style={{flex: .5, width: Dimensions.get('window').width, backgroundColor: 'transparent'}}>
          <Text style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: "black", textShadowRadius: 5, textShadowOffset: {width: 3, height: 2}}}>Come Catch a Ride!</Text>
        </View>
        <View style={{flex: 1, width: Dimensions.get('window').width}}>
          <View>
            <TextInput
                style={styles.inputField2}
                placeholder="Email Address"
                onChangeText={(text) => this.setEmail(text)}
            ></TextInput>
            <TextInput
                style={styles.inputField2}
                placeholder="Username"
                onChangeText={(text) => this.setUsername(text)}
            ></TextInput>
            <TextInput
                style={styles.inputField2}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => this.setPassword(text)}
            ></TextInput>
            <TextInput
                style={styles.inputField2}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={(text) => this.setPasswordRepeat(text)}
            ></TextInput>
          </View>
          <View style={{flex: 1, justifyContent: 'center', width: Dimensions.get('window').width}}>
              <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={ () => {this.submit(this.state.username, this.state.password, this.state.passwordRepeat, this.state.email)} }>
                <Text style={styles.buttonLabel}>Tap to Register</Text>
              </TouchableOpacity>
          </View>
        </View>
    </View>
    )
  }
}
