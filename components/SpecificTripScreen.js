import React from 'react';
import {View, Text} from 'react-native'

export default class SpecificTripScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>Mapped Destination</Text>
        <Text>Date, 01, 2017</Text>
        <Text>Name of Trip (Coachella Roadtrip)</Text>
        <Text>(100) seats left</Text>
      </View>
    )
  }
}
