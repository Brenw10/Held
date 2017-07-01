import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

export default class FeedPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Feed'
  };

  render() {
    const arrayExample = {
      "first": {
        "description": "test",
        "photoUrl": "http://pngimg.com/uploads/potato/potato_PNG7081.png?i=1"
      },
      "second": {
        "description": "test2",
        "photoUrl": "http://pngimg.com/uploads/potato/potato_PNG7081.png?i=1"
      }
    };
    const cards = Object.entries(arrayExample).map(function (item) {
      console.log(item);
      return (
        <ScrollView>
          <View style={styles.card}>
            <Image source={{ uri: 'http://www.pngall.com/wp-content/uploads/2016/04/Potato-Free-Download-PNG.png' }} style={styles.cardImage} />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardTitle}>Title</Text>
              <Text style={styles.cardDescription}>Desc</Text>
            </View>
          </View>
        </ScrollView>
      );
    });

    return (
      <View style={styles.container}>
        {cards}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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