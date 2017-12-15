import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';

export default class SpecificTripScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Text>Mapped Destination</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Icon name='ios-happy' />
          <Text>Date, 01, 2017</Text>
          <Text>Alex Glaze is going to: Name of Trip (Coachella Roadtrip)</Text>
          <Text>(100) seats left</Text>
          <View style={{flexDirection: 'row'}}>
            <Icon style={{color: 'blue'}} name='ios-heart' /><Text style={{color: 'red', alignSelf: 'flex-end'}}>0</Text>
            <Icon style={{color: 'blue'}} name='ios-chatbubbles' /><Text style={{color: 'red', alignSelf: 'flex-end'}}>0</Text>
          </View>
        </View>
      </View>
    )
  }
}
