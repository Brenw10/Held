import React from 'react';

import LoginPage from 'held/app/pages/login';
import FeedPage from 'held/app/pages/feed';

import { Button } from 'react-native';
import { TabNavigator } from 'react-navigation';

class App extends React.Component {
}

export default TabNavigator({
  Login: {
    screen: LoginPage
  },
  Feed: {
    screen: FeedPage,
  },
});