import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, WebView, Linking, TextInput, Alert, AsyncStorage, ListView } from 'react-native';
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
      userfeed: [],
      tripStuff: {},
      background: ['#92FB7A','#3A69F6', '#EB4CC7', '#8A29F5', '#EB3323', 'aqua', 'fuchsia', 'lime', 'navy', 'olive', 'orange', 'red', 'silver', 'teal', 'yellow']
    }
  }

  newTripPage() {
    this.props.navigation.navigate('NewDrive')
  }

  specificTripPage(tripInfo) {
    this.setState({
      tripStuff: tripInfo
    })
    this.props.navigation.navigate('SpecificTrip', {trip: tripInfo})
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
      if (responseJson.length) {
        this.setState({userfeed: responseJson})
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

        <Container style={{backgroundColor: '#E0E3ED'}}>
        <Image style={styles.backgroundColor} source={require('../assets/roadbro.gif')}/>
          <Header style={{marginBottom: 10}}>
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
          <Content style={{ display: 'flex', flex: 1}}>
          {
            this.state.userfeed.map((trip, idx) => {
              console.log(trip);

              var d = new Date(trip.date)
              var driveMonth = (d.getMonth() + 1).toString();
              var driveDay = (d.getDate()).toString();
              var driveYear = (d.getFullYear()).toString();

              return (
                <Row key={trip.id} id={trip.id} onPress={() => {this.specificTripPage(trip)}} style={{backgroundColor: this.state.background[idx % 15], borderRadius:10, borderColor: 'black', borderWidth: 1, marginBottom: 10, marginLeft: 5, marginRight: 5}}>
                  <View style={{flex: .5, alignItems: 'center', justifyContent: 'center'}}>
                  <Image style={styles.circularProfPic} source={{ uri: trip.user.profile_URL }} />
                  <Text style={{fontWeight: 'bold'}}>{trip.user.first_name}</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>Origin: </Text>
                    <Text style={{fontSize: 15}}>{trip.departure_city}, {trip.departure_state}</Text>
                    <Text style={{fontWeight: 'bold'}}>Destination: </Text>
                    <Text style={{fontSize: 15}}>{trip.destination_city}, {trip.destination_state}</Text>

                  </View>
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>Date of Trip: </Text>
                    <Text style={{fontSize: 15}}>{driveMonth}/{driveDay}/{driveYear}</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontWeight: 'bold'}}>Seats Left: </Text>
                      <Text style={{fontSize: 15}}>{trip.remaining_seats}</Text>
                    </View>
                  </View>
                </Row>
              )
            })
          }
          </Content>
        </Container>
      </Drawer>
    )
  }
}
