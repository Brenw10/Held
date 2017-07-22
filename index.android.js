import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Pages from 'Held/app/components/pages';

export default class Held extends Component {
  render() {
    return <Pages />;
  }
}

AppRegistry.registerComponent('Held', () => Held);
