import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button, AsyncStorage } from 'react-native';

export default class FilePage extends React.Component {

  handleLogOut = () => {
    AsyncStorage.clear();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}><Text style={styles.title}>Configuration</Text></View>
        <ScrollView>
          <View style={styles.configureContainer}>
            <Button title="Logout" onPress={() => this.handleLogOut()} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    alignItems: 'center',
    backgroundColor: '#3b5998',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
    paddingTop: 20,
  },
  container: {
    flex: 1,
  },
  configureContainer: {
    margin: 20,
  },
});