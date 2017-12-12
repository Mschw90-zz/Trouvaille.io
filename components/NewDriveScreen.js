import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';

export default class NewDriveScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  DriverDestinationMap() {
    this.props.navigation.navigate('DriverMap');
  }

  render() {
    return (
      <Container>
        <Header>
          <Button onPress={() => {this.DriverDestinationMap()}} style={{paddingTop: 88, marginBottom: 33, width: Dimensions.get('window').width}}><Text>Da Map</Text></Button>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Date of Trip" />
            </Item>
            <Item last>
              <Input placeholder="Destination" />
            </Item>
            <Item last>
              <Input placeholder="Why are you travelling?" />
            </Item>
            <Item last>
              <Input placeholder="# of Seats" />
            </Item>
            <Item last>
              <Input placeholder="What are you driving? Include your make model and year." />
            </Item>
            <Item last>
              <Input placeholder="Cost of trip" />
            </Item>
            <Item last>
              <Input placeholder="$ per contributor" />
            </Item>
            <Item last>
              <Input placeholder="$ for front seat" />
            </Item>
            <Item last>
              <Input placeholder="Discussion - Use this to chat and figure out what you need to have a fun trip!" />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
