import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import MapView from 'react-native-maps';
import { DOMAIN } from '../env.js';


export default class NadaScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: null
      }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('NewPassenger');            
          }, 5000);

        fetch(`${DOMAIN}/spotifyUpdate`, {
        method: 'get',
        })
        .then( (response) => {
        console.log(response)
        })
        .then((responseJson) =>{
            console.log(`Found the url ${responseJson.url}`)
        this.setState({url: responseJson.url})
        })
        .catch((error)=>{
        console.log(`There was an error making the initial spoftift request`)
        })
    }

    render(){
        return (
            <Text>Please Wait for your text to load</Text>
        )
    }
}


<AddCard
addCardHandler={() => this.pay()}
// styles={{}} // Override default styles
onCardNumberBlur={() => console.log('card number blurred')}
onCardNumberFocus={() => console.log('card number focused')}
onCvcFocus={() => console.log('cvc focused')}
onCvcBlur={() => console.log('cvc blurred')}
onExpiryFocus={() => console.log('expiry focused')}
onExpiryBlur={() => console.log('expiry blurred')}
onScanCardClose={() => console.log('scan card closed')}
onScanCardOpen={() => console.log('scan card opened')}
activityIndicatorColor="pink"
addCardButtonText="Add Card"
scanCardButtonText="Scan Card"
scanCardAfterScanButtonText="Scan Card Again"
scanCardVisible={true}
placeholderTextColor="black"
cardNumberPlaceholderText="4242 4242 4242 4242"
expiryPlaceholderText="MM/YY"
cvcPlaceholderText="CVC"
cardNumberErrorMessage="Card Number is incorrect"
expiryErrorMessage="Expiry is incorrect"
cvcErrorMessage="CVC is incorrect"
/>

<StripeAddCard
publicStripeKey= {{STRIPE_SK}}
addCardTokenHandler={(stripeCardToken) => {
  console.log(stripeCardToken)
}}
// {/* Other props from AddCard */ }
/>