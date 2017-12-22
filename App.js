import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants, Facebook, Font } from 'expo';
import { DOMAIN } from './env.js';
import NewTripScreen from './components/NewTripScreen.js'
import RegisterScreen from './components/RegisterScreen.js'
import UserFeedScreen from './components/UserFeedScreen.js'
import ProfileScreen from './components/ProfileScreen.js'
import NewDriveScreen from './components/NewDriveScreen.js'
import NewPassengerScreen from './components/NewPassengerScreen.js'
import DriverMapScreen from './components/DriverMapScreen.js'
import PassengerMapScreen from './components/PassengerMapScreen.js'
import SettingsScreen from './components/SettingsScreen.js'
import addCarScreen from './components/addCarScreen.js'
import SpecificTripScreen from './components/SpecificTripScreen.js'
import PreviousTripsScreen from './components/PreviousTripsScreen.js'
import ExploreTripsScreen from './components/ExploreTripsScreen.js'
import PopularTripsScreen from './components/PopularTripsScreen.js'
import ChatScreen from './components/ChatScreen.js'
import PaymentScreen from './components/Payment.js'
import Payment2 from './components/Payment2.js'
import FunScreen from './components/Fun.js'
import Checkout1 from './components/Checkout1.js'

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
import styles from './styles.js'

console.disableYellowBox = true;

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  }
};

const customTextProps = {
  style: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'KannadaSangamMN' : 'Roboto',
    color: 'black'
  }
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

//Login Page
class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Back to Home'
  }

  constructor(props){
    super(props);
    this.state = {
      error: '',
      username: '',
      password: '',
      fontLoaded: false
    }
  }

  _handleFacebookLogin = async () => {
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
        'Oops!',
        'Login failed!',
      );
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user')
    .then(result => {
      if (result) {
        var parsedResult = JSON.parse(result);
        var username = parsedResult.username;
        var password = parsedResult.password;
        if (username && password) {
          return this.login(username, password)
          .then(resp => resp.json())
          .then( resp => {return resp})
        }
      }
      return
    })
    .catch(err => {
      return
    });
  }

  login(username, password) {
    fetch(`${DOMAIN}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if(responseJson.success){
        AsyncStorage.setItem('user', JSON.stringify({
          username: username,
          password: password
        }));
        return this.props.navigation.navigate('UserFeed');
      } else {
        alert('Login failed');
        console.log('error in fetchlogin', responseJson.error);
        this.setState({error: responseJson.error});
      }
    })
    .catch((err) => {
      console.log('caught error in catch of login', err);
      alert(err)
      /* do something if there was an error with fetching */
    })
  }

  registerPage() {
    this.props.navigation.navigate('Register');
  }

  setUsername(text){
    this.setState(Object.assign({}, this.state, {username: text}));
  }

  setPassword(text){
    this.setState(Object.assign({}, this.state, {password: text}))
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>
        <Image style={styles.backgroundColor} source={require('./assets/landingpage.jpg')}/>
        <Text style={{alignSelf: 'flex-start'}}>{this.state.error}</Text>
        <View style={{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: 'transparent', justifyContent: 'flex-start', paddingTop: 10}}>
          <Text style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: "black", textShadowRadius: 5, textShadowOffset: {width: 3, height: 2}}}>Trouvaille</Text>
        </View>
        <View style={{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, justifyContent: 'center'}}>
          <TextInput
              style={styles.inputField}
              placeholder="Username"
              onChangeText={(text) => this.setUsername(text)}
          ></TextInput>

          <TextInput
              style={styles.inputField}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => this.setPassword(text)}
          ></TextInput>
        </View>

          <View style={{flex: 1, width: Dimensions.get('window').width }}>
            <TouchableOpacity onPress={ () => {this.login(this.state.username, this.state.password)} } style={[styles.button, styles.buttonGreen]}>
                <Text style={styles.buttonLabel}>Tap to Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.spotifyButton, styles.buttonBlue]} onPress={ () => {this._handleFacebookLogin()} }>
              <Image
              style={{width:20, height: 20, marginRight: 15}}
              source={require('./assets/facebookLogo.png')}
              />
              <Text style={styles.buttonLabel}>Login with Facebook</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
              <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: "black", textShadowRadius: 5, textShadowOffset: {width: 3, height: 2}, color: 'white', marginTop: 15}}>Don&#39;t have an account?</Text>
              <TouchableOpacity onPress={ () => { this.registerPage() } }>
                <Text style={{textDecorationLine: 'underline', fontSize: 20, color:'#001DF5', marginLeft: 5, marginTop: 15}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}


//Navigator
export default StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterScreen,
  },

  UserFeed: {
    screen: UserFeedScreen,
    navigationOptions: {
      header: null,
    },
  },
  NewTrip: {
    screen: NewTripScreen,
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  NewDrive: {
    screen: NewDriveScreen,
    navigationOptions: {
      header: null,
    },
  },
  NewPassenger: {
    screen: NewPassengerScreen,
  },
  DriverMap: {
    screen: DriverMapScreen,
  },
  PassengerMap: {
    screen: PassengerMapScreen,
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: null,
    },
  },
  addCar: {
    screen: addCarScreen,
    navigationOptions: {
      header: null,
    },
  },
  SpecificTrip: {
    screen: SpecificTripScreen,
    navigationOptions: {
      header: null,
    },
  },
  PreviousTrips: {
    screen: PreviousTripsScreen,
  },
  PopularTrips: {
    screen: PopularTripsScreen,
  },
  ExploreTrips: {
    screen: ExploreTripsScreen,
  },
  ChatBox: {
    screen: ChatScreen,
    
  },
  Payment: {
    screen: PaymentScreen
  },
  Payment2: {
    screen: Payment2
  },
  Fun: {
    screen: FunScreen
  },
  CheckoutConfirm: {
    screen: Checkout1
  }
}, {initialRouteName: 'Login'});
