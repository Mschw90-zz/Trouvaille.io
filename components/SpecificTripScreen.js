import React from 'react';
import { LinearGradient } from 'expo';
import { View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../styles.js';
import { Header, Label, Button, Right, Left, Icon, Body, Title } from 'native-base';


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

  goBack() {
    this.props.navigation.navigate('UserFeed')
  }

  render() {

    var d = new Date(this.state.trip.date)
    var driveMonth = (d.getMonth() + 1).toString();
    var driveDay = (d.getDate()).toString();
    var driveYear = (d.getFullYear()).toString();

    console.log(this.props.navigation.state.params.trip.user.profile_URL)

    return (
      <LinearGradient colors={['#03001e', '#7303c0', '#ec38bc']} style={{height: Dimensions.get('window').height}}>
      <Header style={{backgroundColor: 'transparent'}}>
        <Left>
          <Button transparent>
            <Icon name='ios-arrow-back' onPress={() => {this.goBack()}} style={{color: 'white'}}/>
          </Button>
        </Left>
        <Body>
          <Title style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Profile</Title>
        </Body>
        <Right>
        </Right>
      </Header>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 15}}>
          <Image style={{ width: 100, height: 100, borderRadius: 25 }} source={{ uri: this.props.navigation.state.params.trip.user.profile_URL.toString()}} />
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'space-between', justifyContent: 'center', backgroundColor: 'transparent', marginTop: 15, marginBottom: 15}}>
            <TouchableOpacity onPress={this.funStuff.bind(this)} style={{borderRadius: 70, justifyContent: 'center', width: Dimensions.get('window').width / 4, backgroundColor: 'white', marginRight: 10}}>
              <Text style={styles.buttonLabel2}>Landmarks</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderRadius: 70, justifyContent: 'center',width: Dimensions.get('window').width / 4, backgroundColor: 'white'}} onPress={() => {this.checkoutPage()}}>
              <Text style={styles.buttonLabel2}>Join Trip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderRadius: 70, justifyContent: 'center', width: Dimensions.get('window').width / 4, backgroundColor: 'white', marginLeft: 10}} onPress={() => {this.tripChatPage()}}>
              <Text style={styles.buttonLabel2}>Chat</Text>
            </TouchableOpacity>
          </View>

          <Text style={{backgroundColor: 'transparent', fontSize: 25, color: 'white'}}>{this.state.user.first_name}&#39;s Trip to {this.state.trip.destination_city}, {this.state.trip.destination_state}</Text>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
            <Text style={{backgroundColor: 'transparent', fontSize: 25, color: 'white', fontWeight: 'bold'}}>Trip Date: </Text>
            <Text style={{backgroundColor: 'transparent', fontSize: 25, color: 'white'}}>{driveMonth}/{driveDay}/{driveYear}</Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
            <Text style={{backgroundColor: 'transparent', fontSize: 25, color: 'white', fontWeight: 'bold'}}>{this.state.trip.num_seats} total seats : </Text>
            <Text style={{backgroundColor: 'transparent', fontSize: 25, color: 'white'}}>Seats Cost- ${this.state.trip.cost}</Text>
          </View>
          <Text style={{backgroundColor: 'transparent', fontSize: 25, color: 'white'}}>{this.state.trip.remaining_seats} seats left</Text>
          <View style={styles.viewRow}>
            <Icon style={styles.heartIcon} name='ios-heart' /><Text style={{color: 'white', fontWeight: 'bold', alignSelf: 'flex-end', marginRight: 10}}>0</Text>
            <Icon style={styles.chatIcon} name='ios-chatbubbles' /><Text style={styles.commentOrLikeCount}>0</Text>
          </View>
          <Text style={{backgroundColor: 'transparent', fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 20}}>Trip Description:</Text>
          <Text style={{backgroundColor: 'transparent', fontSize: 25, color: 'white'}}>{this.state.trip.trip_details}</Text>
          </View>
      </LinearGradient>
    )
  }
}
