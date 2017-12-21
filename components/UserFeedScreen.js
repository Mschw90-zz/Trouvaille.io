import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Drawer, Header, Title, Button, Left, Right, Body, Icon, Content } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Constants, Facebook } from 'expo';
import { DOMAIN } from '../env.js';
import Sidebar from './Sidebar.js';
import styles from '../styles.js'



// UserFeedScreen
export default class UserFeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  newTripPage() {
    this.props.navigation.navigate('NewTrip')
  }

  specificTripPage() {
    this.props.navigation.navigate('SpecificTrip')
  }

  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => {
    this.drawer._root.open()
  }

  componentWillMount() {
    fetch(`${DOMAIN}/getUserFeed`, {
      method: 'GET',
    })
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      if (responseJson.success) {
        this.setState({trips: responseJson.trips})
      } else {
        console.log('There was an error finding your trip feed', responseJson.error);
      }
    })
    .catch((err) => {
      console.log('no trip feed found');
      alert(err)
    });
  }

  render() {
    return (
      <Drawer
        style={styles.drawer}
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()}
      >

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
            <Row onPress={() => {this.specificTripPage()}} style={styles.testTrip}>
              <Image style={styles.circularProfPic} source={require('../assets/ssg2.jpg')} />
              <Row style={styles.testTripDetailsRow}>
                <Text style={styles.testTripDetails}>Tyrone is going to: Coachella Roadtrip</Text>
              </Row>
              <Row style={styles.testTripDetailsRow2}>
                <Text style={styles.testTripDate}>Dec 25th, 2017</Text>
                <Text style={styles.testTripSeats}>2 seats left</Text>
              </Row>
            </Row>
            <Row onPress={() => {this.specificTripPage()}} style={styles.testTrip}>
              <Image style={styles.circularProfPic} source={require('../assets/ssg2.jpg')} />
              <Row style={styles.testTripDetailsRow}>
                <Text style={styles.testTripDetails}>Matt Schwartz is going to: LA Drive</Text>
              </Row>
              <Row style={styles.testTripDetailsRow2}>
                <Text style={styles.testTripDate}>Jan. 1st, 2018</Text>
                <Text style={styles.testTripSeats}>0 seats left</Text>
              </Row>
            </Row>
            <Row onPress={() => {this.specificTripPage()}} style={styles.testTrip}>
              <Image style={styles.circularProfPic} source={require('../assets/ssg2.jpg')} />
              <Row style={styles.testTripDetailsRow}>
              <Text style={styles.testTripDetails}>Alex Glaze is going to: Yosemite Camping</Text>
              </Row>
              <Row style={styles.testTripDetailsRow2}>
                <Text style={styles.testTripDate}>March 3rd, 2018</Text>
                <Text style={styles.testTripSeats}>1 seats left</Text>
              </Row>
            </Row>
          </Content>
        </Container>
      </Drawer>
    )
  }
}
