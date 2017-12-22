import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import { DOMAIN, STRIPE_SK } from '../env.js';
import styles from '../styles.js'

export default class CheckoutConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: {},
            pickupCity: '',
            pickupState: '',
            pickupZC: '',
            dropoffCity: '',
            dropoffState: '',
            dropoffZC: ''
        }
    }

    componentDidMount(){
        this.setState({
            trip: this.props.navigation.state.params.trip_checkout
        })
    }

    setCity1(text){
        let update = Object.assign({}, this.state, {pickupCity: text})
        if(text.length > 0){
            this.setState(update)
        } else {
            alert('You must fill out all fields')
        }
    }
    setState1(text){
        let update = Object.assign({}, this.state, {pickupState: text})
        if(text.length > 0){
            this.setState(update)
        } else {
            alert('You must fill out all fields')
        }
    }
    setZc1(text){
        let update = Object.assign({}, this.state, {pickupZipCode: text})
        if(text.length > 0){
            this.setState(update)
        } else {
            alert('You must fill out all fields')
        }
    }
    setCity2(text){
        let update = Object.assign({}, this.state, {dropoffCity: text})
        if(text.length > 0){
            this.setState(update)
        } else {
            alert('You must fill out all fields')
        }
    }
    setState2(text){
        let update = Object.assign({}, this.state, {dropoffState: text})
        if(text.length > 0){
            this.setState(update)
        } else {
            alert('You must fill out all fields')
        }
    }
    setZc2(text){
        let update = Object.assign({}, this.state, {dropoffZipCode: text})
        if(text.length > 0){
            this.setState(update)
        } else {
            alert('You must fill out all fields')
        }
    }

    Pay(){
        fetch(`${DOMAIN}/newPassenger`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cost: this.state.trip.cost,
            tripId: this.state.trip.id,
            pickupCity: this.state.pickupCity,
            pickupState: this.state.pickupState,
            pickupZipCode: this.state.pickupZC,
            dropoffCity: this.state.dropoffCity,
            dropoffState: this.state.dropoffState,
            dropoffZipCode: this.state.dropoffZC,
            remaining_seats: this.state.trip.remaining_seats
        })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.success){
              return this.props.navigation.navigate('UserFeed');
            } else {
              alert(`There was an error joining this trip. Please revisit the trip page and try again.`)
              console.log('Error submitting Trip', responseJson.error);
            }
        })
        .catch((error)=>{
            console.log(`There was an error joining this trip`)
        })
    }

    render() {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.background}>
                <View style={{flex: .5, width: Dimensions.get('window').width, backgroundColor: 'transparent'}}>
                </View>
                <View style={{flex: 1, width: Dimensions.get('window').width}}>
                  <View>
                    <TextInput
                        style={styles.inputField2}
                        placeholder="Pickup City"
                        onChangeText={(text) => this.setCity1(text)}
                    ></TextInput>
                    <TextInput
                        style={styles.inputField2}
                        placeholder="Pickup State"
                        onChangeText={(text) => this.setState1(text)}
                    ></TextInput>
                    <TextInput
                        style={styles.inputField2}
                        placeholder="Pickup Zipcode"
                        onChangeText={(text) => this.setZc1(text)}
                    ></TextInput>
                    <TextInput
                        style={styles.inputField2}
                        placeholder="Dropoff City"
                        onChangeText={(text) => this.setCity2(text)}
                    ></TextInput>
                    <TextInput
                        style={styles.inputField2}
                        placeholder="Dropoff State"
                        onChangeText={(text) => this.setState2(text)}
                    ></TextInput>
                    <TextInput
                        style={styles.inputField2}
                        placeholder="Dropoff Zipcode"
                        onChangeText={(text) => this.setZc2(text)}
                    ></TextInput>
                  </View>
                  <View>
                  <TouchableOpacity style={styles.chatButton} onPress={() => {this.Pay()}}>
                     <Text style={styles.buttonLabel}>Pay for this trip</Text>
                   </TouchableOpacity>
                  </View>   
                </View>
            </View>
            </TouchableWithoutFeedback>
        
        )
    }

}