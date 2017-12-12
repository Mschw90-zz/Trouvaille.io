import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import MapView from 'react-native-maps';

export default class DriverMapScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    //get geo location and set variable object equal to intialRegion. set that as
    // a state and then inset that state into the mapview
  }

  render(){
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 37.7716497,
            longitude: -122.40951819999998,
             latitudeDelta: 0.1,
             longitudeDelta: 0.1
          }}
          loadingEnabled={true}
          loadingIndicatorColor={'#3a9def'}
        >

          <MapView.Marker
            coordinate={{
              latitude: 37.7716497,
              longitude: -122.40951819999998}}
              title={"title"}
              description={"description"}
          >
              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  }
})
