import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import { DOMAIN, STRIPE_SK } from '../env.js';
import styles from '../styles.js'

export default class CheckoutConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: {}
        }
    }

    componentDidMount(){
        this.setState({
            trip: trip_checkout
        })
    }

    render() {
        return (
         <View>
         <Text> Checkout </Text>
         </View>   
        )
    }

}