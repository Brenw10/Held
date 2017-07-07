import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Alert, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

export default class LoginPage extends React.Component {
  static navigationOptions = {
    tabBarVisible: false
  };

  async handleFacebookLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('453060115055613', {
      permissions: ['email', 'public_profile', 'user_friends'],
    });
    if (await type === 'success') {
      const auth = await this.getFirebaseAuth(await token);
      this.setUserData(auth);
      this.saveAuthStorage(auth);
      this.props.handleAuth();
    }
  }

  getFirebaseAuth(token) {
    //Todo: Read it from parameter place
    var config = {
      apiKey: "AIzaSyCc-gCBjPIW-CcIAHxttdB9cHks7W_t1R0",
      authDomain: "held-efdf8.firebaseapp.com",
      databaseURL: "https://held-efdf8.firebaseio.com",
      projectId: "held-efdf8",
      storageBucket: "held-efdf8.appspot.com",
      messagingSenderId: "828413601398"
    };
    firebase.initializeApp(config);
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(facebookCredential);
  }

  setUserData(auth) {
    firebase.database().ref('users/' + auth.uid).set({
      name: auth.displayName,
      email: auth.email,
      //TODO: Remove this hardcode
      displayName: 'PotatoCat'
    });
  }

  saveAuthStorage(auth) {
    AsyncStorage.setItem('@Auth', JSON.stringify(auth));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleFacebookLogin()} style={styles.button}>
          <Image source={require('held/assets/images/facebook-logo.png')} style={styles.logo} />
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
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
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFF',
  },
});