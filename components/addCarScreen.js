import React from 'react';
import { Dimensions, Image, View, TextInput, ScrollView, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { ImagePicker, LinearGradient } from 'expo';
import { RNS3 } from 'react-native-aws3';
import styles from '../styles.js';
import { DOMAIN, ACCESSKEY, SECRETKEY } from '../env.js';
import { Label } from 'native-base';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      image: '',
      licensePlate: '',
      color: '',
      make: '',
      model: '',
      year: ''
    }
  }

  static navigationOptions = {
    title: 'Add Car'
  };

  componentDidMount() {
    fetch(`${DOMAIN}/yourCar`, {
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
          this.setState({
            id: responseJson.car.id.toString(),
            image: responseJson.car.image,
            licensePlate: responseJson.car.license_plate,
            color: responseJson.car.color,
            make: responseJson.car.make,
            model: responseJson.car.model,
            year: responseJson.car.year ? responseJson.car.year.toString() : '',
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

  setColor(text){
    let update = Object.assign({}, this.state, {color: text})
    if(text.length > 0 ){
        this.setState(update)
    } else {
        alert('Color must be entered')
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
        name: Date.now(),
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

 submit(licensePlate, color, make, model, year) {

   fetch(`${DOMAIN}/carUpdate`, {
     method: 'POST',
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       licensePlate: licensePlate,
       color: color,
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
      <LinearGradient colors={['#ef32d9', '#89fffd']} style={{height: Dimensions.get('window').height}}>
      <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 40, paddingTop: 20}}>
        {this.state.image ? <Image source={{ uri: this.state.image }} style={{ width: 180, height: 180, borderRadius: 25 }} /> : null}
        <TouchableOpacity onPress={this._takePhoto}>
          <Image
          style={{width:50, height: 50}}
          source={require('../assets/cameraButton.png')}
          />
        </TouchableOpacity>

        <TextInput
            value={this.state.licensePlate}
            placeholder='License Plate'
            style={styles.inputField2}
            onChangeText={(text) => this.setLicensePlate(text)}
        ></TextInput>

        <TextInput
            value={this.state.color}
            placeholder='Color'
            style={styles.inputField2}
            onChangeText={(text) => this.setColor(text)}
        ></TextInput>

        <TextInput
            value={this.state.make}
            placeholder='Make'
            style={styles.inputField2}
            onChangeText={(text) => this.setMake(text)}
        ></TextInput>

        <TextInput
            value={this.state.model}
            placeholder='Model'
            style={styles.inputField2}
            onChangeText={(text) => this.setModel(text)}
        ></TextInput>

        <TextInput
            value={this.state.year}
            placeholder='YYYY'
            keyboardType = 'numeric'
            style={styles.inputField2}
            maxLength={4}
            onChangeText={(text) => this.setCarYear(text)}
        ></TextInput>

        <TouchableOpacity style={[styles.button, styles.buttonLightBlue]} onPress={ () => {this.submit(this.state.licensePlate, this.state.color, this.state.make, this.state.model, this.state.year)}}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
      </ScrollView>
      </LinearGradient>
    );
  }


}
