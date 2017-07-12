import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
} from 'react-native';
import Menu from 'held/app/components/menu';
import LoginView from 'held/app/views/login';

export default class held extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
    };
    this.handleAuth();
  }

  handleAuth = async () => {
    this.setState({
      auth: await AsyncStorage.getItem('@Auth')
    });
  }

  render() {
    if (this.state.auth !== null) {
      return <Menu />;
    }
    return <LoginView handleAuth={this.handleAuth} />;
  }
}

AppRegistry.registerComponent('held', () => held);
