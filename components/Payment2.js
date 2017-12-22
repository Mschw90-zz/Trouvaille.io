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
      allYourCards: []
    }
  }

  viewCard(){
    console.log(`You got me`)
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
        this.setState({
          allYourCards: responseJson.cards
        })
      } else {
        console.log('There was an error finding your trip feed', responseJson.error);
      }
    })
    .catch((error)=>{
      console.log(`There was an error retriveing your cards\n${error}`)
    })
  }

  render()  {
    console.log(this.state.allYourCards)
        return (
          <View>
        {this.state.allYourCards.map(card =>{
          return(<TouchableOpacity key={card.stripeLast4} onPress={this.viewCard.bind(this)} style={[styles.spotifyButton, styles.buttonRed]}>
          <Text style={styles.buttonLabel}>Delete: {card.stripeLast4}</Text>
        </TouchableOpacity>)
        })}
          </View>
        )
    }
}
