import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';

export default class DriverMapScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <View>
        <Text style={{fontSize: 75, fontWeight: 'bold', alignItems: 'center'}}>Google Map will go here</Text>
      </View>
    )
  }
}
