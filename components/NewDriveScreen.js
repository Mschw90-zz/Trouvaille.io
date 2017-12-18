import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Icon, Content, Item, Form, Input } from 'native-base';
import DateSelectCalendar from './DateSelectCalendar.js';
import { DOMAIN } from '../env.js';
import Modal from 'react-native-modal';
import styles from '../styles.js';
export default class NewDriveScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date: '2017-12-20',
      departureCity: '',
      departureState: '',
      departureZip: '',
      destinationCity: '',
      destinationState: '',
      destinationZip: '',
      // seatCount: '',
      // costPerSeat: '',
      isModalVisible: false
    }
  }


  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })


  setTripDate(day) {

    //since no redux do we need to post it to server in function here?
    console.log('day', day);
    console.log('day.date', day.dateString);
    let update = Object.assign({}, this.state, {date: day.dateString})
    console.log('update!!', update);
      this._hideModal();
      this.setState(update)
      console.log('state state state here ', this.state);

    }


  setDepartureCity(departureCity) {
    let update = Object.assign({}, this.state, {departureCity: departureCity})
    if (departureCity.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid departure city')
    }
  }

  setDepartureState(departureState) {
    let update = Object.assign({}, this.state, {departureState: departureState})
    if (departureState.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid departure state')
    }
  }

  setDepartureZip(departureZip) {
    let update = Object.assign({}, this.state, {departureZip: departureZip})
    if (departureZip.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid departure zip')
    }
  }

  setDestinationCity(destinationCity) {
    let update = Object.assign({}, this.state, {destinationCity: destinationCity})
    if (destinationCity.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid destination city')
    }
  }

  setDestinationState(destinationState) {
    let update = Object.assign({}, this.state, {destinationState: destinationState})
    if (destinationState.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid destination state')
    }
  }

  setDestinationZip(destinationZip) {
    let update = Object.assign({}, this.state, {destinationZip: destinationZip})
    if (destinationZip.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid seat count')
    }
  }

  // setSeatCount(seatCount) {
  //   let update = Object.assign({}, this.state, {seatCount: seatCount})
  //   if (seatCount.length > 0) {
  //     this.setState(update)
  //   } else{
  //     alert('Not a valid cost per seat')
  //   }
  // }
  //
  // setSeatCost(seatCost) {
  //   let update = Object.assign({}, this.state, {seatCost: seatCost})
  //   if (seatCost.length > 0) {
  //     this.setState(update)
  //   } else{
  //     alert('Not a valid departure city')
  //   }
  // }

  submitTrip( date, departureCity, departureState, departureZip, destinationCity,
    destinationState, destinationZip
  ) {
    console.log('state before fetch', this.state);
    fetch(`${DOMAIN}/`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        departureCity: departureCity,
        departureState: departureState,
        departureZip: departureZip,
        destinationCity: destinationCity,
        destinationState: destinationState,
        destinationZip: destinationZip
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        return this.props.navigation.navigate('UserFeed');
      } else {
        alert(responseJson.error)
        console.log('Error submitting Trip', responseJson.error);
      }
    })
    .catch((err) => {
      console.log('caught errror in catch of submitting trip');
      alert(err)
    });
  }

  static navigationOptions = {
    title: 'New Driver'
  };

  DriverDestinationMap() {
    this.props.navigation.navigate('DriverMap');
  }

  render() {
    return (
      <Container>
        {/* <Header>
          <Button onPress={() => {this.DriverDestinationMap()}} style={styles.mapButton}><Text>Da Map</Text></Button>
        </Header> */}
        <Content>
          <Form>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this._showModal} style={{alignItems: 'center'}}>
                <Icon active name='ios-calendar-outline' />
              </TouchableOpacity>
              <Modal style={styles.calendarModal} isVisible={this.state.isModalVisible}>
                <View style={styles.calendarView}>
                  <DateSelectCalendar
                    initialDate={this.state.date}
                    changeDay={ (day) => this.setTripDate(day) }
                    closeModal={ () => this._hideModal() }>
                  </DateSelectCalendar>
                  <TouchableOpacity
                    title='hide modal'
                    color='#841584'
                    onPress={this._hideModal}>
                      <Text>Hide Modal</Text>
                    </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <Item>
              <Input
                placeholder="Departure City"
                onChangeText={(text) => this.setDepartureCity(text)} />
            </Item>
            <Item>
              <Input
                placeholder="Departure State"
                onChangeText={(text) => this.setDepartureState(text)} />
            </Item>
            <Item>
              <Input
                placeholder="Departure Zip Code"
                onChangeText={(text) => this.setDepartureZip(text)} />
            </Item>
            <Item>
              <Input
                placeholder="Destination City"
                onChangeText={(text) => this.setDestinationCity(text)} />
            </Item>
            <Item>
              <Input
                placeholder="Destination State"
                onChangeText={(text) => this.setDestinationState(text)} />
            </Item>
            <Item>
              <Input
                placeholder="Destination Zipcode"
                onChangeText={(text) => this.setDestinationZip(text)} />
            </Item>
            {/* <Item>
              <Input
                placeholder="# of Seats"
                onChangeText={(text) => this.setSeatCount(text)}
              />
            </Item>
            <Item>
              <Input
                placeholder="$ per seat"
                onChangeText={(text) => this.setSeatCost(text)}
              />
            </Item> */}
            <Item>
              {/* onPress{() => {this.submitTrip()}} */}
              <Button danger
                style={styles.submitButton}
                onPress={ () => {
                this.submitTrip(
                  this.state.date,
                  this.state.departureCity,
                  this.state.departureState,
                  this.state.departureZip,
                  this.state.destinationCity,
                  this.state.destinationState,
                  this.state.destinationZip
                )
              }}>
                <Text>Submit</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
