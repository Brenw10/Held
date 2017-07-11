import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import LoginScreen from 'Held/app/pages/login';

export default class Held extends Component {
  render() {
    return (
      <LoginScreen />
    );
  }
}

AppRegistry.registerComponent('Held', () => Held);