import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  Container,
  Drawer,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Content,
  Form,
  Item,
  Input,
  Label,
  Footer,
  FooterTab} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Constants, Facebook } from 'expo';
import { DOMAIN } from '../env.js';
import styles from '../styles.js'
import Sidebar from './Sidebar.js';



// UserFeedScreen
export default class UserFeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sideBarOpen: false}
  }

  newTripPage() {
    this.props.navigation.navigate('NewTrip')
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    return (
      <Drawer
        style={{width: 200, backgroundColor: 'grey'}}
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >

        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='ios-person' onPress={() => {this.openDrawer()}}/>
              </Button>
            </Left>
            <Body>
              <Title>User Feed!</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='ios-car' onPress={() => {this.newTripPage()}} style={{color: 'red'}}/>
              </Button>
            </Right>
          </Header>
          <Content>
            <Row style={{height: 75, backgroundColor: 'violet'}}>
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 100
              }}>Mock Trip via Connection</Text>
            </Row>
            <Row style={{height: 75, backgroundColor: 'dodgerblue'}}>
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 100
              }}>Mock Trip via Connection</Text>
            </Row>
            <Row style={{height: 75, backgroundColor: 'lime'}}>
              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 100
              }}>Mock Trip via Connection</Text>
            </Row>
          </Content>
        
        </Container>
      </Drawer>

    )
  }
}
