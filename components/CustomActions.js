import PropTypes from 'prop-types';
import React from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import firebase from 'firebase';


import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class CustomActions extends React.Component {
// allows user to pic a photo from their library
  pickImage = async () => {
    const {status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        const imageURL = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageURL});
      }
    }
  }
// allows user to take photo and use that photo
  takePhoto = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if(status ==='granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        const imageURL = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageURL});
      }
    }
  }
// allows a user to send their location
  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status === 'granted') {
      let result = await Location.getCurrentPositionAsync({}).catch((error) => console.log(error));
      const longitude = JSON.stringify(result.coords.longitude);
      const altitude = JSON.stringify(result.coords.latitude);
      if (result) {
        this.props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude,
          },
        });
      }
    }
  }
// allows a user to chose what they want to send 
  onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return this.pickImage();
          case 1:
            console.log('user wants to take a photo');
            return this.takePhoto();
          case 2:
            console.log('user wants to get their location');
            return this.getLocation();
        }
      },
    );
  };
// sends media to db
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

render() {
  return (
    <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
}); 

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};