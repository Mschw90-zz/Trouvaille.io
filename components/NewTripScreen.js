import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Icon } from 'native-base';
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
            <View style={styles.newDriveView}>
            <Text style={styles.newTripText}>
              Would you like to be a Driver or Passenger?
            </Text>
            </View>
            <View style={styles.newTripViewTwo}>
              <Button onPress={() => {this.newDrivePage()}} style={styles.newDriveButton}>
                <Icon name='ios-car' style={styles.newDriveIcon} />
              </Button>
              <Button transparent onPress={() => {this.newPassengerPage()}} style={styles.newPassengerButton}>
                <Icon name='ios-briefcase' style={styles.newPassengerIcon}/>
              </Button>
            </View>
        </LinearGradient>
      )
    }
  }
