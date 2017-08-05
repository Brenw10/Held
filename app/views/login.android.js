import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    AsyncStorage,
} from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SocialIcon } from 'react-native-elements'
import * as firebase from 'firebase';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.initializeFirebase();
        AsyncStorage.getItem('token').then(token => this.handleLogin(token));
    }

    static navigationOptions = {
        header: null,
    };

    initializeFirebase = () => {
        //todo: read it from parameter place
        const config = {
            apiKey: "AIzaSyCc-gCBjPIW-CcIAHxttdB9cHks7W_t1R0",
            authDomain: "held-efdf8.firebaseapp.com",
            databaseURL: "https://held-efdf8.firebaseio.com",
            projectId: "held-efdf8",
            storageBucket: "held-efdf8.appspot.com",
            messagingSenderId: "828413601398"
        };
        firebase.initializeApp(config);
    }

    handleToken = async () => {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email']);
        if (!result.isCancelled) {
            const data = await AccessToken.getCurrentAccessToken();
            this.handleLogin(data.accessToken);
        }
    }

    handleLogin = token => {
        this.isValidToken(token).then(response => {
            if (response.ok) {
                this.loginFirebase(token);
                this.loginSuccess(token);
            }
        });
    }

    loginFirebase = token => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(token);
        return firebase.auth().signInWithCredential(facebookCredential);
    };

    isValidToken = token => {
        return fetch('http://198.58.104.208:8080/api/auth', {
            headers: {
                'access-token': token,
            }
        });
    }

    loginSuccess = token => {
        AsyncStorage.setItem('token', token);
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <SocialIcon button type='facebook' title='Sign In With Facebook' onPress={() => this.handleToken()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e8ec',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
});

AppRegistry.registerComponent('Login', () => Login);