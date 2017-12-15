import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';

export default class NewPassengerScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    title: 'New Passenger'
  };

  PassengerDestinationMap() {
    this.props.navigation.navigate('PassengerMap');
  }

  render() {
    return (
      <Container>
        <Header>
          <Button onPress={() => {this.PassengerDestinationMap()}} style={{paddingTop: 88, marginBottom: 33, width: Dimensions.get('window').width}}><Text>Da Map</Text></Button>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Departure date " />
            </Item>
            <Item last>
              <Input placeholder="Destination?" />
            </Item>
            <Item last>
              <Input placeholder="Why are you travelling?" />
            </Item>
            <Item last>
              <Input placeholder="$ contribution: " />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
