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

  specificTripPage() {
    this.props.navigation.navigate('SpecificTrip')
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
          <Content style={{ display: 'flex'}}>
            <Row onPress={() => {this.specificTripPage()}} style={{height: 75, backgroundColor: 'violet',  borderWidth: 1, borderColor: 'black'}}>
              <Icon name='ios-happy' />
              <Row style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                left: 75
              }}>

                <Text style={{
                  fontWeight: 'bold',
                  alignSelf: 'flex-start'
                }}>Tyrone is going to: Coachella Roadtrip</Text>
              </Row>
              <Row style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{
                  alignSelf: 'flex-end',
                  flex: 1,
                  justifyContent: 'flex-start',
                  right: 175
                }}>Dec 25th, 2017</Text>
                <Text style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>2 seats left</Text>
              </Row>

            </Row>

            <Row onPress={() => {this.specificTripPage()}} style={{height: 75, backgroundColor: 'dodgerblue',  borderWidth: 1, borderColor: 'black'}}>
              <Icon name='ios-happy' />
              <Row style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                left: 75
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  alignSelf: 'flex-start'
                }}>Matt Schwartz is going to: LA Drive</Text>
              </Row>
              <Row style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{
                  alignSelf: 'flex-end',
                  flex: 1,
                  justifyContent: 'flex-start',
                  right: 175
                }}>Jan. 1st, 2018</Text>
                <Text style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>0 seats left</Text>
              </Row>

            </Row>

            <Row onPress={() => {this.specificTripPage()}} style={{height: 75, backgroundColor: 'lime',  borderWidth: 1, borderColor: 'black'}}>
              <Icon name='ios-happy' />
              <Row style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                left: 75
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  alignSelf: 'flex-start'
                }}>Alex Glaze is going to: Yosemite Camping</Text>
              </Row>
              <Row style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{
                  alignSelf: 'flex-end',
                  flex: 1,
                  justifyContent: 'flex-start',
                  right: 175
                }}>March 3rd, 2018</Text>
                <Text style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>1 seats left</Text>
              </Row>

            </Row>

          </Content>

        </Container>
      </Drawer>

    )
  }
}
