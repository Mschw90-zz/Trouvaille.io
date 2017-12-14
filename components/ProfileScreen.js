import React from 'react';
import { Dimensions, Image, View, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import styles from '../styles.js';
import { DOMAIN, ACCESSKEY, SECRETKEY } from '../env.js';
import { Header, Label, Button, Right, Left, Icon, Body, Title } from 'native-base';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      firstName: '',
      lastName: '',
      month: '',
      day: '',
      year: '',
      bio: '',
      hometown: '',
      isDateTimePickerVisible: false,
    }
  }

  componentDidMount() {
    fetch(`${DOMAIN}/profileImage`, {
      method: 'GET',
    }
    ).then((response) => {
      console.log(response);
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson);
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
       if(responseJson.success){
           // return this.props.navigation.goBack();
          this.setState({image: responseJson.photo})
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

      console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: result.uri,
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


  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  goBack() {
    this.props.navigation.navigate('UserFeed')
  }

  addCar() {
    this.props.navigation.navigate('addCar')
  }


  render() {
    return (
      <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 40}}>
      <Header style={{ width: Dimensions.get('window').width, marginBottom: 20}}>
        <Left>
          <Button transparent>
            <Icon name='ios-arrow-back' onPress={() => {this.goBack()}}/>
          </Button>
        </Left>
        <Body>
          <Title>User Feed!</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='ios-download-outline'/>
          </Button>
        </Right>
      </Header>
        {this.state.image ? <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} /> : null}
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
          <TouchableOpacity onPress={this._pickImage} style={{marginLeft: 10}}>
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
        <Label>First Name</Label>
        <TextInput
            style={styles.inputField2}
        ></TextInput>

        <Label>Last Name</Label>
        <TextInput
            style={styles.inputField2}
        ></TextInput>

        <Label>Birthday</Label>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width}}>
          <TextInput
              placeholder='MM'
              keyboardType = 'numeric'
              style={styles.inputField4}
              maxLength={2}
          ></TextInput>
          <TextInput
              placeholder='DD'
              keyboardType = 'numeric'
              style={styles.inputField4}
              maxLength={2}
          ></TextInput>
          <TextInput
              placeholder='YYYY'
              keyboardType = 'numeric'
              style={styles.inputField4}
              maxLength={4}
          ></TextInput>
        </View>

        <Label>Hometown</Label>
        <TextInput
            style={styles.inputField2}
        ></TextInput>

        <Label>Bio</Label>
        <TextInput
            multiline={true}
            numberOfLines={10}
            maxHeight={90}
            style={styles.inputField3}
        ></TextInput>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }


}
