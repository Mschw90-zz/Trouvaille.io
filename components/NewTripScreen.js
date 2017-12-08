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
import { Constants, Facebook } from 'expo';
import { DOMAIN } from '../env.js';
import styles from '../styles.js'


export default class NewTripScreen extends React.Component {
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
