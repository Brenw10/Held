import React from 'react';

import LoginPage from 'held/app/pages/login';

import { Button } from 'react-native';
import { TabNavigator } from 'react-navigation';

class App extends React.Component {
}

export default TabNavigator({
  Home: {
    screen: LoginPage,
  },
});