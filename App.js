import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

class LandingScreen extends React.Component {

  loginPage() {
    this.props.navigation.navigate('Login');
  }

  registerPage() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.backgroundColor} source={require('./landingpage.jpg')}/>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: 'white'}} >Trouvaille</Text>
        <View style={{width: 375}}>
          <TouchableOpacity style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonLabel}>Continue with FaceBook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={ () => {this.registerPage()}}>
          <Text style={styles.buttonLabel}>Sign up with Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={ () => {this.loginPage()}}>
          <Text style={styles.buttonLabel}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}


//Login Page
class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {error: '', username: '', password: ''}
    }
    static navigationOptions = {
      title: 'Login to Catch a Ride!'
    };

  render() {
    return (
      <View style={styles.container}>
          <Text style={{alignSelf: 'flex-start'}}>{this.state.error}</Text>
          <TextInput
              style={styles.inputField}
              placeholder="Username"
          ></TextInput>

          <TextInput
              style={styles.inputField}
              placeholder="Password"
              secureTextEntry={true}
          ></TextInput>
          <TouchableOpacity style={[styles.button, styles.buttonGreen]}>
              <Text style={styles.buttonLabel}>Tap to Login</Text>
          </TouchableOpacity>
      </View>
    )
  }
}


//Register Page
class RegisterScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {error: '', username: '', password: ''}
    }
    static navigationOptions = {
      title: 'Register to Catch a Ride!'
    };

  render() {
    return (
      <View style={styles.container}>
          <Text style={{alignSelf: 'flex-start'}}>{this.state.error}</Text>
          <TextInput
              style={styles.inputField}
              placeholder="Email Address"
          ></TextInput>
          <TextInput
              style={styles.inputField}
              placeholder="Username"
          ></TextInput>
          <TextInput
              style={styles.inputField}
              placeholder="Password"
              secureTextEntry={true}
          ></TextInput>
          <TextInput
              style={styles.inputField}
              placeholder="Confirm Password"
              secureTextEntry={true}
          ></TextInput>

          <TouchableOpacity style={[styles.button, styles.buttonGreen]}>
              <Text style={styles.buttonLabel}>Tap to Login</Text>
          </TouchableOpacity>
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
}, {initialRouteName: 'LandingPage'});

//style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    borderColor: 'gray',
    borderWidth: 1
  },
  background: {
    paddingTop: 50,
    paddingBottom: 40,
    justifyContent: "space-between",
    alignItems: 'center',
    width: 375,
    height: 667,
    backgroundColor: "transparent"
  },
  backgroundColor: {
    top: 0,
    position: 'absolute',
    height: 667,
    width: 375
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
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
