import React from 'react';
import { Dimensions, Image, View, TextInput, ScrollView, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import styles from '../styles.js';
import { DOMAIN, ACCESSKEY, SECRETKEY } from '../env.js';
import { Label } from 'native-base';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      licensePlate: '',
      make: '',
      model: '',
      year: ''
    }
  }

  setLicensePlate(text){
    let update = Object.assign({}, this.state, {licensePlate: text})
    if(text.length > 0){
        this.setState(update)
    } else {
        alert('License Plate be entered')
    }
  }

  setMake(text){
    let update = Object.assign({}, this.state, {make: text})
    if(text.length > 0 ){
        this.setState(update)
    } else {
        alert('Make must be entered')
    }
  }

  setModel(text){
    let update = Object.assign({}, this.state, {model: text})
    if(text.length > 0 ){
        this.setState(update)
    } else {
        alert('Model must be entered')
    }
  }

  setCarYear(text){
    let update = Object.assign({}, this.state, {year: text})
    if(text.length > 0){
        this.setState(update)
    } else {
        alert('Year must be entered')
    }
  }


  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.uri });
      const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: pickerResult.uri,
        name: "image.png",
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
      console.log(response.body.postResponse.location, '^^^^^^^^^^^^^');
      fetch(`${DOMAIN}/carPhotoUpdate`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: response.body.postResponse.location
        })
      })
      .then((response) => {
        console.log('response', response);
        return response.json();
      })
      .then((responseJson) => {
        console.log('responseJson', responseJson);
        if(responseJson.success){
          console.log('responsejson', responseJson);
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

 submit(licensePlate, make, model, year) {

   fetch(`${DOMAIN}/carUpdate`, {
     method: 'POST',
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       licensePlate: licensePlate,
       make: make,
       model: model,
       year: year
     })
   })
   .then((response) => response.json())
   .then((responseJson) => {
     /* do something with responseJson and go back to the Login view but
      * make sure to check for responseJson.success! */
      if(responseJson.success){
          // return this.props.navigation.goBack();
          return this.props.navigation.navigate('Profile');

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
      <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 40, paddingTop: 20}}>
        {this.state.image ? <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} /> : null}
        <TouchableOpacity onPress={this._takePhoto}>
          <Image
          style={{width:50, height: 50}}
          source={require('../assets/cameraButton.png')}
          />
        </TouchableOpacity>

        <Label>License Plate</Label>
        <TextInput
            placeholder='License Plate'
            style={styles.inputField2}
            onChangeText={(text) => this.setLicensePlate(text)}
        ></TextInput>
        <Label>Make</Label>
        <TextInput
            placeholder='Make'
            style={styles.inputField2}
            onChangeText={(text) => this.setMake(text)}
        ></TextInput>

        <Label>Model</Label>
        <TextInput
            placeholder='Model'
            style={styles.inputField2}
            onChangeText={(text) => this.setModel(text)}
        ></TextInput>

        <Label>Year</Label>
        <TextInput
            placeholder='YYYY'
            keyboardType = 'numeric'
            style={styles.inputField2}
            maxLength={4}
            onChangeText={(text) => this.setCarYear(text)}
        ></TextInput>

        <TouchableOpacity style={[styles.button, styles.buttonLightBlue]} onPress={ () => {this.submit(this.state.licensePlate, this.state.make, this.state.model, this.state.year)}}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
      </ScrollView>
    );
  }


}
