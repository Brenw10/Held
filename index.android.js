import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import LoginScreen from 'held/app/pages/login';

export default class held extends Component {
  render() {
    return (
      <LoginScreen />
    );
  }
}

AppRegistry.registerComponent('held', () => held);
