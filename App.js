import React from 'react';

import LoginPage from 'held/app/pages/login';
import HomePage from 'held/app/pages/home';

import { Button } from 'react-native';
import { TabNavigator } from 'react-navigation';

class App extends React.Component {
}

export default TabNavigator({
  Login: {
    screen: LoginPage
  },
  Home: {
    screen: HomePage,
  },
});