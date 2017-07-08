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

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.handleFacebookLogin()} style={styles.button}>
                    <Image source={require('Held/app/assets/images/facebook-logo.png')} style={styles.logo} />
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