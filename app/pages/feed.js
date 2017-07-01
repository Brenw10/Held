import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

export default class FeedPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}><Text style={styles.title}>Held</Text></View>
        <ScrollView>
          <View style={styles.card}>
            <Image source={{ uri: "http://pngimg.com/uploads/potato/potato_PNG7081.png?i=1" }} style={styles.cardImage} />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardTitle}>PotatoCat</Text>
              <Text style={styles.cardDescription}>I love potatoes :p</Text>
            </View>
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
  card: {
    margin: 20,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    borderRadius: 8,
    minHeight: 400,
    backgroundColor: '#FFF',
  },
  cardImage: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardDetailContainer: {
    margin: 20,
  },
  cardTitle: {
    fontSize: 20,
  },
  cardDescription: {
    fontSize: 15,
    color: 'darkgrey',
  },
});