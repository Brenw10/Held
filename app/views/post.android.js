import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  static navigationOptions = {
    title: 'Upload',
  };

  handlePicker = () => {
    ImagePicker.launchImageLibrary({}, response => {
      this.setState(
        { file: response }
      );
    });
  }

  handleUploadImage = () => {
    const user = firebase.auth().currentUser;

    const polyfill = RNFetchBlob.polyfill
    window.XMLHttpRequest = polyfill.XMLHttpRequest;
    window.Blob = polyfill.Blob;

    const folder = `${user.uid}/posts`;
    const filename = `${new Date().getTime()}.png`;

    Blob.build(RNFetchBlob.wrap(this.state.file.path), { type: 'image/jpeg' }).then((blob) =>
      firebase
        .storage()
        .ref(folder)
        .child(filename)
        .put(blob, { contentType: 'image/png' })
    ).then(() => this.savePost(`${folder}/${filename}`));
  }

  savePost = (path) => {
    const user = firebase.auth().currentUser;

    firebase.database().ref(`posts/${user.uid}`).push({
      path: path
    });
  }

  selectedImageView() {
    if (this.state.file !== null) {
      return (
        <View>
          <Image source={{ uri: `data:image/png;base64,${this.state.file.data}` }} style={styles.image} />
          <Button title='Send' onPress={() => this.handleUploadImage()} />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Choose Image' onPress={() => this.handlePicker()} />
        {this.selectedImageView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 250,
  },
});

AppRegistry.registerComponent('Post', () => held);