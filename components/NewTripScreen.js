import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
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
import Sidebar from './Sidebar.js';
import { Constants, Facebook, LinearGradient } from 'expo';
import { DOMAIN } from '../env.js';
import styles from '../styles.js'


export default class NewTripScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {}
    }

    static navigationOptions = {
      title: 'New Trip'
    };

    newDrivePage() {
      this.props.navigation.navigate('NewDrive');
    }

    newPassengerPage() {
      this.props.navigation.navigate('NewPassenger');
    }

    render() {
      return (
        <LinearGradient colors={['#00C9FF', '#92FE9D']} style={styles.background}>
            <View style={{flex:.5, alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width}}>
            <Text style={{fontSize: 35, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: "black", textShadowRadius: 5, textShadowOffset: {width: 3, height: 2}}}>
              Would you like to be a Driver or Passenger?
            </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', flex: 1, width: Dimensions.get('window').width}}>
              <Button onPress={() => {this.newDrivePage()}} style={{backgroundColor: 'transparent', width: 150, height: 150, paddingTop: 55, paddingLeft: 20, borderWidth: 1, borderColor: 'white'}}>
                <Icon name='ios-car' style={{fontSize: 90, marginBottom: 50, color: 'white'}} />
              </Button>
              <Button transparent onPress={() => {this.newPassengerPage()}} style={{marginLeft: 10, backgroundColor: 'transparent', width: 150, height: 150, paddingTop: 15, paddingLeft: 20, borderWidth: 1, borderColor: 'white'}}>
                <Icon name='ios-briefcase' style={{color: 'white', fontSize: 90}}/>
              </Button>
            </View>
        </LinearGradient>
      )
    }
  }
