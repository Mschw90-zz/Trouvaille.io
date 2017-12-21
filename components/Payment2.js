import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import { DOMAIN } from '../env.js';
import styles from '../styles.js'

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    var cards = [];
    fetch(`${DOMAIN}/yourCards`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      if (responseJson.success) {
        console.log(responseJson.cards)
        responseJson.forEach(function(cc)=>{
          cards.push(cc)
        })
        console.log(cards)
      } else {
        console.log('There was an error finding your trip feed', responseJson.error);
      }
    })
    .catch((error)=>{
      console.log(`There was an error retriveing your cards\n${error}`)
    })
  }

  render()  {
        return (
          <View>
         <Text>Card Page</Text>
          </View>
        )
    }
}