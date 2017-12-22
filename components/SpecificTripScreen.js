import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import { Icon, Button } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../styles.js';

export default class SpecificTripScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     trip: {},
     user: {},
     userPhoto: ''
    }
  }

  componentDidMount(){
    this.setState({
     trip: this.props.navigation.state.params.trip,
     user: this.props.navigation.state.params.trip.user,
     userPhoto: this.props.navigation.state.params.trip.user.profile_URL
    })
  }

  tripChatPage() {
    this.props.navigation.navigate('ChatBox')
  }

  checkoutPage(){
    this.props.navigation.navigate('CheckoutConfirm', {trip_checkout: this.state.trip})
  }

  funStuff(){
    this.props.navigation.navigate('Fun', {trip_url: this.state.trip.fun_trip_url})
  }

  render() {

    var d = new Date(this.state.trip.date)
    var driveMonth = (d.getMonth() + 1).toString();
    var driveDay = (d.getDate()).toString();
    var driveYear = (d.getFullYear()).toString();

    console.log(this.props.navigation.state.params.trip.user.profile_URL)

    return (
      <View>
        <View style={styles.centerView}>
          <View style={{flex: .5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={styles.circularProfPic} source={{ uri: this.props.navigation.state.params.trip.user.profile_URL.toString()}} />
          </View>
          <Text>{this.state.user.first_name}: Trip to {this.state.trip.destination_city}, {this.state.trip.destination_state}</Text>
          <TouchableOpacity onPress={this.funStuff.bind(this)} style={[styles.spotifyButton, styles.buttonBlue]}>
          <Text style={styles.buttonLabel}>View Landmarks</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>Trip Date: {driveMonth}/{driveDay}/{driveYear}</Text>
          <Text>Seats Cost- ${this.state.trip.cost}</Text>
          <Text>{this.state.trip.remaining_seats} seats left</Text>
          <View style={styles.viewRow}>
            <Icon style={styles.blueIcon} name='ios-heart' /><Text style={styles.commentOrLikeCount}>0</Text>
            <Icon style={styles.blueIcon} name='ios-chatbubbles' /><Text style={styles.commentOrLikeCount}>0</Text>
          </View>
          <Row style={{flex: 1}}>
          <TouchableOpacity style={styles.chatButton} onPress={() => {this.checkoutPage()}}>
            <Text style={styles.buttonLabel}>Join this trip!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton} onPress={() => {this.tripChatPage()}}>
            <Text style={styles.buttonLabel}>View Chat</Text>
          </TouchableOpacity>
          </Row>
        </View>
      </View>
    )
  }
}
