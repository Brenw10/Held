import React, { Component } from 'react';
import LoginScreen from 'Held/app/pages/login';
import {
  AppRegistry,
} from 'react-native';

export default class Held extends Component {
  render() {
    return (
      <LoginScreen />
    );
  }
}

AppRegistry.registerComponent('Held', () => Held);