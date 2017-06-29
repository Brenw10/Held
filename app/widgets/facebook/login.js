import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class FacebookLogin extends React.Component {
    constructor() {
        super();
        var config = {
            apiKey: "AIzaSyCc-gCBjPIW-CcIAHxttdB9cHks7W_t1R0",
            authDomain: "held-efdf8.firebaseapp.com",
            databaseURL: "https://held-efdf8.firebaseio.com",
            projectId: "held-efdf8",
            storageBucket: "held-efdf8.appspot.com",
            messagingSenderId: "828413601398"
        };
        firebase.initializeApp(config);
    }

    handleFirebaseAuth(token) {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(token);
        const auth = firebase.auth().signInWithCredential(facebookCredential);
    }

    async handleFacebookLogin() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('453060115055613', {
            permissions: ['email', 'public_profile', 'user_friends'],
        });
        if (await type === 'success') {
            this.handleFirebaseAuth(await token);
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleFacebookLogin.bind(this)}>
                <View style={styles.container}>
                    <Image
                        source={require('held/assets/images/facebook_brand.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.text}>acebook</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    logo: {
        width: 50,
        height: 45,
    },
    text: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 25,
    },
});