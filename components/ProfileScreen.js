import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { DOMAIN, ACCESSKEY, SECRETKEY } from '../env.js';



export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
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


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button
          title="Take picture"
          onPress={this._takePhoto}
        />
      </View>
    );
  }


}
