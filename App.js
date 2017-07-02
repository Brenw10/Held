import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import LoginPage from 'held/app/pages/login';
import TabNav from 'held/app/components/tab-navigator';

export default class App extends React.Component {
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

  renderPage = () => {
    switch (this.state.auth) {
      case null:
        return <LoginPage />;
      default:
        return <TabNav />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});