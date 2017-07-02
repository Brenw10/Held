import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default class FilePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}><Text style={styles.title}>Gallery</Text></View>
        <ScrollView>
          <View style={styles.galleryContainer}>
            <Text>Gallery Screen on Development !</Text>
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
  galleryContainer: {
    margin: 20,
  },
});