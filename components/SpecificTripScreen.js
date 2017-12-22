import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Icon, Button } from 'native-base';
import styles from '../styles.js';

export default class SpecificTripScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     trip: {},
     user: {}
    }
  }

  componentDidMount(){
    this.setState({
     trip: this.props.navigation.state.params.trip,
     user: this.props.navigation.state.params.trip.user
    })
  }

  tripChatPage() {
    this.props.navigation.navigate('ChatBox')
  }

  funStuff(){
    this.props.navigation.navigate('Fun', {trip_url: this.state.trip.fun_trip_url})
  }

  render() {
    console.log(this.props.navigation.state.params.trip)

    return (
      <View>
        <View style={styles.centerView}>
          <Text>{this.state.user.first_name}: Trip to {this.state.trip.destination_city}, {this.state.trip.destination_state}</Text>
          <TouchableOpacity onPress={this.funStuff.bind(this)} style={[styles.spotifyButton, styles.buttonBlue]}>
          <Text style={styles.buttonLabel}>View Landmarks</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Icon name='ios-happy' />
          <Text>Trip Date: {this.state.trip.date}</Text>
          <Text></Text>
          <Text>{this.state.trip.seats_remaining} seats left</Text>
          <View style={styles.viewRow}>
            <Icon style={styles.blueIcon} name='ios-heart' /><Text style={styles.commentOrLikeCount}>0</Text>
            <Icon style={styles.blueIcon} name='ios-chatbubbles' /><Text style={styles.commentOrLikeCount}>0</Text>
          </View>
          <TouchableOpacity style={styles.chatButton} onPress={() => {this.tripChatPage()}}>
            <Text style={styles.buttonLabel}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
