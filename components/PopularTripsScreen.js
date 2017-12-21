import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';

export default class PopularTripsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    title: 'Popular Trips'
  };

  render() {
    return (
      <View>
        <Text>There are no popular trips at the moment!</Text>
      </View>
    )
  }
}
