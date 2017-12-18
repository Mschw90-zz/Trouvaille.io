import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import styles from '../styles.js';

export default class NewPassengerScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  PassengerDestinationMap() {
    this.props.navigation.navigate('PassengerMap');
  }

  render() {
    return (
      <Container>
        <Header>
          <Button onPress={() => {this.PassengerDestinationMap()}} style={styles.mapButton}><Text>Da Map</Text></Button>
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
            <Item>
              <Button style={styles.submitButton} full><Text>Submit</Text></Button>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
