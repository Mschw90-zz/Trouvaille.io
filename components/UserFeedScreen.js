import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, WebView, Linking, TextInput, Alert, AsyncStorage, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Drawer, Header, Title, Button, Left, Right, Body, Icon, Content } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Constants, Facebook } from 'expo';
import { DOMAIN } from '../env.js';
import Sidebar from './Sidebar.js';
import styles from '../styles.js'
// import SearchBar from 'react-native-search-bar'
import { SearchBar } from 'react-native-elements'




// UserFeedScreen
export default class UserFeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      username: '',
      userfeed: [],
      tripStuff: {},
      background: 'rgba(244, 246, 247, .9)'
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

    fetch(`${DOMAIN}/profile`, {
      method: 'GET',
    })
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      if (responseJson.success) {
        console.log(responseJson);
        let newName = responseJson.username.toLowerCase()
        this.setState({user: responseJson, username: newName})
      } else {
        console.log('There was an error finding your trip feed', responseJson.error);
      }
    })
    .catch((err) => {
      console.log('no trip feed found');
      alert(err)
    });

    fetch(`${DOMAIN}/getUserFeed`, {
      method: 'GET',
    })
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      if (responseJson.length) {
        responseJson.reverse()
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
          <Header style={{backgroundColor: 'transparent'}}>
            <Left>
              <Button transparent>
                <Icon name='ios-person' onPress={() => {this.openDrawer()}} style={{color: 'white'}}/>
              </Button>
            </Left>
            <Body>
              <Title style={{fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: "black", textShadowRadius: 5, textShadowOffset: {width: 3, height: 2}}}>{this.state.username}</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='ios-car' onPress={() => {this.newTripPage()}} style={{color: 'white'}}/>
              </Button>
            </Right>
          </Header>
          <SearchBar
          // lightTheme
          inputStyle={{color: 'white'}}
          placeholder='Search'
          />
          <Content style={{ display: 'flex', flex: 1}}>
                      {
            this.state.userfeed.map((trip, idx) => {
              var d = new Date(trip.date)
              var driveMonth = (d.getMonth() + 1).toString();
              var driveDay = (d.getDate()).toString();
              var driveYear = (d.getFullYear()).toString();

              return (
                <Row key={trip.id} id={trip.id} onPress={() => {this.specificTripPage(trip)}} style={{backgroundColor: this.state.background, borderRadius:10, borderColor: 'black', borderWidth: 1, marginTop: 10, marginLeft: 5, marginRight: 5}}>
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
