import React from 'react';
import { StyleSheet, View } from 'react-native';

import FacebookLogin from 'held/app/components/facebook/login';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FacebookLogin />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3b5998',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});