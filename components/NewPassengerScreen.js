import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Alert, AsyncStorage, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Label, Button, Icon, Content, Item, Form, Input } from 'native-base';
import DateSelectCalendar from './DateSelectCalendar.js';
import Modal from 'react-native-modal';
import styles from '../styles.js';
import { DOMAIN, ACCESSKEY, SECRETKEY } from '../env.js';

export default class NewPassengerScreen extends React.Component {
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
      seatCount: '',
      costPerSeat: '',
      tripDetails: '',
      isModalVisible: false
    }
  }

  static navigationOptions = {
    title: 'New Passenger'
  };

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

  setSeatCount(seatCount) {
    let update = Object.assign({}, this.state, {seatCount: seatCount})
    if (seatCount.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid cost per seat')
    }
  }

  setSeatCost(seatCost) {
    let update = Object.assign({}, this.state, {seatCost: seatCost})
    if (seatCost.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid departure city')
    }
  }

  setTripDetails(text) {
      let update = Object.assign({}, this.state, {tripDetails: text})
      this.setState(update)
  }

  submitTrip( date, departureCity, departureState, departureZip, destinationCity,
    destinationState, destinationZip, seatCount, seatCost, tripDetails
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
        destinationZip: destinationZip,
        tripDetails: tripDetails
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



  DriverDestinationMap() {
    this.props.navigation.navigate('DriverMap');
  }

  render() {
    return (

      <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 40, paddingTop: 20}}>

        <Label>Pick Date</Label>
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

        <Label>Departure City</Label>
        <TextInput
            style={styles.inputField2}
            onChangeText={(text) => this.setDepartureCity(text)}
        ></TextInput>

        <Label>Departure State</Label>
        <TextInput
            style={styles.inputField2}
            onChangeText={(text) => this.setDepartureState(text)}
        ></TextInput>

        <Label>Departure Zipcode</Label>
        <TextInput
            style={styles.inputField2}
            keyboardType = 'numeric'
            onChangeText={(text) => this.setDepartureZip(text)}
        ></TextInput>

        <Label>Destination City</Label>
        <TextInput
            style={styles.inputField2}
            onChangeText={(text) => this.setDestinationCity(text)}
        ></TextInput>

        <Label>Destination State</Label>
        <TextInput
            style={styles.inputField2}
            onChangeText={(text) => this.setDestinationState(text)}
        ></TextInput>

        <Label>Destination Zipcode</Label>
        <TextInput
            style={styles.inputField2}
            keyboardType = 'numeric'
            onChangeText={(text) => this.setDestinationZip(text)}
        ></TextInput>

        <Label>Seats</Label>

        <Label>Reason for Trip</Label>
        <TextInput
            multiline={true}
            numberOfLines={10}
            maxHeight={90}
            style={styles.inputField3}
            onChangeText={(text) => this.setTripDetails(text)}
        ></TextInput>

        <TouchableOpacity style={[styles.button, styles.buttonLightBlue]} onPress={ () => {this.submit(this.state.date, this.state.departureCity, this.state.departureState, this.state.departureZip, this.state.destinationCity, this.state.destinationState, this.state.destinationZip, this.state.seatCount, this.state.seatCost, this.state.tripDetails)}}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
