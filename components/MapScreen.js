// import React, { Component } from 'react';
// import { Dimensions, StyleSheet } from 'react-native';
// import MapView from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import { GOOGLEMAPKEY } from '../env.js';
//
// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.771707;
// const LONGITUDE = -122.4053769;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//
// class Map extends Component {
//
//   constructor(props) {
//     super(props);
//
//     // AirBnB's Office, and Apple Park
//     this.state = {
//       coordinates: [
//         {
//           latitude: 37.3317876,
//           longitude: -122.0054812,
//         },
//         {
//           latitude: 37.771707,
//           longitude: -122.4053769,
//         },
//       ],
//     };
//
//     this.mapView = null;
//   }
//
//   onMapPress = (e) => {
//     if (this.state.coordinates.length == 2) {
//       this.setState({
//         coordinates: [
//           e.nativeEvent.coordinate,
//         ],
//       });
//     } else {
//       this.setState({
//         coordinates: [
//           ...this.state.coordinates,
//           e.nativeEvent.coordinate,
//         ],
//       });
//     }
//   }
//
//   render() {
//     return (
//       <MapView
//         initialRegion={{
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         }}
//         style={StyleSheet.absoluteFill}
//         ref={c => this.mapView = c}
//         onPress={this.onMapPress}
//       >
//         {this.state.coordinates.map((coordinate, index) =>
//           <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
//         )}
//         {(this.state.coordinates.length === 2) && (
//           <MapViewDirections
//             origin={this.state.coordinates[0]}
//             destination={this.state.coordinates[1]}
//             apikey={GOOGLEMAPKEY}
//             strokeWidth={3}
//             strokeColor="hotpink"
//             onReady={(result) => {
//               this.mapView.fitToCoordinates(result.coordinates, {
//                 edgePadding: {
//                   right: (width / 20),
//                   bottom: (height / 20),
//                   left: (width / 20),
//                   top: (height / 20),
//                 }
//               });
//             }}
//             onError={(errorMessage) => {
//               // console.log('GOT AN ERROR');
//             }}
//           />
//         )}
//       </MapView>
//     );
//   }
// }
