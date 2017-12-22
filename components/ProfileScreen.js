import React from 'react';
import { Dimensions, Image, View, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Text } from 'react-native';
import { ImagePicker, LinearGradient } from 'expo';
import { RNS3 } from 'react-native-aws3';
import styles from '../styles.js';
import { DOMAIN, ACCESSKEY, SECRETKEY } from '../env.js';
import { Header, Label, Button, Right, Left, Icon, Body, Title } from 'native-base';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      image: '',
      firstName: '',
      lastName: '',
      month: '',
      day: '',
      year: '',
      hometown: '',
      bio: '',
      isDateTimePickerVisible: false,
    }
  }

  static navigationOptions = {
    title: 'Profile'
  };

  componentDidMount() {
    fetch(`${DOMAIN}/profile`, {
      method: 'GET',
    }
    ).then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
       if(responseJson.success){
           // return this.props.navigation.goBack();
           var d = new Date(responseJson.birthday)
          this.setState({
            id: responseJson.id.toString(),
            image: responseJson.photo,
            firstName: responseJson.first_name,
            lastName: responseJson.last_name,
            month: (d.getMonth() + 1).toString(),
            day: (d.getDate()).toString(),
            year: (d.getFullYear()).toString(),
            hometown: responseJson.hometown,
            bio: responseJson.bio
          })
       }else{
           console.log('THERE WAS AN ERROR FINDING PICTURE', responseJson.error);
       }
    })
    .catch((err) => {
        console.log('no picture found');
        alert(err)
      /* do something if there was an error with fetching */
    });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: result.uri,
        name: this.state.id,
        type: "image/png"
      }

      const options = {
        keyPrefix: "uploads/",
        bucket: "trouvaille",
        region: "us-east-1",
        accessKey: ACCESSKEY,
        secretKey: SECRETKEY,
        successActionStatus: 201
      }

      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        fetch(`${DOMAIN}/photoUpdate`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            profileURL: response.body.postResponse.location
          })
        })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          if(responseJson.success){
            return this.props.navigation.navigate('Profile');
          } else {
            alert('Picture was not uploaded');
            console.log('error in picture fail', responseJson.error);
            this.setState({error: responseJson.error});
          }
        })
        .catch((err) => {
          console.log('caught error in catch of add picture', err);
          alert(err)
          /* do something if there was an error with fetching */
        })
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      });
    }
  };


  goBack() {
    this.props.navigation.navigate('UserFeed')
  }

  addCar() {
    this.props.navigation.navigate('addCar')
  }

  setFirstName(text){
    let update = Object.assign({}, this.state, {firstName: text})
    this.setState(update)
  }
  setLastName(text){
    let update = Object.assign({}, this.state, {lastName: text})
    this.setState(update)
  }
  setBirthdayMonth(text){
    let update = Object.assign({}, this.state, {month: text})
    this.setState(update)
  }
  setBirthdayDay(text){
    let update = Object.assign({}, this.state, {day: text})
    this.setState(update)
  }
  setBirthdayYear(text){
    let update = Object.assign({}, this.state, {year: text})
    this.setState(update)
  }
  setBio(text){
    let update = Object.assign({}, this.state, {bio: text})
    this.setState(update)
  }
  setHometown(text){
    let update = Object.assign({}, this.state, {hometown: text})
    this.setState(update)
  }

  submit(firstName, lastName, month, day, year, hometown, bio) {
    fetch(`${DOMAIN}/profileUpdate`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        month: month,
        day: day,
        year: year,
        hometown: hometown,
        bio: bio
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
       if(responseJson.success){
           // return this.props.navigation.goBack();
           return this.props.navigation.navigate('UserFeed');

       }else{
           alert(responseJson.error)
           console.log('THERE WAS AN ERROR', responseJson.error);
       }
    })
    .catch((err) => {
        console.log('caught error in catch of submt');
        alert(err)
      /* do something if there was an error with fetching */
    });
  }


  render() {
    return (
      <LinearGradient colors={['#43C6AC', '#F8FFAE']} style={{height: Dimensions.get('window').height}}>
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
      <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 40, paddingTop: 20}}>
        {this.state.image ? <Image source={{ uri: this.state.image }} style={{ width: 180, height: 180, borderRadius: 25 }} /> : null}
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
          <TouchableOpacity onPress={this._pickImage} style={{marginRight: 10}}>
          <Image
          style={{width:60, height: 60}}
          source={require('../assets/camerarollButton.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.addCar() } style={{marginLeft: 10}}>
          <Image
          style={{width:70, height: 70}}
          source={require('../assets/carButton.png')}
          />
          </TouchableOpacity>
        </View>

        <TextInput
            placeholder='First Name'
            value={this.state.firstName}
            style={styles.inputField2}
            onChangeText={(text) => this.setFirstName(text)}
        ></TextInput>

        <TextInput
            placeholder='Last Name'
            value={this.state.lastName}
            style={styles.inputField2}
            onChangeText={(text) => this.setLastName(text)}
        ></TextInput>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width}}>
          <TextInput
              value={this.state.month}
              placeholder='MM'
              keyboardType = 'numeric'
              style={styles.inputField4}
              maxLength={2}
              onChangeText={(text) => this.setBirthdayMonth(text)}
          ></TextInput>
          <TextInput
              value={this.state.day}
              placeholder='DD'
              keyboardType = 'numeric'
              style={styles.inputField4}
              maxLength={2}
              onChangeText={(text) => this.setBirthdayDay(text)}
          ></TextInput>
          <TextInput
              value={this.state.year}
              placeholder='YYYY'
              keyboardType = 'numeric'
              style={styles.inputField4}
              maxLength={4}
              onChangeText={(text) => this.setBirthdayYear(text)}
          ></TextInput>
        </View>

        <TextInput
            placeholder='Hometown'
            value={this.state.hometown}
            style={styles.inputField2}
            onChangeText={(text) => this.setHometown(text)}
        ></TextInput>

        <TextInput
            placeholder='Write something about yourself'
            value={this.state.bio}
            multiline={true}
            numberOfLines={10}
            maxHeight={90}
            style={styles.inputField3}
            onChangeText={(text) => this.setBio(text)}
        ></TextInput>

        <TouchableOpacity style={[styles.button, styles.buttonLightBlue]} onPress={ () => {this.submit(this.state.firstName, this.state.lastName, this.state.month, this.state.day, this.state.year, this.state.hometown, this.state.bio)}}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>
      </LinearGradient>
    );
  }


}
