import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
} from 'react-native';

export default class Post extends Component {
  static navigationOptions = {
    title: 'Upload',
  };

  render() {
    return (
      <View>
        <Text>Upload files is here !</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Post', () => held);
