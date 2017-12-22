import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Icon, Button } from 'native-base';
import styles from '../styles.js';

export default class SpecificTripScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  tripChatPage() {
    this.props.navigation.navigate('ChatBox')
  }

  render() {
    return (
      <View>
        <View style={styles.centerView}>
          <Text>Mapped Destination</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Icon name='ios-happy' />
          <Text>Date, 01, 2017</Text>
          <Text>Alex Glaze is going to: Name of Trip (Coachella Roadtrip)</Text>
          <Text>(100) seats left</Text>
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
