import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Button, Body, Icon, Content, Item, Form, Input } from 'native-base';
import MapView from 'react-native-maps';
import { DOMAIN } from '../env.js';


export default class NadaScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: null
      }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('NewPassenger');            
          }, 5000);

        fetch(`${DOMAIN}/spotifyUpdate`, {
        method: 'get',
        })
        .then( (response) => {
        console.log(response)
        })
        .then((responseJson) =>{
            console.log(`Found the url ${responseJson.url}`)
        this.setState({url: responseJson.url})
        })
        .catch((error)=>{
        console.log(`There was an error making the initial spoftift request`)
        })
    }

    render(){
        return (
            <Text>Please Wait for your text to load</Text>
        )
    }
}