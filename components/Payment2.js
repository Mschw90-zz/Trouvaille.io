import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import { AddCard } from 'react-native-stripe-checkout'
import { DOMAIN, STRIPE_SK } from '../env.js';
import styles from '../styles.js'

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render()  {
        return (
          <View>
          <Text> Hi </Text>
          </View>
        )
    }
}