import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    AsyncStorage
} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.initializeFirebase();
    }

    static navigationOptions = {
        header: null,
    };

    initializeFirebase() {
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
    };

    login = async () => {
        const accessToken = await this.getAccessToken();
        await this.loginFirebase(accessToken.accessToken);
        AsyncStorage.setItem('access-token', accessToken);
        this.props.navigation.navigate('Home');
    }

    getAccessToken = async () => {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email']);
        return AccessToken.getCurrentAccessToken();
    }

    loginFirebase = token => {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        return firebase.auth().signInWithCredential(credential);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Icon.Button name="facebook-square" backgroundColor="#3b5998" onPress={this.login}>
                        Login with Facebook
                    </Icon.Button>
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
        margin: 20
    },
});

AppRegistry.registerComponent('Login', () => Login);