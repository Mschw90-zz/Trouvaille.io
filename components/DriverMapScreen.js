import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class DriverMapScreen extends React.Component {
  constructor(props){
    super(props)
    //hardcoded bc geolocation didnt work
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      }
    }
  }

  watchID: ?number = null;

  componentDidMount() {
    console.log('mounttttting');
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var  long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    // this.watchID = navigator.geoLocation.watchPosition((position) => {
    //   var lat = parseFloat(position.coords.latitude)
    //   var long = parseFloat(position.coords.longitude)
    //
    //   var lastRegion = {
    //     latitude: lat,
    //     longitude: long,
    //     longitudeDelta: LONGITUDE_DELTA,
    //     latitudeDelta: LATITUDE_DELTA
    //   }
    //
    //   this.setState({initialPosition: lastRegion})
    //   this.setState({markerPosition: lastRegion})
    // })
  }

  componentWillUnmount() {
    console.log('unmounting');
    // navigator.geoLocation.clearWatch(this.watchID)
  }


  render(){
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          region={this.state.initialPosition}
          loadingEnabled={true}
          loadingIndicatorColor={'lime'}
        >

          <MapView.Marker
            coordinate={this.state.markerPosition}
            title={"test title"}
            description={"test description"}
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
