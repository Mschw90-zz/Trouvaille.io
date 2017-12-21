import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import { DOMAIN, STRIPE_SK } from '../env.js';
import styles from '../styles.js'

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ccNum: '',
      ccExpMon:  '',
      ccExpYear: '',
      cvc: ''
    }
  }

  pay(){
    fetch(`https://api.stripe.com/v1/tokens?card[number]=${this.state.ccNum}&card[exp_month]=${this.state.ccExpMon}&card[exp_year]=${this.state.ccExpYear}&card[cvc]=${this.state.cvc}&amount=999&currency=usd`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${STRIPE_SK}`
      }
    })
      .then(resp => resp.json())
        .then(data => {
          console.log(data) 
          return data      
    })
    .catch((error) => {
      console.log(`There was an error\n${error}`)
    })
  }

  setCC(text){
    this.setState({ccNum: text})
  }

  setExpM(text){
    this.setState({ccExpMon: text})
  }

  setExpY(text){
    this.setState({ccExpYear: text})
  }

  setCVC(text){
    this.setState({cvc: text})
  }

  render() {
   return (
     <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
        <TextInput
            style={styles.inputField2}
            placeholder="ccNum"
            onChangeText={(text) => this.setCC(text)}
        ></TextInput>
        <TextInput
            style={styles.inputField2}
            placeholder="Exp Month"
            onChangeText={(text) => this.setExpM(text)}
        ></TextInput>
        <TextInput
            style={styles.inputField2}
            placeholder="Exp Year"
            secureTextEntry={true}
            onChangeText={(text) => this.setExpY(text)}
        ></TextInput>
        <TextInput
            style={styles.inputField2}
            placeholder="cvc"
            secureTextEntry={true}
            onChangeText={(text) => this.setCVC(text)}
        ></TextInput>
        <View style={{flex: 1, maringTop: 2, justifyContent: 'center', width: Dimensions.get('window').width}}>
          <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={ () => {this.pay()} }>
          <Text style={styles.buttonLabel}>Tap to Pay</Text>
          </TouchableOpacity>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
   )
  }
}


