import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { DOMAIN } from '../env.js';



export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image: null}
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
        accessKey: process.env.ACCESSKEY,
        secretKey: process.env.SECRETKEY,
        successActionStatus: 201
      }

      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body);
        fetch(`${DOMAIN}/photoUpdate`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            profileURL: response.body.uri
          })
        })
        .then((response) => {
          /* Everything between here and the next comment is added material to fix how the front end is communicating 
          with this route*/
          
          console.log(`response as JSON ${response.json()}`);
          //uncomment if this object is the {success: true} object which it should be 
          
          if(responseJson.success){
//             console.log('responsejson', responseJson);
//             return this.props.navigation.navigate('Profile');
//           } else {
//             alert('Picture was not uploaded');
//             console.log('error in picture fail', responseJson.error);
//             this.setState({error: responseJson.error});
//           }
          
          /* This is the end of the edited material */
            
//           console.log('response', response);
//           return response.json();
//         })
//         .then((responseJson) => {
//           console.log('responseJson', responseJson);
//           if(responseJson.success){
//             console.log('responsejson', responseJson);
//             return this.props.navigation.navigate('Profile');
//           } else {
//             alert('Picture was not uploaded');
//             console.log('error in picture fail', responseJson.error);
//             this.setState({error: responseJson.error});
//           }
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
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button
          title="Take picture"
          onPress={this._takePhoto}
        />
        <Button
          title="delete picture"
        />
        {this.state.image &&
          <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }


}
