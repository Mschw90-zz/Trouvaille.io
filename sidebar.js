import React, { Component } from 'react';
import {
  Text,
  Button,
  Image
} from 'react-native';

import {Content} from 'native-base';

export default class Sidebar extends Component {
  render() {
    return (
          <Content style={{backgroundColor:'#FFFFFF'}}>
            <Image
              style={{width:100, height: 100, marginLeft: 100}}
              source={require('./rick_ricknmorty.png')}
            />
            <Button title='Home'></Button>
            <Button title='Explore Local Trips'></Button>
            <Button title='Previous Trips'></Button>
            <Button title='Popular Trips'></Button>
            <Button title='Settings'></Button>
            <Button title='Logout'></Button>
          </Content>
    );
  }
}

module.exports = Sidebar;
