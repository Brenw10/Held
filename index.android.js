import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Menu from 'Held/app/components/menu';
import LoginView from 'Held/app/views/login';

export default class Held extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  setIsLogged = isLogged => {
    this.setState(
      { isLogged: isLogged }
    );
  }

  render() {
    if (this.state.isLogged) {
      return <Menu />;
    }
    return <LoginView setIsLogged={this.setIsLogged} />;
  }
}

AppRegistry.registerComponent('Held', () => Held);
