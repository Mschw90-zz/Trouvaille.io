import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';

export default class PreviousTripsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>There are no popular trips at the moment!</Text>
      </View>
    )
  }
}
