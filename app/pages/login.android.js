import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    AsyncStorage,
} from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as firebase from 'firebase';

export default class Login extends Component {
    handleFacebookLogin = async () => {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'user_friends']);
        if (!result.isCancelled) {
            const accessToken = await AccessToken.getCurrentAccessToken();
            const auth = await this.getFirebaseAuth(accessToken.accessToken);
            AsyncStorage.setItem('@Auth', JSON.stringify(auth));
        }
    }

    getFirebaseAuth = (token) => {
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

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.handleFacebookLogin()} style={styles.button}>
                    <Image source={require('held/app/assets/images/facebook-logo.png')} style={styles.logo} />
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

AppRegistry.registerComponent('Login', () => Login);