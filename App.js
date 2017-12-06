import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  Container,
  Drawer,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Content,
  Form,
  Item,
  Input,
  Label,
  Footer,
  FooterTab} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Sidebar from './sidebar.js';

import { Constants, Facebook } from 'expo';
import { DOMAIN } from './env.js';
class LandingScreen extends React.Component {

  loginPage() {
    this.props.navigation.navigate('Login');
  }

  registerPage() {
    this.props.navigation.navigate('Register');
  }

  profilePage() {
    this.props.navigation.navigate('Profile')
  }

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '116740725744139', // Replace with your own app id in standalone app
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
  };

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.backgroundColor} source={require('./assets/landingpage.jpg')}/>
        <View style={{width: Dimensions.get('window').width}}>
          <Text style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: "black", textShadowRadius: 5, textShadowOffset: {width: 3, height: 2}}}>Trouvaille</Text>
        </View>
        <View style={{width: Dimensions.get('window').width}}>
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this._handleFacebookLogin()} }>
            <Text style={styles.buttonLabel}>Continue with FaceBook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={ () => {this.registerPage()} }>
            <Text style={styles.buttonLabel}>Sign up with Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={ () => {this.loginPage()} }>
            <Text style={styles.buttonLabel}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonGold]} onPress={ () => {this.profilePage()}}>
          <Text style={styles.buttonLabel}>Go to Test Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sideBarOpen: false}
  }

  newTripPage() {
    this.props.navigation.navigate('NewTrip')
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    return (
      <Drawer
        style={{width: 200, backgroundColor: 'grey'}}
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar />}
        onClose={() => this.closeDrawer()} >

        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='ios-person' onPress={() => {this.openDrawer()}}/>
              </Button>
            </Left>
            <Body>
              <Title>User Feed!</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='ios-car' onPress={() => {this.newTripPage()}} style={{color: 'red'}}/>
              </Button>
            </Right>
          </Header>
          <Content>
            <Row style={{height: 75, backgroundColor: 'violet'}}>
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 100
              }}>Mock Trip via Connection</Text>
            </Row>
            <Row style={{height: 75, backgroundColor: 'dodgerblue'}}>
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 100
              }}>Mock Trip via Connection</Text>
            </Row>
            <Row style={{height: 75, backgroundColor: 'lime'}}>
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 100
              }}>Mock Trip via Connection</Text>
            </Row>
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>Footer</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>

    )
  }
}

class NewTripScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>You made it to the new trip page!</Text>
      </View>
    )
  }
}


//Login Page
class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {error: '', username: '', password: ''}
    }
    static navigationOptions = {
      title: 'Back to Home'
    };

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
    };

    componentDidMount() {
      AsyncStorage.getItem('user')
      .then(result => {
          var parsedResult = JSON.parse(result);
          var username = parsedResult.username;
          var password = parsedResult.password;
          if (username && password) {
              return this.login(username, password)
                // .then(resp => resp.json())
                // .then( resp => console.log(resp))
        }
    }).catch(err => {console.log(err)})
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
      .then((response) => response.json())
      .then((responseJson) => {
         if(responseJson.success){
             console.log('responsejson', responseJson);
             AsyncStorage.setItem('user', JSON.stringify({
                 username: username,
                 password: password
             }));
             return this.props.navigation.navigate('HoHoHo');
         }else{
             alert(responseJson.error);
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

      setUsername(text){
        this.setState(Object.assign({}, this.state, {username: text}));
      }

      setPassword(text){
        this.setState(Object.assign({}, this.state, {password: text}))
      }


  render() {
    return (
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}} >
      <Image style={styles.backgroundColor} source={require('./assets/loginScreen.jpg')}/>
          <Text style={{alignSelf: 'flex-start'}}>{this.state.error}</Text>
          <View style={{flex: 2, width: Dimensions.get('window').width, backgroundColor: 'transparent', justifyContent: 'center'}}>
            <Text style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: "black", textShadowRadius: 5, textShadowOffset: {width: 3, height: 2}}}>Login to Catch a Ride!</Text>
          </View>
          <View style={{flex: 2, width: Dimensions.get('window').width, justifyContent: 'center'}}>
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
            <View style={{flex: 2, paddingTop:15}}>
              <TouchableOpacity onPress={ () => {this.login(this.state.username, this.state.password)} } style={[styles.button, styles.buttonGreen]}>
                  <Text style={styles.buttonLabel}>Tap to Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this._handleFacebookLogin()} }>
                <Text style={styles.buttonLabel}>Login with FaceBook</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }
}


//Register Page
class RegisterScreen extends React.Component {
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
             return this.props.navigation.goBack();
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
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Image style={styles.backgroundColor} source={require('./assets/registerScreen.jpg')}/>
        <Text style={{alignSelf: 'flex-start'}}>{this.state.error}</Text>
        <View style={{flex: 2, width: Dimensions.get('window').width, backgroundColor: 'transparent', justifyContent: 'center'}}>
          <Text style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: "black", textShadowRadius: 5, textShadowOffset: {width: 3, height: 2}}}>Come Catch a Ride!</Text>
        </View>
        <View style={{flex: 2, width: Dimensions.get('window').width, justifyContent: 'center'}}>
          <TextInput
              style={styles.inputField}
              placeholder="Email Address"
              onChangeText={(text) => this.setEmail(text)}
          ></TextInput>
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
          <TextInput
              style={styles.inputField}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(text) => this.setPasswordRepeat(text)}
          ></TextInput>
          <View style={{flex: 2, paddingTop:15}}>
            <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={ () => {this.submit(this.state.username, this.state.password, this.state.passwordRepeat, this.state.email)} }>
            <Text style={styles.buttonLabel}>Tap to Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}



//Navigator
export default StackNavigator({
  LandingPage: {
    screen: LandingScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },

  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  NewTrip: {
    screen: NewTripScreen,
  },
}, {initialRouteName: 'LandingPage'});

//style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    // borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  background: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: 50,
    paddingBottom: 40,
    backgroundColor: "transparent",
  },
  backgroundColor: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonGold: {
    backgroundColor: '#FFDF00'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
});
