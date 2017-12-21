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
      cvc: '',
      name: ''
    }
  }

  pay(){
    fetch(`https://api.stripe.com/v1/tokens?card[number]=${this.state.ccNum}&card[exp_month]=${this.state.ccExpMon}&card[exp_year]=${this.state.ccExpYear}&card[cvc]=${this.state.cvc}&amount=0&currency=usd`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${STRIPE_SK}`
      }
    })
      .then(resp => resp.json())
        .then(data => {
          return data.id    
    })
    .then((resp)=>{
      fetch(`${DOMAIN}/handleStripePayment`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stripeToken: resp,
          amount: 1000
        })
      })
      .then((response)=> response.json())
      .then((responseJson) => {
         if(responseJson.success){
            console.log(responseJson)
            return this.props.navigation.navigate('UserFeed');
         }else{
             alert(`There was an error processing your payment. Please try again.`)
             console.log('THERE WAS AN ERROR', responseJson.error);
         }
      })
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

  setName(text){
    this.setState({name: text})
  }

  render() {
   return (
    <View style={{flex: 1, justifyContent: 'space-between', width: Dimensions.get('window').width}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
        <TextInput
            style={styles.inputField2}
            placeholder="Name on Card"
            onChangeText={(text) => this.setName(text)}
        ></TextInput>
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
        

        <View>
          <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={ () => {this.pay()} }>
          <Text style={styles.buttonLabel}>Add Card</Text>
          </TouchableOpacity>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
   )
  }
}


