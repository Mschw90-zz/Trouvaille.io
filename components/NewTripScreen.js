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

    newDrivePage() {
      this.props.navigation.navigate('NewDrive');
    }

    newPassengerPage() {
      this.props.navigation.navigate('NewPassenger');
    }

    render() {
      return (
        <Container>


          <Content>
            <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 35}}>
              Would you like to be a driver or passenger?
            </Text>
            <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row', marginTop: 115, marginLeft: 33}}>
              <Button style={{backgroundColor: '#379df1', width: 150, height: 150, paddingTop: 55, paddingLeft: 20}}>
                <Icon name='ios-car' onPress={() => {this.newDrivePage()}} style={{fontSize: 90, marginBottom: 50, color: '#f7d432'}} />
              </Button>
              <Button transparent style={{marginLeft: 10, backgroundColor: '#379df1', width: 150, height: 150, paddingTop: 15, paddingLeft: 20}}>
                <Icon name='ios-briefcase' onPress={() => {this.newPassengerPage()}} style={{color: '#f7d432', fontSize: 90}}/>
              </Button>
            </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>Footer</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      )
    }
  }
