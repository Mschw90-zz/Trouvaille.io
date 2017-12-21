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
      background: ['#92FB7A','#3A69F6', '#EB4CC7', '#8A29F5', '#EB3323', 'aqua', 'fuchsia', 'lime', 'navy', 'olive', 'orange', 'red', 'silver', 'teal', 'yellow']
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
            this.state.userfeed.map((user, idx) => {
              console.log(user);
              if (false && user.trips.length) {
                var d = new Date(user.trips[0].date)
                var driveMonth = (d.getMonth() + 1).toString();
                var driveDay = (d.getDate()).toString();
                var driveYear = (d.getFullYear()).toString();
                var uri = user.trips[0].fun_trip_url
                return (
                  <Row key={user.id} id={user.id} onPress={() => {this.specificTripPage()}} style={{backgroundColor: this.state.background[idx % 15], borderRadius:10, borderColor: 'black', borderWidth: 1, marginBottom: 10, marginLeft: 5, marginRight: 5}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={styles.circularProfPic} source={{ uri: user.profile_URL }} />
                    <Text style={{fontWeight: 'bold'}}>{user.first_name}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontWeight: 'bold'}}>Origin: </Text>
                      <Text>{user.trips[0].departure_city}, {user.trips[0].departure_state}</Text>
                      <Text style={{fontWeight: 'bold'}}>Destination: </Text>
                      <Text>{user.trips[0].destination_city}, {user.trips[0].destination_state}</Text>

                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontWeight: 'bold'}}>Date of Trip: </Text>
                      <Text>{driveMonth}/{driveDay}/{driveYear}</Text>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>Seats Left: </Text>
                        <Text>{user.trips[0].remaining_seats}</Text>
                      </View>
                    </View>
                    <View>
                      <WebView
                        ref={(ref) => { this.webview = ref; }}
                        source={{ uri  }}
                        onNavigationStateChange={(event) => {
                          if (event.url !== uri) {
                            this.webview.stopLoading();
                            Linking.openURL(event.url);
                          }
                        }}
                        />
                    </View>
                  </Row>
                )
              }
            })
          }
          </Content>
        </Container>
      </Drawer>
    )
  }
}
