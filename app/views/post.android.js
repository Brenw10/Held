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
import Spinner from 'react-native-loading-spinner-overlay';
import * as firebase from 'firebase';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: false,
    };
  }

  static navigationOptions = {
    title: 'Upload',
  };

  setLoading = (value) => {
    this.setState({
      loading: value,
    });
  }

  handlePicker = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (!response.didCancel && !response.error) {
        this.setState(
          { file: response }
        );
      }
    });
  }

  handleUploadImage = () => {
    this.setLoading(true);
    const user = firebase.auth().currentUser;

    const polyfill = RNFetchBlob.polyfill
    window.XMLHttpRequest = polyfill.XMLHttpRequest;
    window.Blob = polyfill.Blob;

    const folder = `${user.uid}/posts`;
    const time = new Date().getTime();
    const filename = `${time}.png`;

    Blob.build(RNFetchBlob.wrap(this.state.file.path), { type: 'image/jpeg' }).then((blob) =>
      firebase
        .storage()
        .ref(folder)
        .child(filename)
        .put(blob, { contentType: 'image/png' })
    ).then(() => this.savePost(`${folder}/${filename}`, time));
  }

  savePost = (path, time) => {
    const user = firebase.auth().currentUser;

    firebase.database().ref(`users/${user.uid}/posts`).push({
      time: time,
      path: path,
    });

    this.setLoading(false);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Choose Image' onPress={() => this.handlePicker()} />
        {this.renderSelectedImage()}
        <Spinner visible={this.state.loading} />
      </View>
    );
  }

  renderSelectedImage() {
    if (this.state.file !== null) {
      return (
        <View style={styles.containerSpacing}>
          <Image source={{ uri: `data:image/png;base64,${this.state.file.data}` }} style={styles.image} />
          <Button title='Send' onPress={() => this.handleUploadImage()} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 250,
  },
  containerSpacing: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

AppRegistry.registerComponent('Post', () => Post);